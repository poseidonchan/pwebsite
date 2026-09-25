(() => {
  "use strict";

  const navigation = [...document.querySelectorAll('.section-nav a[href^="#"]')]
    .map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(({ section }) => section);

  let framePending = false;

  function updateNavigation() {
    framePending = false;
    if (!navigation.length) return;

    const threshold = Math.min(180, window.innerHeight * 0.25);
    let current = navigation[0];
    for (const item of navigation) {
      if (item.section.getBoundingClientRect().top <= threshold) current = item;
    }

    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = navigation[navigation.length - 1];
    }

    for (const { link } of navigation) {
      if (link === current.link) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }

  function scheduleNavigationUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateNavigation);
  }

  const filters = document.querySelector(".publication-filters");
  const publications = [...document.querySelectorAll(".publication[data-area]")];
  const count = document.querySelector(".publication-count");
  let resetPublicationFilter;

  if (filters && publications.length && count) {
    const buttons = [...filters.querySelectorAll("button[data-filter]")];

    function filterPublications(area) {
      let visible = 0;
      for (const publication of publications) {
        publication.hidden = area !== "all" && publication.dataset.area !== area;
        if (!publication.hidden) visible += 1;
      }
      for (const button of buttons) {
        button.setAttribute("aria-pressed", String(button.dataset.filter === area));
      }
      count.textContent = area === "all"
        ? `${visible} publications`
        : `${visible} of ${publications.length} publications`;
      scheduleNavigationUpdate();
    }

    for (const button of buttons) {
      button.addEventListener("click", () => filterPublications(button.dataset.filter));
    }

    resetPublicationFilter = () => filterPublications("all");
    filterPublications("all");
    filters.hidden = false;
    count.hidden = false;
  }

  // Reveal collapsed or filtered content before following an in-page link.
  function revealHashTarget() {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (target?.matches(".publication[hidden]") && resetPublicationFilter) {
      resetPublicationFilter();
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
    if (target instanceof HTMLDetailsElement && !target.open) {
      target.open = true;
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
    scheduleNavigationUpdate();
  }

  window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
  window.addEventListener("resize", scheduleNavigationUpdate);
  window.addEventListener("hashchange", revealHashTarget);
  document.querySelectorAll('.news-list a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      // Repeated clicks on the current fragment do not emit hashchange.
      if (link.hash === window.location.hash) revealHashTarget();
    });
  });
  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", scheduleNavigationUpdate);
  });
  revealHashTarget();
})();
