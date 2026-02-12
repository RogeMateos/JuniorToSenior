/**
 * FRONTEND PRO - Aplicación Interactiva de Curso de Frontend
 * Gestiona navegación, idiomas e interactividad
 */

// ============================================================
// VARIABLES GLOBALES
// ============================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const progressBar = document.getElementById('progress-bar');
const totalSections = sections.length;

// ============================================================
// MODULO: MANEJO DE IDIOMAS
// ============================================================

/**
 * Cambia el idioma de la aplicación
 * @param {string} lang - Código de idioma ('es' o 'en')
 */
function setLanguage(lang) {
    // Actualizar todos los elementos con atributos data-lang
    document.querySelectorAll('[data-lang-es]').forEach(el => {
        const text = el.getAttribute(`data-lang-${lang}`);
        if (text) {
            el.textContent = text;
            el.innerHTML = el.getAttribute(`data-lang-${lang}`);
        }
    });

    // Actualizar botones de idioma
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    // Guardar preferencia de idioma
    localStorage.setItem('preferredLanguage', lang);
}

// ============================================================
// MODULO: NAVEGACIÓN
// ============================================================

/**
 * Navega a una sección específica
 * @param {string} sectionId - ID de la sección a navegar
 */
function navigateToSection(sectionId) {
    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Actualizar navegación activa
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Actualizar barra de progreso
    updateProgressBar();

    // Cerrar menú móvil si está abierto
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
}

/**
 * Actualiza la barra de progreso basada en la sección actual
 */
function updateProgressBar() {
    const activeSectionIndex = Array.from(sections).findIndex(section =>
        section.classList.contains('active')
    );

    if (activeSectionIndex !== -1) {
        const progress = ((activeSectionIndex + 1) / totalSections) * 100;
        progressBar.style.width = progress + '%';
    }
}

// ============================================================
// MODULO: INTERFAZ DE USUARIO
// ============================================================

/**
 * Alterna la apertura/cierre de bloques de entrevista
 * @param {HTMLElement} element - Elemento del bloque de entrevista
 */
function toggleInterview(element) {
    element.classList.toggle('open');
}

// ============================================================
// INICIALIZACION Y EVENT LISTENERS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Restaurar idioma guardado
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    setLanguage(savedLanguage);

    // Event listeners para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            navigateToSection(sectionId);
        });
    });

    // Toggle menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Cerrar menú cuando se hace click en el contenido principal
        document.querySelector('.main-content')?.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }

    // Inicializar barra de progreso
    updateProgressBar();
});
