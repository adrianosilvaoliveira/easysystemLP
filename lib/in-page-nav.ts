export function isInPageHash(href: string) {
  return href.startsWith("#") && href.length > 1;
}

export function goToHash(href: string) {
  const id = decodeURIComponent(href.slice(1));
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export function handleInPageHashClick(
  event: { preventDefault: () => void },
  href: string,
) {
  if (!isInPageHash(href)) return;
  event.preventDefault();
  goToHash(href);
}
