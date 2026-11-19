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

- Phone numbers live only in `src/lib/contact.ts`; never hardcode a number. WORKERS_PHONE is the default everywhere; CLIENTS_PHONE is for all company-facing contact (the "За фирми" form, the QuickMatch company tab, the third-country workers page) and for the chat assistant's employer answers.
- Company inquiry forms submit via `submitCompanyRequest` into `company_requests` with a `source` tag; anon may only insert, so leads stay private.
- `Process` accepts `steps/heading/footnote` props so other pages reuse the pinned-steps pattern instead of a new one.
- Third-country workers page is "Stobot HR" at /stobot-hr; /rabotnitsi-ot-chuzhbina 301-redirects there; form source stays "chuzhbina" for data continuity; its LICENSES entries ({title, description?, number?, imageSrc?}) render only when non-empty, images open in a Dialog lightbox.
