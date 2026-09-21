# Restoring CyberKnight without removing existing features

The earlier intact gameplay implementation is commit [`83c8dfa`](https://github.com/LunarArrow89/CyberKnight/tree/83c8dfa20dd4034519d8b4d97f91fb77f45d60f0). It includes fragments, travel unlocks, combat rewards, level-ups, work/rest timers, activity cancellation, shop ownership checks, and inventory rendering.

The current branch should retain that implementation as the baseline. The new helper files are additive:

- `activity-progress.css` contains the live progress-bar styling and centered popup actions.
- `restoration.js` adds the activity-progress UI without replacing the existing timers.

To enable the additive UI, add these lines after the existing stylesheet and game script in `index.html`:

```html
<link rel="stylesheet" href="activity-progress.css">
<script src="restoration.js"></script>
```

Do not replace the existing inline game script with a shortened version; that is what caused the fragments and activity features to disappear.
