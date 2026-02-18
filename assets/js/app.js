/**
 * FRONTEND MASTERY - Aplicación principal
 * Funcionalidad compartida para navegación multi-página y UI del curso
 */

// ============================================================
// VARIABLES GLOBALES
// ============================================================

// Mapeo central de secciones -> archivo HTML
const SECTION_ROUTES = {
  "section-core-skill": "01-core-skill.html",
  "section-frameworks": "02-frameworks.html",
  "section-mental-models": "03-mental-models.html",
  "section-state-machine": "04-state-machine.html",
  "section-essential-derived": "05-essential-derived.html",
  "section-state-patterns": "06-state-patterns.html",
  "section-state-architecture": "07-state-architecture.html",
  "section-state-antipatterns": "08-state-antipatterns.html",
  "section-barebone-method": "09-barebone-method.html",
  "section-web-accessibility": "10-web-accessibility.html",
  "section-component-testing": "11-component-testing.html",
  "section-summary": "12-summary.html",
  "section-web-performance-scalability": "13-web-performance-scalability.html",
  "section-core-web-vitals": "14-core-web-vitals.html",
  "section-critical-rendering-path": "15-critical-rendering-path.html",
  "section-five-steps-web-performance": "16-five-steps-web-performance.html",
  "section-diagnosis": "17-diagnosis.html",
  "section-optimising-the-server": "18-optimising-the-server.html",
  "section-static-assets": "19-static-assets.html",
  "section-optimising-javascript-bundle": "20-optimising-javascript-bundle.html",
  "section-framework-optimizations": "21-framework-optimizations.html",
  "section-web-fundamentals": "01-web-fundamentals.html",
};

// ============================================================
// MÓDULO: MANEJO DE IDIOMAS
// ============================================================

/**
 * Cambia el idioma de la aplicación
 * @param {string} lang - Código de idioma ('es' o 'en')
 */
function setLanguage(lang) {
  // Guardar preferencia de idioma
  localStorage.setItem("preferredLanguage", lang);

  // Obtener URL actual
  const currentUrl = window.location.pathname;

  // Navegar a la versión correcta del idioma
  if (lang === "es") {
    if (currentUrl.includes("/en/")) {
      window.location.href = currentUrl.replace("/en/", "/es/");
    } else if (currentUrl.includes("/es/")) {
      // Ya estamos en español
      return;
    } else {
      // En raíz o en otra ubicación
      window.location.href =
        "./frontend-mastery/es/sections/01-core-skill.html";
    }
  } else if (lang === "en") {
    if (currentUrl.includes("/es/")) {
      window.location.href = currentUrl.replace("/es/", "/en/");
    } else if (currentUrl.includes("/en/")) {
      // Ya estamos en inglés
      return;
    } else {
      // En raíz o en otra ubicación
      window.location.href =
        "./frontend-mastery/en/sections/01-core-skill.html";
    }
  }
}

// ============================================================
// MÓDULO: NAVEGACIÓN
// ============================================================

/**
 * Navega a una sección específica (para páginas monolíticas)
 * @param {string} sectionId - ID de la sección a navegar
 */
function navigateToSection(sectionId) {
  const route = SECTION_ROUTES[sectionId];
  const currentPath = window.location.pathname;

  // Arquitectura actual: navegación multi-página por archivos HTML.
  if (route && (currentPath.includes("/es/") || currentPath.includes("/en/"))) {
    const targetPath = currentPath.includes("/sections/")
      ? route
      : `sections/${route}`;
    window.location.href = targetPath;
    return;
  }

  // Fallback: navegación por ancla en página actual.
  const section = document.getElementById(sectionId);
  if (section) {
    smoothScroll(sectionId);
  }
}

// ============================================================
// MÓDULO: INTERFAZ DE USUARIO
// ============================================================

/**
 * Alterna la apertura/cierre de bloques de entrevista
 * @param {HTMLElement} element - Elemento del bloque de entrevista
 */
function toggleInterview(element) {
  element.classList.toggle("open");
  const arrow = element.querySelector(".toggle-arrow");
  if (arrow) {
    const newText = element.classList.contains("open") ? "▼" : "▶";
    arrow.textContent = newText;
  }
}

