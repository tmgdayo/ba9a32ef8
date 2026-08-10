(() => {
  "use strict";

  // The static site only needs JavaScript for its seven fixed searches and image enlargement.
  const script = document.currentScript;
  const siteRoot = new URL("../", script ? script.src : window.location.href);

  const searchRoutes = new Map([
    ["みさきのブログ", "search/misaki-blog.html"],
    ["ピアス", "search/earrings.html"],
    ["赤井条司", "search/akai-joji.html"],
    ["oota", "search/oota.html"],
    ["至寧堵", "search/shinedo.html"],
    ["放躯の儀", "search/ritual.html"],
    ["涅槃座", "search/nirvana-seat.html"],
  ]);

  const normalize = (value) => value.trim().replace(/[\s　]+/g, " ").toLowerCase();

  document.querySelectorAll("[data-archive-search]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector('input[name="q"]');
      const rawQuery = input ? input.value.trim() : "";
      const resultPage = searchRoutes.get(normalize(rawQuery));
      const target = resultPage || `search/not-found.html?q=${encodeURIComponent(rawQuery)}`;
      window.location.href = new URL(target, siteRoot).href;
    });
  });

  const queryTarget = document.querySelector("[data-search-query]");
  if (queryTarget) queryTarget.textContent = new URLSearchParams(window.location.search).get("q") || "";

  let dialog;
  let dialogImage;
  const closeDialog = () => { if (dialog && dialog.open) dialog.close(); };

  document.querySelectorAll("[data-lightbox]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (typeof HTMLDialogElement === "undefined") return;
      event.preventDefault();
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.className = "lightbox";
        dialog.innerHTML = '<button type="button" aria-label="閉じる">×</button><img alt="">';
        document.body.append(dialog);
        dialogImage = dialog.querySelector("img");
        dialog.querySelector("button").addEventListener("click", closeDialog);
        dialog.addEventListener("click", (dialogEvent) => { if (dialogEvent.target === dialog) closeDialog(); });
      }
      dialogImage.src = link.href;
      dialogImage.alt = link.dataset.alt || link.querySelector("img")?.alt || "拡大画像";
      dialog.showModal();
    });
  });
})();
