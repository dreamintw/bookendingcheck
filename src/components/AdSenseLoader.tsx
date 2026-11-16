import { useEffect } from "react";

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3949263106700435";

/**
 * Loads the AdSense script only after React has hydrated the app tree.
 * Rendered after <Outlet /> so its effect runs only once the boundary that
 * contains the page content has committed. Then it waits for window "load"
 * and an idle period before injecting the script (no fixed timer).
 * Injecting earlier lets AdSense append <ins> to <body> mid-hydration (React #418).
 */
export function AdSenseLoader() {
  useEffect(() => {
    const w = window as unknown as { __adsenseInjected?: boolean };
    if (w.__adsenseInjected || document.querySelector(`script[src="${ADSENSE_SRC}"]`)) return;
    w.__adsenseInjected = true;

    const inject = () => {
      if (document.querySelector(`script[src="${ADSENSE_SRC}"]`)) return;
      const s = document.createElement("script");
      s.async = true;
      s.src = ADSENSE_SRC;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };
    const afterIdle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(inject, { timeout: 4000 });
      } else {
        requestAnimationFrame(() => requestAnimationFrame(inject));
      }
    };
    if (document.readyState === "complete") afterIdle();
    else window.addEventListener("load", afterIdle, { once: true });
  }, []);
  return null;
}
