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

  if (!isSection) {
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

  // Crear el sidebar
  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">Frontend Mastery</div>
        <nav>
            <ul>
                ${
                  isSpanish
                    ? `
                <li><a href="../../../index.html" class="nav-link">← Volver al inicio</a></li>
                <li><a href="01-core-skill.html" class="nav-link">La Habilidad Clave</a></li>
                <li><a href="02-frameworks.html" class="nav-link">1. ¿Por qué Frameworks?</a></li>
                <li><a href="03-mental-models.html" class="nav-link">2. Modelos Mentales</a></li>
                <li><a href="04-state-machine.html" class="nav-link">2.3 State Machine</a></li>
                <li><a href="05-essential-derived.html" class="nav-link">2.4 Estado Esencial vs Derivado</a></li>
                <li><a href="06-state-patterns.html" class="nav-link">2.5 Patrones de Estado</a></li>
                <li><a href="07-state-architecture.html" class="nav-link">2.6 Arquitectura del Estado</a></li>
                <li><a href="08-state-antipatterns.html" class="nav-link">2.7 Anti-patrones</a></li>
                <li><a href="09-barebone-method.html" class="nav-link">2.8 Barebone Method</a></li>
                <li><a href="10-web-accessibility.html" class="nav-link">2.9 Accesibilidad Web</a></li>
                <li><a href="11-component-testing.html" class="nav-link">2.10 Testing</a></li>
                <li><a href="12-summary.html" class="nav-link">3. Resumen</a></li>
                <li><a href="13-web-performance-scalability.html" class="nav-link">3. Web Performance & Scalability</a></li>
                <li><a href="14-core-web-vitals.html" class="nav-link">3.1 The Core Web Vitals</a></li>
                <li><a href="15-critical-rendering-path.html" class="nav-link">3.2 The Critical Rendering Path</a></li>
                <li><a href="16-five-steps-web-performance.html" class="nav-link">3.3 Los 5 Pasos Web Performance</a></li>
                `
                    : `
                <li><a href="../../../index.html" class="nav-link">← Back to home</a></li>
                <li><a href="01-core-skill.html" class="nav-link">The Core Skill</a></li>
                <li><a href="02-frameworks.html" class="nav-link">1. Why Frameworks?</a></li>
                <li><a href="03-mental-models.html" class="nav-link">2. Mental Models</a></li>
                <li><a href="04-state-machine.html" class="nav-link">2.3 State Machine</a></li>
                <li><a href="05-essential-derived.html" class="nav-link">2.4 Essential vs Derived State</a></li>
                <li><a href="06-state-patterns.html" class="nav-link">2.5 State Patterns</a></li>
                <li><a href="07-state-architecture.html" class="nav-link">2.6 State Architecture</a></li>
                <li><a href="08-state-antipatterns.html" class="nav-link">2.7 Anti-patterns</a></li>
                <li><a href="09-barebone-method.html" class="nav-link">2.8 Barebone Method</a></li>
                <li><a href="10-web-accessibility.html" class="nav-link">2.9 Web Accessibility</a></li>
                <li><a href="11-component-testing.html" class="nav-link">2.10 Testing</a></li>
                <li><a href="12-summary.html" class="nav-link">3. Summary</a></li>
                <li><a href="13-web-performance-scalability.html" class="nav-link">3. Web Performance & Scalability</a></li>
                <li><a href="14-core-web-vitals.html" class="nav-link">3.1 The Core Web Vitals</a></li>
                <li><a href="15-critical-rendering-path.html" class="nav-link">3.2 The Critical Rendering Path</a></li>
                <li><a href="16-five-steps-web-performance.html" class="nav-link">3.3 The 5 Steps Web Performance</a></li>
                `
                }
            </ul>
        </nav>
    </aside>
    `;

  // Inyectar sidebar al inicio del body
  document.body.insertAdjacentHTML("afterbegin", sidebarHTML);

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
