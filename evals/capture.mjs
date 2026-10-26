// CDP capture + signature probe for Part B. Headless Edge's --window-size cannot go below ~492 CSS px
// on Windows, so a "390" shot taken that way is a cropped 492 layout; this sets device metrics instead.
// Usage: node capture.mjs <run-root> <run> [<run> ...]   (env: TRIAL_BASE server URL, EDGE browser path)
// Per run: <run-root>/shots/<run>-fold.png (1440x900), <run>-1440.png and <run>-390.png (full page after a
// scroll-through, capped at 7000px), <run-root>/probe/<run>.json (signature probe at 1440x900 and 390x844,
// console errors and exceptions).
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.argv[2];
if (!ROOT) { console.error('usage: node capture.mjs <run-root> <run> [<run> ...]'); process.exit(2); }
const BASE = process.env.TRIAL_BASE || 'http://127.0.0.1:8790';
const EDGE = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
let PORT = 0;
const PROBE = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'signature_probe.js'), 'utf8');
const OUT = ROOT;
mkdirSync(join(OUT, 'shots'), { recursive: true });
mkdirSync(join(OUT, 'probe'), { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), 'cwcap-'));
const edge = spawn(EDGE, ['--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

async function connect() {
  // Port 0: Edge picks a free port and writes it to DevToolsActivePort (avoids colliding with builders' browsers).
  for (let i = 0; i < 75 && !PORT; i++) { try { PORT = +readFileSync(join(profile, 'DevToolsActivePort'), 'utf8').split(/\r?\n/)[0]; } catch { await sleep(200); } }
  for (let i = 0; i < 50; i++) { try { await fetch(`http://127.0.0.1:${PORT}/json/version`); break; } catch { await sleep(200); } }
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pending = new Map(); const listeners = [];
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else listeners.forEach((f) => f(d)); });
  const send = (method, params = {}) => new Promise((res, rej) => { const n = ++id; pending.set(n, (d) => d.error ? rej(new Error(`${method}: ${d.error.message}`)) : res(d.result)); ws.send(JSON.stringify({ id: n, method, params })); });
  return { send, on: (f) => listeners.push(f), close: () => ws.close(), targetId: t.id };
}

async function load(c, url, w, h, mobile) {
  await c.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
  await c.send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
  const loaded = new Promise((r) => { const f = (d) => { if (d.method === 'Page.loadEventFired') r(); }; c.on(f); });
  await c.send('Page.navigate', { url });
  await Promise.race([loaded, sleep(15000)]);
  await sleep(2500);
}
const evalJs = async (c, expr) => (await c.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

async function scrollThrough(c) {
  await evalJs(c, `(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += innerHeight * 0.6) { scrollTo(0, y); await new Promise(r => setTimeout(r, 180)); } scrollTo(0, h); await new Promise(r => setTimeout(r, 1500)); scrollTo(0, 0); await new Promise(r => setTimeout(r, 1200)); })()`);
}

async function fullShot(c, file, w) {
  const h = Math.min(await evalJs(c, 'document.documentElement.scrollHeight'), 7000);
  const { data } = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  writeFileSync(file, Buffer.from(data, 'base64'));
  return h;
}

const runs = process.argv.slice(3);
const c = await connect();
await c.send('Page.enable'); await c.send('Runtime.enable'); await c.send('Log.enable');
let errors = [];
c.on((d) => {
  if (d.method === 'Runtime.exceptionThrown') errors.push('exception: ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text).slice(0, 200));
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push('console.error: ' + d.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 200));
  if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error' && !/favicon.ico/.test(d.params.entry.url || '')) errors.push('log: ' + d.params.entry.text.slice(0, 160) + ' ' + (d.params.entry.url || ''));
});
for (const run of runs) {
  const url = `${BASE}/${run}/index.html`;
  const res = { run, url };
  try {
    errors = [];
    await load(c, url, 1440, 900, false);
    const { data } = await c.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(OUT, 'shots', `${run}-fold.png`), Buffer.from(data, 'base64'));
    res.probe1440 = await evalJs(c, `(${PROBE.slice(PROBE.indexOf('async () =>'))})()`);
    await scrollThrough(c);
    res.height1440 = await fullShot(c, join(OUT, 'shots', `${run}-1440.png`), 1440);
    res.errors1440 = [...errors];
    errors = [];
    await load(c, url, 390, 844, true);
    res.probe390 = await evalJs(c, `(${PROBE.slice(PROBE.indexOf('async () =>'))})()`);
    await scrollThrough(c);
    res.height390 = await fullShot(c, join(OUT, 'shots', `${run}-390.png`), 390);
    res.errors390 = [...errors];
    console.log(`ok ${run} h1440=${res.height1440} h390=${res.height390} errors=${res.errors1440.length + res.errors390.length} hscroll390=${res.probe390?.overflow?.horizontalScroll}`);
  } catch (e) { res.failure = String(e); console.log(`FAIL ${run} ${e}`); }
  writeFileSync(join(OUT, 'probe', `${run}.json`), JSON.stringify(res, null, 1));
}
c.close(); edge.kill(); await sleep(500); try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(0);
