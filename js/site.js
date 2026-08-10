(() => {
  "use strict";

  // The static site only needs JavaScript for its fixed searches and image enlargement.
  const script = document.currentScript;
  const siteRoot = new URL("../", script ? script.src : window.location.href);

  const searchRoutes = new Map([
    ["みさきのブログ", "search/ia02-e96bc042.html"],
    ["ピアス", "search/ia03-538df9ca.html"],
    ["赤井条司", "search/ia04-25952ee4.html"],
    ["oota", "search/ia05-efed841e.html"],
    ["至寧堵宗", "search/ia06-79ab79a1.html"],
    ["放躯の儀", "search/ia07-4cd4255e.html"],
    ["法具", "religion/r04-dc3b2fc7.html"],
    ["涅槃座", "religion/r05-e210bc1f.html"],
  ]);

  const normalize = (value) => value.trim().replace(/[\s　]+/g, " ").toLowerCase();

  document.querySelectorAll("[data-archive-search]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector('input[name="q"]');
      const rawQuery = input ? input.value.trim() : "";
      const resultPage = searchRoutes.get(normalize(rawQuery));
      const target = resultPage ? new URL(resultPage, siteRoot) : new URL(form.action, window.location.href);
      if (!resultPage) target.searchParams.set("q", rawQuery);
      window.location.href = target.href;
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