/**
 * Scroll suave a un elemento
 * @param {string} targetId - ID del elemento
 */
function smoothScroll(targetId) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Copiar código al clipboard
 * @param {HTMLElement} codeBlock - Bloque de código
 */
function copyCode(codeBlock, buttonElement) {
  const code = codeBlock.querySelector("code")?.textContent;
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      const btn = buttonElement || codeBlock.querySelector(".btn-copy");
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = "✓ Copiado";
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  }
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Restaurar idioma guardado (si existe en DOM)
  const savedLanguage = localStorage.getItem("preferredLanguage") || "es";
  if (document.querySelector("[data-lang-es]")) {
    setLanguage(savedLanguage);
  }

  // Toggle menú móvil
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    if (!menuToggle.dataset.toggleBound) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
      menuToggle.dataset.toggleBound = "true";
    }

    document.querySelector(".main-content")?.addEventListener("click", () => {
      if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
      }
    });
  }

  // Inicializar bloques de entrevista
  const interviewBlocks = document.querySelectorAll(".interview-block");
  interviewBlocks.forEach((block) => {
    block.addEventListener("click", function () {
      toggleInterview(this);
    });
  });

  // Agregar botones de copiar a bloques de código
  document.querySelectorAll(".code-block").forEach((block) => {
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn btn-copy";
    copyBtn.textContent = "Copiar";
    copyBtn.onclick = (e) => copyCode(block, e.currentTarget);
    block.insertBefore(copyBtn, block.firstChild);
  });

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        smoothScroll(href.substring(1));
      }
    });
  });
});

// ============================================================
// EXPORTAR FUNCIONES (para módulos)
// ============================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    setLanguage,
    navigateToSection,
    toggleInterview,
    smoothScroll,
    copyCode,
  };
}

// ============================================================
// INYECCIÓN DE SIDEBAR Y NAVEGACIÓN EN SECCIONES
// ============================================================

/**
 * Inyecta sidebar y navegación en páginas de secciones
 */
