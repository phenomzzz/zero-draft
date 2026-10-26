# Integrations and handoff

## Optional capabilities, explicit ownership

Determine what the project actually needs. A static brochure need not have a booking engine, CMS, analytics, maps and authentication. Do not create accounts, purchase services or publish merely because this workflow mentions them. Honor authorization already given without redundant approval loops.

## CMS and agent editing

Model content semantically: typed sections and reusable entities, clear editorial field names, validation, meaningful previews, alt text, crop/focal point and ordering. Reference a product entity (a bike model, a class) instead of duplicating its specs and photos into several page arrays. Document any code-owned limits until they are migrated; do not imply every visible string is CMS-editable.

Keep integration-specific instructions with the project. Record project/dataset/workspace identities, schema files, preview configuration, renderer/cache behavior and commands. Never place write tokens, session secrets or client credentials in the skill or public bundle. Use official current tools/docs for setup and verify current free-tier entitlements rather than relying on historical plan names.

For Sanity/MCP specifically: inspect the actual schema before writes; target explicit project/dataset/document IDs; preserve array keys and unrelated fields; draft first when appropriate; publish only under the user's authorized scope. Schema metadata deployment, Studio deployment, content publication and website deployment are separate. A skill instruction is not an access-control boundary; use the service's actual roles and permissions.

Test the full content path using fixtures or an authorized reversible edit: render published/draft content as designed, preserve rich text and crop, update all consumers and verify after cache behavior. If making a temporary live edit, read current revision, limit the mutation, restore only the changed field with conflict protection, and report restoration failure rather than overwriting someone else's concurrent edit.

## Booking, enquiries and maps

An enquiry builder is not live availability or a confirmed reservation. Use accurate labels and avoid fabricated prices, capacity, partner services or guarantees. Define where date/party-size/item state lives, how it enters a summary and what external handoff actually occurs. Sending a message needs the relevant authorization; opening a draft or composing local text is different.

For maps use verified coordinates and routes from an authorized source under its terms. Do not trace/copy proprietary provider route data without permitted reuse. Distinguish road route, walking segment and estimated connector in both presentation and meaning. Markers, route endpoints and camera bounds share consistent coordinates. Verify accessible controls and non-map directions fallback. Record data provenance and update strategy.

## Preview and release

Identify which source and environment the deployment uses. Keep generated release artifacts separate when appropriate. Inspect exclusions so source backups, QA artifacts, environment files, debug workbenches and credentials are not unintentionally served.

Check authentication on the site, direct asset URLs, APIs and Studio where protection is required. Do not change protection settings as incidental cleanup. Verify absolute preview links, redirects, canonical metadata, CMS origin/CORS and media behavior in the deployed environment. A successful CLI exit is not enough.

Before replacing a live site: back up the current deployment reference, a content export and media originals; write the rollback command next to them; map every old route to a redirect target; keep `noindex` on previews and remove it deliberately at launch; and when DNS moves, preserve mail (MX/SPF/DKIM) records. Agents do not type protection passwords; the user verifies behind the gate, or a local stand-in that skips the gate is used and labelled as such.

Prefer read-only verification after deployment. Mutation probes need their own authorized scope, even if a script is named verify. Preserve a reproducible rollback path and state the actual deployed revision/URL without exposing secrets.

## Handoff deliverable

Include source location, run/build commands, content ownership, editor entry, known code-owned behavior, dependency/version notes, deployment procedure, rollback approach, evidence and unverified boundaries. Tailor it to the recipient: client editorial tasks differ from developer maintenance. Show one real editing path and one recovery path. Keep passwords and tokens in approved credential storage, not documents.
