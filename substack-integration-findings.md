## Substack integration investigation summary

- Existing newsletter flow previously posted to ConvertKit; updated endpoint now attempts to hit Substack.
- Server-side POST requests to `https://insidegame.substack.com/api/v1/free` (with and without `?nojs=true`) consistently return HTTP 403/404, showing Cloudflare block pages.
- Substack endpoints require browser-origin traffic from their own domain; attempts with custom `Origin`, `Referer`, `User-Agent`, and publication metadata did not bypass checks.
- Substack’s embed uses a plain HTML form that posts directly to `/api/v1/free?nojs=true`; replicating this server-side doesn’t succeed because Cloudflare rejects non-browser requests.
- Viable options: (1) render a client-side form that submits straight to Substack’s endpoint, (2) use Substack’s provided iframe embed, or (3) run a trusted proxy (e.g., Worker) that maintains a Substack session—option 1 is simplest for custom UI.
- Work paused pending decision on preferred approach; no production changes deployed.
