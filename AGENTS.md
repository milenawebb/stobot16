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

- Company inquiry forms submit via `submitCompanyRequest` into `company_requests` with a `source` tag; anon may only insert, so leads stay private.
- `Process` accepts `steps/heading/footnote` props so other pages reuse the pinned-steps pattern instead of a new one.
