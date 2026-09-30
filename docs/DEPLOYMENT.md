# Deployment and discovery

## Free preview choices

This is a static output suitable for a non-commercial educational GitHub Pages preview or Cloudflare Pages. No database is necessary. The GitHub Pages workflow is manual (`workflow_dispatch`) to avoid silently publishing unverified lessons during branch development. A preview release can be deployed deliberately with its status notices and noindex intact.

GitHub: Repository Settings → Pages → Source: GitHub Actions. Merge the reviewed branch when ready, then run Deploy preview from Actions. The generated Pages URL uses `/BIOLOGY-SIMULATIONS/`. Workflow needs Pages write/id-token permissions; this code does not modify repository settings.

Cloudflare: connect GitHub, build command `npm ci && npm run build`, output `dist`, Node 24. Set `BASE_PATH=/` and `SITE_URL=https://YOUR-ACTUAL-HOST` (an origin, no trailing path). Use a free pages.dev host if you do not own a domain. A paid domain is optional. Preview branches should remain noindex. Cloudflare `_headers` supplies additional browser security headers; verify actual responses after deployment.

Provider plans, quotas and commercial-use terms can change. GitHub Pages is not intended for a commercial SaaS business. Reassess hosting before monetisation/accounts.

- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/pages/platform/limits/

## Search engines

Current state: unique titles/descriptions, static readable HTML, canonical URLs, clean lesson routes, sitemap.xml and robots.txt are generated. **Indexing is intentionally disabled by default** because these are unverified development previews. The default sitemap is empty. This is an explicit publication gate, not completed SEO launch.

After approved content exists:

1. Confirm the final domain and BASE_PATH; build canonical URLs for that host.
2. Add editorial publication status and change the build so only approved lesson pages become indexable. `INDEXABLE=true` currently enables catalogue indexing only; it never clears noindex on practical previews.
3. Ensure the sitemap includes only indexable canonical pages. Remove noindex from reviewed lessons only. Use real modification dates and original helpful summaries, not keyword stuffing.
4. Verify site ownership in Google Search Console using the actual account and supported DNS/HTML method. Submit the public sitemap URL. Inspect sample pages and monitor crawl reports.
5. Validate HTTPS, status codes, mobile rendering, metadata, headings, broken links and performance after release. Never use robots.txt/noindex as access control.

No Search Console ownership verification or sitemap submission has been performed. It needs access to the operator’s Google property/domain. Indexing and ranking are not guaranteed.

https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Releases and rollback

Builds pin npm dependencies in package-lock.json and run tests in CI. Deploy only dist. Keep source and old prototype in git; do not copy repository contents to production. Revert a deployment to a previous tested artifact for rollback. Re-test offline updates whenever the service-worker version logic changes.
