/**
 * FRONTEND MASTERY - Main Application
 * Shared functionality for multi-page navigation and course UI
 */

// ============================================================
// GLOBAL VARIABLES
// ============================================================

// Central mapping of sections -> HTML file
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
// MODULE: LANGUAGE HANDLING
// ============================================================

/**
 * Changes the application language
 * @param {string} lang - Language code ('es' or 'en')
 */
function setLanguage(lang) {
  // Save language preference
  localStorage.setItem("preferredLanguage", lang);

  // Get current URL
  const currentUrl = window.location.pathname;

  // Navigate to the correct language version
  if (lang === "es") {
    if (currentUrl.includes("/en/")) {
      window.location.href = currentUrl.replace("/en/", "/es/");
    } else if (currentUrl.includes("/es/")) {
      // Already in Spanish
      return;
    } else {
      // At root or another location
      window.location.href =
        "./frontend-mastery/es/sections/01-core-skill.html";
    }
  } else if (lang === "en") {
    if (currentUrl.includes("/es/")) {
      window.location.href = currentUrl.replace("/es/", "/en/");
    } else if (currentUrl.includes("/en/")) {
      // Already in English
      return;
    } else {
      // At root or another location
      window.location.href =
        "./frontend-mastery/en/sections/01-core-skill.html";
    }
  }
}

// ============================================================
// MODULE: NAVIGATION
// ============================================================

/**
 * Navigates to a specific section (for monolithic pages)
 * @param {string} sectionId - ID of the section to navigate to
 */
function navigateToSection(sectionId) {
  const route = SECTION_ROUTES[sectionId];
  const currentPath = window.location.pathname;

  // Current architecture: multi-page navigation via HTML files
  if (route && (currentPath.includes("/es/") || currentPath.includes("/en/"))) {
    const targetPath = currentPath.includes("/sections/")
      ? route
      : `sections/${route}`;
    window.location.href = targetPath;
    return;
  }

  // Fallback: navigate via anchor on current page
  const section = document.getElementById(sectionId);
  if (section) {
    smoothScroll(sectionId);
  }
}

// ============================================================
// MODULE: USER INTERFACE
// ============================================================

/**
 * Toggles opening/closing of interview blocks
 * @param {HTMLElement} element - Interview block element
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
 * Smooth scroll to an element
 * @param {string} targetId - Element ID
 */
