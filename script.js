/**
 * ChattyApps Portfolio — Minimalist Script
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initProjectsList();
});

/* ==========================================================================
   Theme Controller
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("chattyapps_theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (storedTheme === "light" || (!storedTheme && prefersLight)) {
    document.body.classList.add("light-theme");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const current = document.body.classList.contains("light-theme") ? "light" : "dark";
      localStorage.setItem("chattyapps_theme", current);
    });
  }
}

/* ==========================================================================
   Projects Controller
   ========================================================================== */
function initProjectsList() {
  const container = document.getElementById("projects-list");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!container || typeof PROJECTS_DATA === "undefined") return;

  function render(category = "all") {
    container.innerHTML = "";

    const list = category === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.categoryId === category);

    list.forEach((project) => {
      const item = document.createElement("div");
      item.className = "project-item";
      item.setAttribute("data-id", project.id);

      const stackHtml = project.techStack
        .map((s) => `<span class="stack-pill">${s.name}</span>`)
        .join("");

      const featuresHtml = project.features
        .map((f) => `<li>${f}</li>`)
        .join("");

      const tgMessage = encodeURIComponent(`Здравствуйте! Интересует разработка решения уровня ${project.title}.`);
      const directUrl = project.telegramLink.includes("t.me")
        ? `${project.telegramLink}?text=${tgMessage}`
        : `https://t.me/chtoaster?text=${tgMessage}`;

      item.innerHTML = `
        <div class="project-row" role="button" tabindex="0" aria-expanded="false">
          <div class="project-info">
            <div class="project-meta-line">
              <span class="project-title">${project.title}</span>
              <span class="project-tag">${project.category}</span>
            </div>
            <p class="project-desc-short">${project.summary}</p>
          </div>
          <div class="project-expand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div class="project-drawer">
          <div class="drawer-content">
            <div>
              <div class="drawer-section-title">О проекте</div>
              <p class="drawer-text">${project.description}</p>
            </div>

            <div>
              <div class="drawer-section-title">Проблема и решение</div>
              <p class="drawer-text" style="margin-bottom: 8px;"><strong>Задача:</strong> ${project.problem}</p>
              <p class="drawer-text"><strong>Решение:</strong> ${project.solution}</p>
            </div>

            <div>
              <div class="drawer-section-title">Возможности</div>
              <ul class="drawer-features">
                ${featuresHtml}
              </ul>
            </div>

            <div>
              <div class="drawer-section-title">Архитектура</div>
              <p class="drawer-text">${project.architecture}</p>
            </div>

            <div>
              <div class="drawer-section-title">Стек</div>
              <div class="drawer-stack">
                ${stackHtml}
              </div>
            </div>

            <div class="drawer-footer">
              <span>Статус: ${project.status} • ${project.year}</span>
              <a href="${directUrl}" target="_blank" rel="noopener noreferrer" class="drawer-cta">
                <span>Обсудить аналог в Telegram</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;

      container.appendChild(item);

      // Accordion click handling
      const row = item.querySelector(".project-row");
      const drawer = item.querySelector(".project-drawer");

      row.addEventListener("click", () => {
        const isExpanded = item.classList.contains("expanded");

        if (isExpanded) {
          drawer.style.maxHeight = null;
          item.classList.remove("expanded");
          row.setAttribute("aria-expanded", "false");
        } else {
          drawer.style.maxHeight = drawer.scrollHeight + "px";
          item.classList.add("expanded");
          row.setAttribute("aria-expanded", "true");
        }
      });

      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          row.click();
        }
      });
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      render(filter);
    });
  });

  render("all");
}
