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

      const githubIconSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;

      const extraRowLinks = [];
      if (project.websiteUrl) {
        extraRowLinks.push(`
          <a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn-view-code" title="Сайт ${project.websiteUrl}" onclick="event.stopPropagation()">
            <span>Сайт</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `);
      }
      if (project.isPublicGithub && project.githubUrl) {
        extraRowLinks.push(`
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-view-code" title="Исходный код на GitHub" onclick="event.stopPropagation()">
            ${githubIconSvg}
            <span>Код</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `);
      }

      const drawerExtraLinks = [];
      if (project.rustoreUrl) {
        drawerExtraLinks.push(`
          <a href="${project.rustoreUrl}" target="_blank" rel="noopener noreferrer" class="drawer-btn-github" title="Страница в RuStore">
            <span>RuStore</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `);
      }
      if (project.websiteUrl) {
        drawerExtraLinks.push(`
          <a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer" class="drawer-btn-github" title="Официальный сайт">
            <span>Сайт (${project.websiteUrl.replace('https://', '')})</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `);
      }
      if (project.botUrl && project.viewUrl !== project.botUrl) {
        drawerExtraLinks.push(`
          <a href="${project.botUrl}" target="_blank" rel="noopener noreferrer" class="drawer-btn-github" title="Telegram-бот">
            <span>Telegram-бот</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `);
      }
      if (project.isPublicGithub && project.githubUrl) {
        drawerExtraLinks.push(`
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="drawer-btn-github">
            ${githubIconSvg}
            <span>Исходный код (GitHub)</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `);
      }

      const rowViewButtonHtml = project.isUnavailable
        ? `
          <div class="action-btn-group is-disabled" onclick="event.stopPropagation()">
            <button type="button" class="btn-view is-disabled" disabled aria-disabled="true" title="${project.unavailableLabel || 'сейчас недоступно'}">
              <span>${project.viewLabel || 'Посмотреть'}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
            <span class="badge-unavailable">${project.unavailableLabel || 'сейчас недоступно'}</span>
          </div>
        `
        : `
          <a href="${project.viewUrl}" target="_blank" rel="noopener noreferrer" class="btn-view" title="${project.viewLabel || 'Посмотреть'}" onclick="event.stopPropagation()">
            <span>${project.viewLabel || 'Посмотреть'}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        `;

      const drawerViewButtonHtml = project.isUnavailable
        ? `
          <div class="drawer-unavailable-group">
            <button type="button" class="drawer-btn-view is-disabled" disabled aria-disabled="true">
              <span>${project.viewLabel || 'Посмотреть'}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </button>
            <span class="badge-unavailable">${project.unavailableLabel || 'сейчас недоступно'}</span>
          </div>
        `
        : `
          <a href="${project.viewUrl}" target="_blank" rel="noopener noreferrer" class="drawer-btn-view">
            <span>${project.viewLabel || 'Посмотреть'}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        `;

      item.innerHTML = `
        <div class="project-row" role="button" tabindex="0" aria-expanded="false">
          <div class="project-leading">
            <div class="project-avatar">
              <img src="${project.icon}" alt="${project.title}" loading="lazy" />
            </div>
            <div class="project-info">
              <div class="project-meta-line">
                <span class="project-title">${project.title}</span>
                <span class="project-tag">${project.category}</span>
              </div>
              <p class="project-desc-short">${project.summary}</p>
            </div>
          </div>
          <div class="project-row-actions">
            ${rowViewButtonHtml}
            ${extraRowLinks.join("")}
            <div class="project-expand-icon" title="Подробнее">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div class="project-drawer">
          <div class="drawer-content">
            <div class="drawer-head-box">
              <div class="drawer-avatar">
                <img src="${project.icon}" alt="${project.title}" />
              </div>
              <div>
                <h3 class="drawer-head-title">${project.subtitle}</h3>
                <span class="drawer-head-meta">${project.badge} • ${project.status}</span>
              </div>
            </div>

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
              <div class="drawer-actions-left">
                ${drawerViewButtonHtml}

                ${drawerExtraLinks.join("")}

                ${!project.isPublicGithub ? `
                  <span class="drawer-nda-badge">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>Закрытый исходный код</span>
                  </span>
                ` : ''}
              </div>

              <a href="${directUrl}" target="_blank" rel="noopener noreferrer" class="drawer-cta">
                <span>Обсудить в Telegram</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
