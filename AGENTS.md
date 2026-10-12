<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Every visitor-facing form must store its submission in the database from server code before any
  external handoff (WhatsApp, phone, email) happens — a handoff link alone silently loses enquiries.
- Business facts (name, phone, email, address, service area) live only in `src/config/business.ts`;
  components read them through `hasPhone()` / `hasWhatsapp()` / `hasFacebook()` so a missing value
  shows a setup notice instead of a dead link.
