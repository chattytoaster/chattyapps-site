/**
 * ChattyApps Portfolio — Modern Interactive Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCanvasBackground();
  initProjects();
  initCalculator();
  initModal();
  initNavigation();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("chattyapps_theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (storedTheme === "light" || (!storedTheme && prefersLight)) {
    document.body.classList.add("light-theme");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
      localStorage.setItem("chattyapps_theme", currentTheme);
      showToast(currentTheme === "light" ? "Включена светлая тема" : "Включена темная тема");
    });
  }
}

/* ==========================================================================
   2. Interactive Star/Neural Canvas Background
   ========================================================================== */
function initCanvasBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

  let mouse = { x: null, y: null, maxDist: 140 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.5 ? "rgba(0, 240, 255," : "rgba(139, 92, 246,";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + " 0.7)";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = 1 - dist / 110;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.maxDist) {
          const alpha = 1 - dist / mouse.maxDist;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Projects Showcase & Filtering
   ========================================================================== */
function initProjects() {
  const grid = document.getElementById("projects-grid");
  const filterTabs = document.querySelectorAll(".filter-tab");
  if (!grid || typeof PROJECTS_DATA === "undefined") return;

  function render(filter = "all") {
    grid.innerHTML = "";
    const filtered = filter === "all" 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter((p) => p.categoryId === filter);

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.setAttribute("data-id", project.id);

      const metricsChips = project.metrics.slice(0, 2).map((m) => `
        <div class="metric-chip">
          <span class="metric-chip-label">${m.label}</span>
          <span class="metric-chip-value">${m.value}</span>
        </div>
      `).join("");

      const tagsHtml = project.techStack.slice(0, 4).map((t) => `
        <span class="tag-pill">${t.name}</span>
      `).join("");

      const isPreview = project.imageType === "preview";

      card.innerHTML = `
        <div class="card-visual ${isPreview ? 'preview-type' : ''}">
          <span class="card-badge">${project.badge}</span>
          <span class="card-year">${project.year}</span>
          <img src="${project.heroImage}" alt="${project.title}" loading="lazy" />
        </div>
        <div class="card-content">
          <div class="card-category">${project.category}</div>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-summary">${project.summary}</p>
          <div class="card-tags">${tagsHtml}</div>
          <div class="card-metrics-preview">${metricsChips}</div>
          <div class="card-footer">
            <button class="btn-card-details" data-open-modal="${project.id}">
              <span>Изучить кейс</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach click listeners to cards and modal trigger buttons
    grid.querySelectorAll("[data-open-modal]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-open-modal");
        openProjectModal(id);
      });
    });

    grid.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        openProjectModal(id);
      });
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-filter");
      render(category);
    });
  });

  render("all");
}

/* ==========================================================================
   4. Deep-Dive Case Study Modal
   ========================================================================== */
function initModal() {
  const overlay = document.getElementById("project-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");
  if (!overlay) return;

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });

  window.closeProjectModal = closeModal;
}

function openProjectModal(projectId) {
  if (typeof PROJECTS_DATA === "undefined") return;
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!project) return;

  const overlay = document.getElementById("project-modal-overlay");
  const modalContent = document.getElementById("modal-dynamic-content");
  if (!overlay || !modalContent) return;

  const featuresList = project.features.map((f) => `<li>${f}</li>`).join("");

  const stackPills = project.techStack.map((s) => `
    <span class="modal-stack-tag">${s.name} <small style="opacity: 0.7;">(${s.category})</small></span>
  `).join("");

  const metricsHtml = project.metrics.map((m) => `
    <div class="modal-metric-card">
      <div class="modal-metric-val">${m.value}</div>
      <div class="modal-metric-lbl">${m.label}</div>
    </div>
  `).join("");

  const tgMessage = encodeURIComponent(`Здравствуйте! Меня заинтересовал ваш проект ${project.title}. Хочу обсудить аналогичную разработку.`);
  const directLink = project.telegramLink.includes("t.me")
    ? `${project.telegramLink}?text=${tgMessage}`
    : `https://t.me/chtoaster?text=${tgMessage}`;

  modalContent.innerHTML = `
    <div class="modal-hero-box">
      <img src="${project.heroImage}" alt="${project.title}" class="modal-hero-thumb" />
      <div class="modal-hero-text">
        <h3 style="font-size: 1.4rem; margin-bottom: 6px; color: var(--text-primary);">${project.subtitle}</h3>
        <p>${project.description}</p>
      </div>
    </div>

    <div class="modal-section">
      <div class="problem-solution-grid">
        <div class="ps-box problem">
          <div class="ps-box-title">
            <span>⚠️</span> Бизнес-проблема
          </div>
          <p>${project.problem}</p>
        </div>
        <div class="ps-box solution">
          <div class="ps-box-title">
            <span>✨</span> Инженерное решение
          </div>
          <p>${project.solution}</p>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Ключевой функционал и возможности</h4>
      <ul class="modal-features-list">
        ${featuresList}
      </ul>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Архитектурные решения</h4>
      <div class="modal-architecture-box">
        ${project.architecture}
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Технологический стек</h4>
      <div class="modal-stack-tags">
        ${stackPills}
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Ключевые показатели и результаты</h4>
      <div class="modal-metrics-grid">
        ${metricsHtml}
      </div>
    </div>

    <div class="modal-footer">
      <span style="font-size: 0.86rem; color: var(--text-muted);">
        🔒 Исходный код проекта защищен соглашением о неразглашении (NDA).
      </span>
      <div style="display: flex; gap: 12px;">
        <button class="btn btn-secondary" onclick="closeProjectModal()">Закрыть</button>
        <a href="${directLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>Обсудить аналог в Telegram</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  `;

  // Set modal header
  document.getElementById("modal-project-badge").textContent = `${project.category} • ${project.status}`;
  document.getElementById("modal-project-title").textContent = project.title;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   5. Interactive Project Cost & Timeline Calculator
   ========================================================================== */
function initCalculator() {
  const platformButtons = document.querySelectorAll(".calc-platform-btn");
  const featureCheckboxes = document.querySelectorAll(".calc-feature-check");
  const urgencyRadios = document.querySelectorAll("input[name='calc-urgency']");

  const summaryPlatform = document.getElementById("calc-summary-platform");
  const summaryFeatures = document.getElementById("calc-summary-features");
  const summaryPrice = document.getElementById("calc-summary-price");
  const summaryTimeline = document.getElementById("calc-summary-timeline");

  const copyBriefBtn = document.getElementById("calc-copy-brief");
  const sendTelegramBtn = document.getElementById("calc-send-tg");

  if (!summaryPrice) return;

  const PLATFORMS = {
    bot: { name: "Telegram-бот", price: 35000, days: 7 },
    miniapp: { name: "Telegram Mini App", price: 60000, days: 14 },
    android: { name: "Android-приложение", price: 95000, days: 22 },
    desktop: { name: "Desktop Windows утилита", price: 45000, days: 10 },
    ecosystem: { name: "Комплексная экосистема (Бот + Web + API)", price: 140000, days: 30 }
  };

  const FEATURES = {
    ai: { name: "AI / LLM интеграция", price: 30000, days: 5 },
    payments: { name: "Эквайринг и платежи", price: 20000, days: 3 },
    crm: { name: "Google Sync & CRM", price: 25000, days: 4 },
    admin: { name: "Админ-панель и статистика", price: 20000, days: 4 },
    ocr: { name: "Компьютерное зрение / OCR", price: 25000, days: 4 },
    api: { name: "Выделенный REST API сервер", price: 35000, days: 6 }
  };

  let selectedPlatform = "bot";

  platformButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      platformButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedPlatform = btn.getAttribute("data-platform");
      calculate();
    });
  });

  featureCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const parentLabel = cb.closest(".calc-checkbox-label");
      if (parentLabel) {
        parentLabel.classList.toggle("checked", cb.checked);
      }
      calculate();
    });
  });

  urgencyRadios.forEach((r) => r.addEventListener("change", calculate));

  function calculate() {
    const platformData = PLATFORMS[selectedPlatform] || PLATFORMS.bot;
    let totalPrice = platformData.price;
    let totalDays = platformData.days;

    const selectedFeaturesList = [];
    featureCheckboxes.forEach((cb) => {
      if (cb.checked) {
        const featKey = cb.value;
        if (FEATURES[featKey]) {
          totalPrice += FEATURES[featKey].price;
          totalDays += FEATURES[featKey].days;
          selectedFeaturesList.push(FEATURES[featKey].name);
        }
      }
    });

    let urgencyMultiplier = 1.0;
    let urgencyText = "Стандартные";
    urgencyRadios.forEach((r) => {
      if (r.checked && r.value === "urgent") {
        urgencyMultiplier = 1.35;
        urgencyText = "Срочный запуск (+35%)";
        totalDays = Math.max(Math.round(totalDays * 0.65), 5);
      }
    });

    totalPrice = Math.round(totalPrice * urgencyMultiplier);

    // Update UI
    summaryPlatform.textContent = platformData.name;
    summaryFeatures.textContent = selectedFeaturesList.length > 0 
      ? selectedFeaturesList.join(", ") 
      : "Базовый функционал";

    summaryPrice.textContent = `от ${totalPrice.toLocaleString("ru-RU")} ₽`;
    summaryTimeline.textContent = `Ориентировочный срок: ~${totalDays} рабочих дней (${urgencyText})`;

    // Store state for Telegram / Copy action
    currentEstimate = {
      platform: platformData.name,
      features: selectedFeaturesList.length > 0 ? selectedFeaturesList : ["Базовый набор"],
      price: totalPrice,
      days: totalDays,
      urgency: urgencyText
    };
  }

  let currentEstimate = {};
  calculate();

  function getBriefText() {
    return `📋 Бриф на разработку (ChattyApps):
• Направление: ${currentEstimate.platform}
• Дополнительные модули: ${currentEstimate.features.join(", ")}
• Срочность: ${currentEstimate.urgency}
• Расчетная стоимость: от ${currentEstimate.price?.toLocaleString("ru-RU")} ₽
• Расчетный срок: ~${currentEstimate.days} рабочих дней`;
  }

  if (copyBriefBtn) {
    copyBriefBtn.addEventListener("click", () => {
      const text = getBriefText();
      navigator.clipboard.writeText(text).then(() => {
        showToast("Бриф скопирован в буфер обмена!");
      }).catch(() => {
        showToast("Не удалось скопировать, проверьте разрешения браузера");
      });
    });
  }

  if (sendTelegramBtn) {
    sendTelegramBtn.addEventListener("click", () => {
      const text = encodeURIComponent(getBriefText());
      window.open(`https://t.me/chtoaster?text=${text}`, "_blank");
    });
  }
}

/* ==========================================================================
   6. Navigation & Scroll Spy
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-open");
      });
    });
  }
}

/* ==========================================================================
   7. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name")?.value.trim();
    const contact = document.getElementById("form-contact")?.value.trim();
    const type = document.getElementById("form-type")?.value;
    const message = document.getElementById("form-message")?.value.trim();

    if (!name || !contact) {
      showToast("Пожалуйста, заполните имя и контактные данные.");
      return;
    }

    const payload = `🚀 Новая заявка с сайта ChattyApps:
• Имя: ${name}
• Контакт: ${contact}
• Тип проекта: ${type}
• Задача: ${message || "Не указано"}`;

    const tgUrl = `https://t.me/chtoaster?text=${encodeURIComponent(payload)}`;
    window.open(tgUrl, "_blank");
    showToast("Открываем Telegram для отправки сообщения...");
    form.reset();
  });
}

/* ==========================================================================
   8. Global Toast Notification
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-cyan); flex-shrink: 0;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}
