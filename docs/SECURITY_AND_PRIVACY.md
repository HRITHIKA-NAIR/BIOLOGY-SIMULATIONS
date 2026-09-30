# Security and privacy decisions

## Current implementation

- Static pages and bundled public JavaScript; no application server/API, paid calls, credentials or database tables.
- RLS and API rate limiting are therefore **not applicable yet**, not “already secured”. Static host abuse/bandwidth limits still apply.
- No analytics, fingerprinting, session replay, third-party fonts, advertising, automatic YouTube embeds or remote AI requests.
- Links to YouTube/Pearson require a user action and use noreferrer/noopener.
- Local progress is opt-in, bounded to predefined lesson IDs, and treated as untrusted when restored. Saved states cannot grant money or privileges. Do not enter personal data; shared browser profiles share storage.
- Content is build-authored, not user-provided. No URL-driven HTML injection. DOM text APIs are used for stored content. The SVG player uses trusted repository-authored drawings.
- CSP blocks external scripts, plugins and frames; styles allow inline declarations for controlled SVG/animation. HTTPS is required for offline service workers. Cloudflare-specific `_headers` adds frame-ancestors and other headers; GitHub Pages ignores that file, so do not claim those response headers are enforced there.
- Offline cache includes public files only. No external videos or source sheets. A failed cache.addAll must not declare download success. Users can delete progress/cache separately.
- No student data in repository, build output or screenshots. `.env*` is ignored, even though no environment secret is needed.

## Before accounts or a database

Accounts and multi-device resume require a real backend and data store. At that point reassess Supabase Auth/Postgres or an equivalent; do not fake sign-in in a static app.

1. Enable RLS on all project tables. Owner-row rules for private progress; published-read-only rules for public catalogue; separate privileged editorial policy. RLS does not mean hiding public lessons from all users.
2. Verify authenticated identity server-side; never trust posted user IDs. Deny clients writes to roles, reward balances and eligibility decisions. Use restrictive insert/update checks as well as select policies. Test cross-user reads/writes with two identities.
3. Rate-limit every new API route, including auth/recovery, snapshots and expensive operations. Combine user/route/network limits with atomic global quotas. Shared school IPs need care. Prevent direct database routes bypassing guarded writes.
4. Keep secret/service-role, mail and deployment keys server-side. Public publishable identifiers are not secrets; they never replace access controls. Scan source, git history and built assets. Rotate leaked keys.
5. Use secure session handling, CSRF protection where cookies authorize mutations, strict validation, recent reauthentication for deletion, revocation checks and a resumable deletion job.
6. Establish retention, deletion/export process, backup restoration rules, vendor agreements/region, private incident contact and security monitoring.

## Children, policies and legal launch gates

No policy guarantees that the operator cannot be sued. Obtain jurisdiction-specific review before public accounts; this is a build plan, not legal clearance.

UK ICO guidance supports risk-proportionate age assurance or applying children’s protections to all users; a mandatory ID upload is not automatically appropriate. US COPPA and UAE requirements must be assessed against intended audience, operator location, actual data flows and service scope. Static guest access still creates hosting logs, so “no database” is not a universal privacy exemption.

Reference: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/faqs-on-the-15-standards-of-the-children-s-code/

Copyright protects expression, not scientific ideas or methods; copying branded artwork, narrated wording or video still needs rights consideration. A DMCA page alone does not establish safe-harbour eligibility or a designated agent. Confirm applicable process and a private complaints contact before public launch.

References: https://www.copyright.gov/what-is-copyright/ and https://www.copyright.gov/dmca-directory/

Physical shipping is inapplicable; the digital-access page describes actual delivery. No marketing exists, so no fake unsubscribe form is added. If introduced, marketing needs optional consent/appropriate lawful basis, working unsubscribe and no tracking by default.

## Remaining limitations

Manual assistive-technology testing, teacher review, cross-browser/mobile testing, private operator contact, applicable-law assessment and content rights sign-off are launch gates. PDF notes have a structured HTML equivalent but are not certified tagged accessible PDFs. External video captions cannot be promised until reviewed. The website uses system fonts. PDFs embed Inter with its SIL Open Font License preserved.
