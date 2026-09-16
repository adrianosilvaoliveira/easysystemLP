"use client";

import { useLayoutEffect } from "react";

function resetToTop() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.style.scrollBehavior = previous;
}

export function ScrollReset() {
  useLayoutEffect(() => {
    resetToTop();
  }, []);

  return null;
}
