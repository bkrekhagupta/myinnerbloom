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

## Application architecture
- Public content routes share BloomShell and focused section components so the landing page and deeper pages stay visually consistent.
- Discovery-call inquiries use a validated public server function and service-only database RPC with per-email throttling; submissions are never readable by visitors.
- After a booking is saved, send its owner notification through the linked Google Mail connector; keep booking persistence successful even if notification delivery fails.
- Brand colours live in semantic CSS tokens, and the generated sanctuary image is a bundled asset, keeping presentation consistent and self-contained.