function smoothScroll(targetId) {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Copy code to clipboard
 * @param {HTMLElement} codeBlock - Code block
 */
function copyCode(codeBlock, buttonElement) {
  const code = codeBlock.querySelector("code")?.textContent;
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      const btn = buttonElement || codeBlock.querySelector(".btn-copy");
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = "✓ Copied";
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  }
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Restore saved language (if exists in DOM)
  const savedLanguage = localStorage.getItem("preferredLanguage") || "es";
  if (document.querySelector("[data-lang-es]")) {
    setLanguage(savedLanguage);
  }

  // Toggle mobile menu
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

  // Initialize interview blocks
  const interviewBlocks = document.querySelectorAll(".interview-block");
  interviewBlocks.forEach((block) => {
    block.addEventListener("click", function () {
      toggleInterview(this);
    });
  });

  // Add copy buttons to code blocks
  document.querySelectorAll(".code-block").forEach((block) => {
    const copyBtn = document.createElement("button");
    copyBtn.className = "btn btn-copy";
    copyBtn.textContent = "Copy";
    copyBtn.onclick = (e) => copyCode(block, e.currentTarget);
    block.insertBefore(copyBtn, block.firstChild);
  });

  // Smooth scroll for internal links
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
// EXPORT FUNCTIONS (for modules)
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
// SIDEBAR AND NAVIGATION INJECTION IN SECTIONS
// ============================================================

/**
 * Injects sidebar and navigation into section pages
 */
function injectSidebarAndNav() {
  // Only inject if there's no content in the sidebar yet
  const sidebarElement = document.getElementById("sidebar");
  if (sidebarElement && sidebarElement.children.length > 0) {
    return; // Already has injected content
  }

  const currentUrl = window.location.pathname;
  const isSpanish = currentUrl.includes("/es/");
  const isSection = currentUrl.includes("/sections/");
  const isSoftwareCycle = currentUrl.includes("/softwarecycle/");
  const isSoftwareArchitecture = currentUrl.includes("/softwarearchitecture/");
  const isFullStack = currentUrl.includes("/fullstack/");
  const isFrontendMastery = currentUrl.includes("/frontend-mastery/");

  if (!isSection && !isSoftwareCycle && !isSoftwareArchitecture && !isFullStack && !isFrontendMastery) {
    return; // Not in a section
  }

  // Create burger button for mobile if it doesn't exist
  if (!document.getElementById("menu-toggle")) {
    const menuToggleBtn = document.createElement("button");
    menuToggleBtn.id = "menu-toggle";
    menuToggleBtn.className = "menu-toggle";
    menuToggleBtn.setAttribute("aria-label", "Toggle navigation menu");
    menuToggleBtn.textContent = "☰";
    document.body.insertAdjacentElement("afterbegin", menuToggleBtn);
  }

  // Create the sidebar with accordion
  const sidebarHTML = `
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">Frontend Mastery</div>
        <nav>
            <ul>
                <li><a href="../../../index.html" class="nav-link">← ${isSpanish ? 'Volver al inicio' : 'Back to home'}</a></li>

                <!-- SECTION 1: THE CORE SKILL -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section1">
                        <span>${isSpanish ? 'La Habilidad Clave' : 'The Core Skill'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section1-content">
                        <li><a href="01-core-skill.html" class="nav-link">${isSpanish ? 'La Habilidad Clave' : 'The Core Skill'}</a></li>
                    </ul>
                </li>

                <!-- SECTION 2: WHY FRAMEWORKS? -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section2">
                        <span>${isSpanish ? '1. ¿Por qué Frameworks?' : '1. Why Frameworks?'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section2-content">
                        <li><a href="02-frameworks.html" class="nav-link">${isSpanish ? '¿Por qué Frameworks?' : 'Why Frameworks?'}</a></li>
                    </ul>
                </li>

                <!-- SECTION 3: MENTAL MODELS & STATE MANAGEMENT -->
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

                <!-- SECTION 4: SUMMARY -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section4">
                        <span>${isSpanish ? '3. Resumen' : '3. Summary'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section4-content">
                        <li><a href="12-summary.html" class="nav-link">${isSpanish ? 'Resumen' : 'Summary'}</a></li>
                    </ul>
                </li>

                <!-- SECTION 5: WEB PERFORMANCE -->
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

                <!-- SECTION 6: FULLSTACK -->
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

                <!-- SECTION 7: SOFTWARE LIFECYCLE -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section7">
                        <span>${isSpanish ? '⚙️ 7.0 Software Lifecycle' : '⚙️ 7.0 Software Lifecycle'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section7-content">
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/senior-mindset.html' : '../../../../softwarecycle/en/senior-mindset.html'}" class="nav-link">${isSpanish ? '🚀 Senior Mindset: DevOps' : '🚀 Senior Mindset: DevOps'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/roadmap.html' : '../../../../softwarecycle/en/roadmap.html'}" class="nav-link">${isSpanish ? '👨🏽‍💻 Software Lifecycle Roadmap' : '👨🏽‍💻 Software Lifecycle Roadmap'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/operation-excellence.html' : '../../../../softwarecycle/en/operation-excellence.html'}" class="nav-link">${isSpanish ? '🧬 Operational Excellence Principles' : '🧬 Operational Excellence Principles'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/cicd-fundamentals.html' : '../../../../softwarecycle/en/cicd-fundamentals.html'}" class="nav-link">${isSpanish ? '💾 CI/CD Fundamentals' : '💾 CI/CD Fundamentals'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/universal-blueprint.html' : '../../../../softwarecycle/en/universal-blueprint.html'}" class="nav-link">${isSpanish ? '📝 The Universal Blueprint for CI/CD' : '📝 The Universal Blueprint for CI/CD'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/version-control-patterns.html' : '../../../../softwarecycle/en/version-control-patterns.html'}" class="nav-link">${isSpanish ? '📝🔄 Version Control Patterns' : '📝🔄 Version Control Patterns'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/build-pipeline.html' : '../../../../softwarecycle/en/build-pipeline.html'}" class="nav-link">${isSpanish ? '💿 The Build Pipeline' : '💿 The Build Pipeline'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/deployment-pipeline.html' : '../../../../softwarecycle/en/deployment-pipeline.html'}" class="nav-link">${isSpanish ? '🚀 The Deployment Pipeline' : '🚀 The Deployment Pipeline'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/linux-servers.html' : '../../../../softwarecycle/en/linux-servers.html'}" class="nav-link">${isSpanish ? '⌨️ Introduction to Linux Servers' : '⌨️ Introduction to Linux Servers'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/cloud-providers.html' : '../../../../softwarecycle/en/cloud-providers.html'}" class="nav-link">${isSpanish ? '⌨️☁️ Cloud Providers: AWS, Azure & GCP' : '⌨️☁️ Cloud Providers: AWS, Azure & GCP'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/network-security.html' : '../../../../softwarecycle/en/network-security.html'}" class="nav-link">${isSpanish ? '⌨️☁️ 1.7 Fundamentos de Seguridad de Red en AWS' : '⌨️☁️ 1.7 Network Security Fundamentals in AWS'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/docker-containers.html' : '../../../../softwarecycle/en/docker-containers.html'}" class="nav-link">${isSpanish ? '🐳 2.0 Introducción a Containers con Docker' : '🐳 2.0 Introduction to Containers with Docker'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/docker-cicd.html' : '../../../../softwarecycle/en/docker-cicd.html'}" class="nav-link">${isSpanish ? '📦 2.1 Containers en CI/CD' : '📦 2.1 Containers in CI/CD'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/serverless-lambda.html' : '../../../../softwarecycle/en/serverless-lambda.html'}" class="nav-link">${isSpanish ? '⚡️ 3.0 Serverless con AWS Lambda' : '⚡️ 3.0 Serverless with AWS Lambda'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/lambda-cold-start.html' : '../../../../softwarecycle/en/lambda-cold-start.html'}" class="nav-link">${isSpanish ? '❄️ 3.1 Lambda Cold Start' : '❄️ 3.1 Lambda Cold Start'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarecycle/es/terraform-iac.html' : '../../../../softwarecycle/en/terraform-iac.html'}" class="nav-link">${isSpanish ? '🌍 4.0 Infrastructure as Code con Terraform' : '🌍 4.0 Infrastructure as Code with Terraform'}</a></li>
                    </ul>
                </li>

                <!-- SECTION 8: SOFTWARE ARCHITECTURE -->
                <li class="nav-accordion">
                    <div class="nav-accordion-header" data-accordion="section8">
                        <span>${isSpanish ? '🏗️ 8.0 Software Architecture' : '🏗️ 8.0 Software Architecture'}</span>
                        <span class="nav-accordion-icon">▶</span>
                    </div>
                    <ul class="nav-accordion-content" id="section8-content">
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/architect-mindset.html' : '../../../../softwarearchitecture/en/architect-mindset.html'}" class="nav-link">${isSpanish ? '📍 Empieza Aquí: The Architect Mindset' : '📍 Start Here: The Architect Mindset'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/layered-architecture.html' : '../../../../softwarearchitecture/en/layered-architecture.html'}" class="nav-link">${isSpanish ? '🥞 1.1 La Arquitectura en Capas - MVC' : '🥞 1.1 The Layered Architecture - MVC'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/service-oriented.html' : '../../../../softwarearchitecture/en/service-oriented.html'}" class="nav-link">${isSpanish ? '🪆 1.2 Service Oriented Architecture' : '🪆 1.2 Service Oriented Architecture'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/microservices-distributed.html' : '../../../../softwarearchitecture/en/microservices-distributed.html'}" class="nav-link">${isSpanish ? '🎛️ 1.3 Microservices & Distributed Systems' : '🎛️ 1.3 Microservices & Distributed Systems'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/monolith-vs-microservices.html' : '../../../../softwarearchitecture/en/monolith-vs-microservices.html'}" class="nav-link">${isSpanish ? '🤔 1.4 Monolito vs Microservicios' : '🤔 1.4 Monolith vs Microservices'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/microfrontends.html' : '../../../../softwarearchitecture/en/microfrontends.html'}" class="nav-link">${isSpanish ? '🎨 1.5 Microfrontends' : '🎨 1.5 Microfrontends'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/event-driven.html' : '../../../../softwarearchitecture/en/event-driven.html'}" class="nav-link">${isSpanish ? '🔔 1.6 Event Driven Architectures' : '🔔 1.6 Event Driven Architecture'}</a></li>
                        <li><a href="${isSpanish ? '../../../../softwarearchitecture/es/api-gateway.html' : '../../../../softwarearchitecture/en/api-gateway.html'}" class="nav-link">${isSpanish ? '⛩️ 1.7 The API Gateway Pattern' : '⛩️ 1.7 The API Gateway Pattern'}</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
    `;

  // Inject sidebar: use existing if available, otherwise create new
  const existingSidebar = document.getElementById("sidebar");
  if (existingSidebar && existingSidebar.children.length === 0) {
    // If exists but empty, fill with content
    existingSidebar.innerHTML = sidebarHTML.replace(/<aside[^>]*>|<\/aside>/g, '').replace(/<\/aside>/, '');
  } else if (!existingSidebar) {
    // If doesn't exist, create new
    document.body.insertAdjacentHTML("afterbegin", sidebarHTML);
  }

  // Configure event for accordion headers
  setTimeout(() => {
    const accordionHeaders = document.querySelectorAll(".nav-accordion-header");
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const accordionId = this.getAttribute("data-accordion");
        const content = document.getElementById(accordionId + "-content");

        if (content) {
          // Toggle active class on header
          this.classList.toggle("active");

          // Toggle active class on content
          content.classList.toggle("active");
        }
      });
    });
  }, 0);

  // Add event listener to nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Connect burger button with sidebar in injected sections
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
 * Ensures a visible language switcher always exists
 * on any frontend-mastery page (ES/EN)
 */
function ensureGlobalLanguageSwitcher() {
  const currentUrl = window.location.pathname;
  const isLocalizedPage =
    currentUrl.includes("/frontend-mastery/es/") ||
    currentUrl.includes("/frontend-mastery/en/");

  if (!isLocalizedPage) {
    return;
  }

  // If floating switcher already exists, don't duplicate
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

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  injectSidebarAndNav();
  ensureGlobalLanguageSwitcher();
});

// Also run immediately in case script loads after
injectSidebarAndNav();
ensureGlobalLanguageSwitcher();
