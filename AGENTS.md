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
- Third-country workers page is "Stobot HR" at /stobot-hr; /rabotnitsi-ot-chuzhbina 301-redirects there; form source stays "chuzhbina" for data continuity; its registration block is headed "Регистрации и удостоверения" and reads from the LICENSES array ({title, rows?/description?/number?, imageSrc?, imageCaption?}) which renders only when non-empty, images open in a Dialog lightbox with the caption "Копие на удостоверението (личните данни и подписът са скрити)"; the registration entry is text-only rows (scan has private data — never set imageSrc for it). 
- Process desktop height = steps.length × 100vh with heading, labels, photo and footnote inside the sticky panel; why: heading and steps stay visible together and pages share identical pinning.
- Pages with a pinned Process must not use overflow-x-hidden on an ancestor (use overflow-x-clip); why: hidden creates a scroll container and breaks sticky.
- SectionDots takes an optional sections prop; SafeReveal (no blur, amount 0) is the reveal for secondary pages; why: content never stays invisible on fast scroll.
- Legal entity data lives only in src/lib/legal.ts (LEGAL); empty fields never render; footer always shows the company line; why: one source for company/registration details.
- Legal pages (/poveritelnost, /biskvitki, /obshti-usloviya) use LegalPage + legalHead; privacy copy must describe only data the code actually collects; why: avoid false claims.
- Anything can open the chat via openChat() (window event listened to by FloatingContact); why: footer and other links open the same assistant.
