/* Original local-only selector. No dependency, telemetry, storage or eval. */
(() => {
  'use strict';
  const config = window.ZERO_DRAFT_WORKBENCH;
  const controls = document.getElementById('controls');
  const select = document.getElementById('preview');
  const width = document.getElementById('width');
  const height = document.getElementById('height');
  const frame = document.getElementById('frame');
  const status = document.getElementById('status');
  const direct = document.getElementById('direct');
  const entries = new Map();
  const groups = new Map();
  const isLoopback = host => host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  const safeUrl = value => {
    const url = new URL(value, location.href);
    if (!['http:', 'https:'].includes(url.protocol) || !isLoopback(url.hostname) || url.username || url.password)
      throw new Error('Preview URLs must be credential-free HTTP(S) loopback URLs. Serve the workbench locally.');
    return url;
  };
  const clampInteger = (value, min, max, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) && number >= min && number <= max ? Math.round(number) : fallback;
  };
  try {
    if (!config || !Array.isArray(config.entries) || !config.entries.length) throw new Error('Configure at least one preview entry.');
    document.getElementById('project-title').textContent = config.title || 'Website previews';
    document.title = config.title || 'Website workbench';
    document.getElementById('description').textContent = config.description || '';
    for (const entry of config.entries) {
      if (!entry.id || entries.has(entry.id)) throw new Error('Each preview requires a unique id.');
      const url = safeUrl(entry.url);
      entries.set(entry.id, {...entry, resolvedUrl: url.href});
      const groupName = entry.group || 'Previews';
      if (!groups.has(groupName)) {
        const group = document.createElement('optgroup'); group.label = groupName;
        groups.set(groupName, group); select.append(group);
      }
      const option = document.createElement('option'); option.value = entry.id; option.textContent = entry.label || entry.id;
      groups.get(groupName).append(option);
    }
    const apply = () => {
      const entry = entries.get(select.value);
      if (!entry) throw new Error('Preview is unavailable.');
      width.value = clampInteger(width.value, 280, 2560, 390);
      height.value = clampInteger(height.value, 240, 1600, 844);
      frame.style.width = `${width.value}px`; frame.style.height = `${height.value}px`;
      frame.title = entry.label || entry.id;
      if (frame.getAttribute('src') !== entry.resolvedUrl) frame.src = entry.resolvedUrl;
      direct.href = entry.resolvedUrl;
      document.getElementById('note').textContent = entry.note || '';
      const url = new URL(location.href);
      url.searchParams.set('preview', entry.id); url.searchParams.set('width', width.value); url.searchParams.set('height', height.value);
      history.replaceState(null, '', url);
      status.textContent = `${entry.label || entry.id}: ${width.value} × ${height.value} CSS pixels. Inspect the frame or open directly.`;
    };
    const restore = () => {
      const params = new URL(location.href).searchParams;
      select.value = entries.has(params.get('preview')) ? params.get('preview') : entries.keys().next().value;
      width.value = clampInteger(params.get('width'), 280, 2560, 390);
      height.value = clampInteger(params.get('height'), 240, 1600, 844);
      apply();
    };
    controls.addEventListener('submit', event => { event.preventDefault(); apply(); });
    select.addEventListener('change', apply);
    window.addEventListener('popstate', restore);
    restore();
  } catch (error) {
    status.textContent = error.message;
    for (const el of controls.elements) el.disabled = true;
    direct.removeAttribute('href');
    frame.hidden = true;
  }
})();