function injectSidebarAndNav() {
  // Solo inyectar si no existe ya el sidebar
  if (document.getElementById("sidebar")) {
    return;
  }

  const currentUrl = window.location.pathname;
  const isSpanish = currentUrl.includes("/es/");
  const isSection = currentUrl.includes("/sections/");
  const isSoftwareCycle = currentUrl.includes("/softwarecycle/");
  const isFullStack = currentUrl.includes("/fullstack/");

  if (!isSection && !isSoftwareCycle) {
    return; // No estamos en una sección
  }

  // Crear botón burger para mobile si no existe
  if (!document.getElementById("menu-toggle")) {
    const menuToggleBtn = document.createElement("button");
    menuToggleBtn.id = "menu-toggle";
    menuToggleBtn.className = "menu-toggle";
    menuToggleBtn.setAttribute("aria-label", "Toggle navigation menu");
    menuToggleBtn.textContent = "☰";
    document.body.insertAdjacentElement("afterbegin", menuToggleBtn);
  }

  // Crear el sidebar con acordeón
  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">Frontend Mastery</div>
        <nav>
            <ul>
                <li><a href="../../../index.html" class="nav-link">← ${isSpanish ? 'Volver al inicio' : 'Back to home'}</a></li>

                <!-- SECCIÓN 1: LA HABILIDAD CLAVE -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section1">
                        <span>${isSpanish ? 'La Habilidad Clave' : 'The Core Skill'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section1-content">
                        <li><a href="01-core-skill.html" class="nav-link">${isSpanish ? 'La Habilidad Clave' : 'The Core Skill'}</a></li>
                    </ul>
                </li>

                <!-- SECCIÓN 2: ¿POR QUÉ FRAMEWORKS? -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section2">
                        <span>${isSpanish ? '1. ¿Por qué Frameworks?' : '1. Why Frameworks?'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section2-content">
                        <li><a href="02-frameworks.html" class="nav-link">${isSpanish ? '¿Por qué Frameworks?' : 'Why Frameworks?'}</a></li>
                    </ul>
                </li>

                <!-- SECCIÓN 3: MODELOS MENTALES Y STATE MANAGEMENT -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section3">
                        <span>${isSpanish ? '2. Modelos Mentales & State' : '2. Mental Models & State'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section3-content">
                        <li><a href="03-mental-models.html" class="nav-link">${isSpanish ? 'Modelos Mentales' : 'Mental Models'}</a></li>
                        <li><a href="04-state-machine.html" class="nav-link">2.3 State Machine</a></li>
                        <li><a href="05-essential-derived.html" class="nav-link">2.4 ${isSpanish ? 'Estado Esencial vs Derivado' : 'Essential vs Derived State'}</a></li>
                        <li><a href="06-state-patterns.html" class="nav-link">2.5 ${isSpanish ? 'Patrones de Estado' : 'State Patterns'}</a></li>
                        <li><a href="07-state-architecture.html" class="nav-link">2.6 ${isSpanish ? 'Arquitectura del Estado' : 'State Architecture'}</a></li>
                        <li><a href="08-state-antipatterns.html" class="nav-link">2.7 ${isSpanish ? 'Anti-patrones' : 'Anti-patterns'}</a></li>
                        <li><a href="09-barebone-method.html" class="nav-link">2.8 Barebone Method</a></li>
                        <li><a href="10-web-accessibility.html" class="nav-link">2.9 ${isSpanish ? 'Accesibilidad Web' : 'Web Accessibility'}</a></li>
                        <li><a href="11-component-testing.html" class="nav-link">2.10 Testing</a></li>
                    </ul>
                </li>

                <!-- SECCIÓN 4: RESUMEN -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section4">
                        <span>${isSpanish ? '3. Resumen' : '3. Summary'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section4-content">
                        <li><a href="12-summary.html" class="nav-link">${isSpanish ? 'Resumen' : 'Summary'}</a></li>
                    </ul>
                </li>

                <!-- SECCIÓN 5: WEB PERFORMANCE -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section5">
                        <span>${isSpanish ? '3. Web Performance & Scalability' : '3. Web Performance & Scalability'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section5-content">
                        <li><a href="13-web-performance-scalability.html" class="nav-link">3. Web Performance & Scalability</a></li>
                        <li><a href="14-core-web-vitals.html" class="nav-link">3.1 The Core Web Vitals</a></li>
                        <li><a href="15-critical-rendering-path.html" class="nav-link">3.2 The Critical Rendering Path</a></li>
                        <li><a href="16-five-steps-web-performance.html" class="nav-link">3.3 ${isSpanish ? 'Los 5 Pasos Web Performance' : 'The 5 Steps Web Performance'}</a></li>
                        <li><a href="17-diagnosis.html" class="nav-link">3.3.1 ${isSpanish ? 'Diagnóstico Profesional' : 'Professional Diagnosis'}</a></li>
                        <li><a href="18-optimising-the-server.html" class="nav-link">3.3.2 ${isSpanish ? 'Optimización del Servidor' : 'Optimising The Server'}</a></li>
                        <li><a href="19-static-assets.html" class="nav-link">3.3.3 Static Assets: ${isSpanish ? 'Imágenes, Fuentes & CSS' : 'Images, Fonts & CSS'}</a></li>
                        <li><a href="20-optimising-javascript-bundle.html" class="nav-link">3.3.4 Optimising the JavaScript Bundle</a></li>
                        <li><a href="21-framework-optimizations.html" class="nav-link">3.3.5 Framework Optimizations</a></li>
                    </ul>
                </li>

                <!-- SECCIÓN 6: FULLSTACK -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section6">
                        <span>${isSpanish ? '4. FullStack' : '4. FullStack'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section6-content">
                        <li><a href="${isFullStack ? (isSpanish ? '01-fundamentos-web.html' : '01-web-fundamentals.html') : (isSpanish ? '../../../fullstack/es/sections/01-fundamentos-web.html' : '../../../fullstack/en/sections/01-web-fundamentals.html')}" class="nav-link">${isSpanish ? '1.1.0 HTTP: Fundamentals' : '1.1.0 HTTP: Fundamentals'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '02-content-negotiation.html' : '02-content-negotiation.html') : (isSpanish ? '../../../fullstack/es/sections/02-content-negotiation.html' : '../../../fullstack/en/sections/02-content-negotiation.html')}" class="nav-link">${isSpanish ? '1.1.1 HTTP Content Negotiation & Compression' : '1.1.1 HTTP Content Negotiation & Compression'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '03-basic-auth.html' : '03-basic-auth.html') : (isSpanish ? '../../../fullstack/es/sections/03-basic-auth.html' : '../../../fullstack/en/sections/03-basic-auth.html')}" class="nav-link">${isSpanish ? '1.1.2 HTTP: Basic Auth' : '1.1.2 HTTP: Basic Auth'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '04-rest-apis.html' : '04-rest-apis.html') : (isSpanish ? '../../../fullstack/es/sections/04-rest-apis.html' : '../../../fullstack/en/sections/04-rest-apis.html')}" class="nav-link">${isSpanish ? '1.2 Fundamentals: REST APIs' : '1.2 Fundamentals: REST APIs'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '05-api-business-logic.html' : '05-api-business-logic.html') : (isSpanish ? '../../../fullstack/es/sections/05-api-business-logic.html' : '../../../fullstack/en/sections/05-api-business-logic.html')}" class="nav-link">${isSpanish ? '1.3 Fundamentals: The API Business Logic' : '1.3 Fundamentals: The API Business Logic'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '05-1-how-apis-work.html' : '05-1-how-apis-work.html') : (isSpanish ? '../../../fullstack/es/sections/05-1-how-apis-work.html' : '../../../fullstack/en/sections/05-1-how-apis-work.html')}" class="nav-link">${isSpanish ? '1.3.1 Fundamentals: How APIs Really Work' : '1.3.1 Fundamentals: How APIs Really Work'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '06-backend-storage.html' : '06-backend-storage.html') : (isSpanish ? '../../../fullstack/es/sections/06-backend-storage.html' : '../../../fullstack/en/sections/06-backend-storage.html')}" class="nav-link">${isSpanish ? '🧠 2.0 Databases: Backend Storage' : '🧠 2.0 Databases: Backend Storage'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '06-databases.html' : '06-databases.html') : (isSpanish ? '../../../fullstack/es/sections/06-databases.html' : '../../../fullstack/en/sections/06-databases.html')}" class="nav-link">${isSpanish ? '1.4 Fundamentals: Databases' : '1.4 Fundamentals: Databases'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '07-mvc-architecture.html' : '07-mvc-architecture.html') : (isSpanish ? '../../../fullstack/es/sections/07-mvc-architecture.html' : '../../../fullstack/en/sections/07-mvc-architecture.html')}" class="nav-link">${isSpanish ? '2.0 API Service Architecture: MVC' : '2.0 API Service Architecture: MVC'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '08-orms.html' : '08-orms.html') : (isSpanish ? '../../../fullstack/es/sections/08-orms.html' : '../../../fullstack/en/sections/08-orms.html')}" class="nav-link">${isSpanish ? '2.4 ORMs: Object Relational Mapper' : '2.4 ORMs: Object Relational Mapper'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '08-1-migrations.html' : '08-1-migrations.html') : (isSpanish ? '../../../fullstack/es/sections/08-1-migrations.html' : '../../../fullstack/en/sections/08-1-migrations.html')}" class="nav-link">${isSpanish ? '2.1 ORMs: Database Migrations' : '2.1 ORMs: Database Migrations'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '09-rest-to-graphql.html' : '09-rest-to-graphql.html') : (isSpanish ? '../../../fullstack/es/sections/09-rest-to-graphql.html' : '../../../fullstack/en/sections/09-rest-to-graphql.html')}" class="nav-link">${isSpanish ? '3.0 From REST to GraphQL' : '3.0 From REST to GraphQL'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '09-1-n-plus-one.html' : '09-1-n-plus-one.html') : (isSpanish ? '../../../fullstack/es/sections/09-1-n-plus-one.html' : '../../../fullstack/en/sections/09-1-n-plus-one.html')}" class="nav-link">${isSpanish ? '🔁 3.1 GraphQL: The n+1 Problem (Interview Question)' : '🔁 3.1 GraphQL: The n+1 Problem (Interview Question)'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '10-authentication-oauth.html' : '10-authentication-oauth.html') : (isSpanish ? '../../../fullstack/es/sections/10-authentication-oauth.html' : '../../../fullstack/en/sections/10-authentication-oauth.html')}" class="nav-link">${isSpanish ? '🔐 4.0 Authentication: OAuth 2.0 + OIDC' : '🔐 4.0 Authentication: OAuth 2.0 + OIDC'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '11-sql-injection.html' : '11-sql-injection.html') : (isSpanish ? '../../../fullstack/es/sections/11-sql-injection.html' : '../../../fullstack/en/sections/11-sql-injection.html')}" class="nav-link">${isSpanish ? '🔓 5.1 Security: SQL Injection' : '🔓 5.1 Security: SQL Injection'}</a></li>
                        <li><a href="${isFullStack ? (isSpanish ? '12-xss-attacks.html' : '12-xss-attacks.html') : (isSpanish ? '../../../fullstack/es/sections/12-xss-attacks.html' : '../../../fullstack/en/sections/12-xss-attacks.html')}" class="nav-link">${isSpanish ? '👨🏽‍💻 5.2 Security: XSS Attacks' : '👨🏽‍💻 5.2 Security: XSS Attacks'}</a></li>
                    </ul>
                </li>

                <!-- SECCIÓN 7: SOFTWARE LIFECYCLE -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section7">
                        <span>${isSpanish ? '⚙️ 7.0 Software Lifecycle' : '⚙️ 7.0 Software Lifecycle'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section7-content">
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/senior-mindset.html' : '../../../../softwarecycle/en/senior-mindset.html'}" class="nav-link">${isSpanish ? '🚀 Senior Mindset: DevOps' : '🚀 Senior Mindset: DevOps'}</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
    `;

  // Inyectar sidebar al inicio del body
  document.body.insertAdjacentHTML("afterbegin", sidebarHTML);

  // Configurar evento para accordion headers
  setTimeout(() => {
    const accordionHeaders = document.querySelectorAll(".nav-accordion-header");
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const accordionId = this.getAttribute("data-accordion");
        const content = document.getElementById(accordionId + "-content");

        if (content) {
          // Toggle clase active en el header
          this.classList.toggle("active");

          // Toggle clase active en el content
          content.classList.toggle("active");
        }
      });
    });
  }, 0);

  // Agregar event listener a nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Conectar botón burger con sidebar en secciones inyectadas
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (menuToggle && sidebar) {
    if (!menuToggle.dataset.toggleBound) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
      menuToggle.dataset.toggleBound = "true";
    }
  }
}

/**
 * Garantiza que siempre exista un switcher de idioma visible
 * en cualquier página de frontend-mastery (ES/EN).
 */
function ensureGlobalLanguageSwitcher() {
  const currentUrl = window.location.pathname;
  const isLocalizedPage =
    currentUrl.includes("/frontend-mastery/es/") ||
    currentUrl.includes("/frontend-mastery/en/");

  if (!isLocalizedPage) {
    return;
  }

  // Si ya existe el flotante, no duplicar
  if (document.querySelector(".language-switcher--floating")) {
    return;
  }

  const isSpanish = currentUrl.includes("/es/");
  const switcher = document.createElement("div");
  switcher.className = "language-switcher language-switcher--floating";
  switcher.style.position = "fixed";
  switcher.style.top = "12px";
  switcher.style.right = "12px";
  switcher.style.zIndex = "1300";
  switcher.style.background = "#fff";
  switcher.style.padding = "6px";
  switcher.style.borderRadius = "8px";
  switcher.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)";

  switcher.innerHTML = `
        <button id="btn-es" class="lang-btn ${isSpanish ? "active" : ""}" onclick="setLanguage('es')">🇪🇸 Español</button>
        <button id="btn-en" class="lang-btn ${!isSpanish ? "active" : ""}" onclick="setLanguage('en')">🇺🇸 English</button>
    `;

  document.body.appendChild(switcher);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  injectSidebarAndNav();
  ensureGlobalLanguageSwitcher();
});

// Ejecutar también inmediatamente en caso de que el script se cargue después
injectSidebarAndNav();
ensureGlobalLanguageSwitcher();
