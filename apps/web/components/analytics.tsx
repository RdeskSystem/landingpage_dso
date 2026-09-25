"use client";

import Script from "next/script";
import { useEffect } from "react";

type PlausibleOptions = { props?: Record<string, string> };

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleOptions) => void;
  }
}

const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export function Analytics() {
  useEffect(() => {
    if (!analyticsDomain) return;

    function trackLinkClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      let eventName = link.dataset.analyticsEvent;
      if (!eventName && href.startsWith("tel:")) eventName = "phone_click";
      if (!eventName && /^https:\/\/(?:www\.)?wa\.me\//i.test(href)) eventName = "whatsapp_click";
      if (!eventName && /\/kontak(?:[/?#]|$)/i.test(href)) eventName = "cta_click";
      if (!eventName) return;

      trackAnalyticsEvent(eventName, {
        placement: link.dataset.analyticsPlacement ?? "site",
      });
    }

    document.addEventListener("click", trackLinkClick);
    return () => document.removeEventListener("click", trackLinkClick);
  }, []);

  if (!analyticsDomain) return null;

  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={analyticsDomain}
      strategy="afterInteractive"
    />
  );
}

export function trackAnalyticsEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.plausible?.(name, props ? { props } : undefined);
}
