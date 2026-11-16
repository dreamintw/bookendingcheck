
- AdSense script is injected client-side by `AdSenseLoader` after hydration + window load + idle, never as an SSR head script; SSR keeps only the `google-adsense-account` meta. Why: AdSense appending <ins> during hydration caused React #418.
