# Site-wide usability fixes

## Changes
- Update the Hero’s third credibility stat to `12 / сектора` on mobile and desktop.
- Fix the moving-services hover state so descriptions retain readable contrast throughout hover.
- Rework each job card’s actions into a call button plus `Изпрати CV`, remove the phone helper line, and send the CV action to the existing candidate form with the listing sector and title prefilled.
- Tighten the listing detail facts into a three-column edge-to-edge grid on desktop and a clean stacked layout on mobile.
- Keep the `/obiavi` phone CTA on one line using responsive sizing and nowrap behavior.
- Replace QuickMatch’s static claims with live active-listing counts filtered by the selected sector or candidate criteria, including honest zero-result copy and links to matching listings or direct calling.
- Strengthen testimonial attribution and add a restrained staggered entrance/float treatment using the existing motion system.
- Replace the expandable contact menu with one gently bobbing assistant button that opens chat directly.

## Technical details
- Reuse the existing public active-listings server function and current database policies; no schema change is required.
- Extend homepage search parameters only as needed to carry a listing title into the candidate form.
- Preserve existing phone links, listing routes, chat logic, and all current responsive behavior.

## Verification
- Test the moving-service text while hovered.
- Test job-card CV prefill, QuickMatch counts and zero state, chat opening, and the `/obiavi` CTA.
- Capture desktop and 375px views of the listing detail facts and check for overflow or browser errors.
