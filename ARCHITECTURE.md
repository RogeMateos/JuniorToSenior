# 🏗️ ARCHITECTURE.md - Guía Arquitectónica del Proyecto

## Visión General

Este proyecto demuestra una **arquitectura limpia y modular** para aplicaciones web frontend, separando claramente las responsabilidades en capas:

```
┌─────────────────────────────────────────────────────┐
│                    HTML (Content)                   │
│              index.html (1858 líneas)               │
│     Estructura semántica y contenido puro           │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
┌──────────────────┐  ┌──────────────────┐
│   CSS Styling    │  │  JS Behavior     │
│ css/styles.css   │  │   js/app.js      │
│   (62 líneas)    │  │   (69 líneas)    │
└──────────────────┘  └──────────────────┘
```

## 1. CAPA DE CONTENIDO (HTML)

**Archivo**: `index.html` (1858 líneas)

### Estructura Base
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso Interactivo de Frontend Moderno</title>
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <!-- Contenido -->
    <script src="js/app.js"></script>
  </body>
</html>
```

### Componentes HTML Principales

#### 1.1 Botón de Toggle Menú (Mobile)
```html
<button class="menu-toggle" id="menu-toggle">☰</button>
```
- ID único para JavaScript
- Clase para estilos
- Visible solo en dispositivos < 992px

#### 1.2 Sidebar de Navegación
```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-content">
    <div class="sidebar-header">Frontend Pro</div>

    <!-- Selector de idioma -->
    <div class="lang-switcher">
      <button id="btn-es" class="lang-btn"
              onclick="setLanguage('es')">Español</button>
      <button id="btn-en" class="lang-btn"
              onclick="setLanguage('en')">English</button>
    </div>

    <!-- Barra de progreso -->
    <div class="progress-container">
      <div id="progress-bar"></div>
    </div>
  </div>

  <!-- Links de navegación -->
  <nav>
    <ul id="nav-list">
      <li><a href="#section-id" class="nav-link"
             data-lang-es="Texto ES"
             data-lang-en="Texto EN">...</a></li>
    </ul>
  </nav>
</aside>
```

**Características:**
- Fixed position en desktop
- Colapsable en mobile
- ID para JavaScript
- Atributos data-lang para multiidioma

#### 1.3 Contenido Principal
```html
<main class="main-content">
  <section id="section-id" class="content-section">
    <!-- Contenido de sección -->
  </section>
</main>
```

#### 1.4 Bloques Temáticos
El HTML usa componentes visuales reutilizables con CSS personalizado:

```html
<!-- Bloque de Problema (rojo) -->
<div class="problem-block" data-title="El Problema 🔴">
  <p>Descripción del problema...</p>
</div>

<!-- Bloque de Solución (verde) -->
<div class="solution-block" data-title="La Solución 🟢">
  <p>Descripción de la solución...</p>
</div>

<!-- Bloque de Concepto (azul) -->
<div class="concept-block">
  <h4>Título del concepto</h4>
  <p>Explicación...</p>
</div>

<!-- Bloque de Entrevista (púrpura, expandible) -->
<div class="interview-block" onclick="toggleInterview(this)">
  <div class="interview-title">
    <span data-lang-es="Pregunta" data-lang-en="Question">
      Pregunta
    </span>
    <span class="toggle-arrow">▶</span>
  </div>
  <div class="interview-content">
    <p>Respuesta...</p>
  </div>
</div>
```

### Patrón Multiidioma

```html
<element data-lang-es="Texto en español"
         data-lang-en="Text in English">
  Texto inicial en español
</element>
```

**Ventajas:**
- Un solo HTML para múltiples idiomas
- Datos separados de la estructura
- Fácil de actualizar traducciones

---

## 2. CAPA DE ESTILOS (CSS)

**Archivo**: `css/styles.css` (62 líneas)

### Organización del CSS

```css
/* 1. Variables CSS (Sistema de Diseño) */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  /* ... más variables */
  --sidebar-width: 280px;
}

/* 2. Reset y estilos globales */
body { /* ... */ }
.container { /* ... */ }

/* 3. Componentes principales */
.sidebar { /* ... */ }
.main-content { /* ... */ }
.sidebar-header { /* ... */ }

/* 4. Componentes específicos */
.lang-switcher { /* ... */ }
.progress-container { /* ... */ }
.nav-buttons { /* ... */ }

/* 5. Bloques temáticos */
.problem-block { /* ... */ }
.solution-block { /* ... */ }
/* ... */

/* 6. Media queries (Responsividad) */
@media (max-width: 992px) {
  /* Estilos para tablets/móviles */
}
```

### Sistema de Variables

```css
:root {
  /* Colores */
  --color-primary: #007bff;       /* Botones, enlaces principales */
  --color-secondary: #6c757d;     /* Texto secundario */
  --color-success: #28a745;       /* Estados positivos */
  --color-danger: #dc3545;        /* Errores, problemas */
  --color-warning: #ffc107;       /* Advertencias */
  --color-info: #17a2b8;          /* Información */
  --color-dark: #343a40;          /* Texto principal */
  --color-light: #f8f9fa;         /* Fondos claros */
  --color-white: #ffffff;         /* Blanco puro */

  /* Tipografía */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", ...;

  /* Espaciado */
  --sidebar-width: 280px;
  --border-radius: 8px;

  /* Efectos */
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

**Ventajas:**
- Cambios globales con una variable
- Consistencia en toda la app
- Fácil mantenimiento de diseño

### Patrones CSS Clave

#### 1. Layout Flexbox
```css
.sidebar {
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  flex-shrink: 0;  /* No se encoge */
}

.sidebar nav {
  flex-grow: 1;    /* Toma espacio disponible */
  overflow-y: auto; /* Scroll si es necesario */
}
```

#### 2. Pseudo-elementos para Títulos
```css
.problem-block::before {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: var(--color-danger);
  content: attr(data-title);  /* Lee del atributo HTML */
}
```

#### 3. Estados con Clases
```css
.lang-btn {
  background-color: transparent;
  transition: background-color 0.2s;
}

.lang-btn.active {
  background-color: var(--color-primary);
  color: var(--color-white);
}
```

#### 4. Animaciones
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-section {
  animation: fadeIn 0.5s ease-in-out;
}
```

#### 5. Responsividad
```css
@media (max-width: 992px) {
  .sidebar {
    /* Ocultar y mostrar con transform */
    transform: translateX(calc(-1 * var(--sidebar-width)));
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    padding-top: 80px;
  }

  .menu-toggle {
    display: block;
  }
}
```

---

## 3. CAPA DE COMPORTAMIENTO (JavaScript)

**Archivo**: `js/app.js` (69 líneas)

### Módulos Funcionales

#### 3.1 Módulo de Idiomas
```javascript
function setLanguage(lang) {
  // Actualizar todos los elementos con data-lang-*
  document.querySelectorAll('[data-lang-es]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      el.innerHTML = el.getAttribute(`data-lang-${lang}`);
    }
  });

  // Actualizar botones activos
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  // Persistir en localStorage
  localStorage.setItem('preferredLanguage', lang);
}
```

**Responsabilidades:**
- Cambiar contenido HTML basado en idioma
- Actualizar estado visual de botones
- Guardar preferencia del usuario

#### 3.2 Módulo de Navegación
```javascript
function navigateToSection(sectionId) {
  // Mostrar sección seleccionada
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  // Actualizar navegación visual
  navLinks.forEach(link => link.classList.remove('active'));
  document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');

  // Actualizar progreso
  updateProgressBar();

  // Scroll al inicio
  window.scrollTo(0, 0);

  // Cerrar menú móvil
  sidebar.classList.remove('open');
}

function updateProgressBar() {
  const activeSectionIndex = Array.from(sections).findIndex(
    section => section.classList.contains('active')
  );

  const progress = ((activeSectionIndex + 1) / totalSections) * 100;
  progressBar.style.width = progress + '%';
}
```

**Responsabilidades:**
- Mostrar/ocultar secciones
- Actualizar estado de navegación
- Actualizar barra de progreso
- Scroll a inicio de página
- Cerrar menú móvil

#### 3.3 Módulo de UI
```javascript
function toggleInterview(element) {
  element.classList.toggle('open');
}
```

**Responsabilidades:**
- Expandir/contraer bloques de entrevista
- Actualizar estilos de rotación de flechas

#### 3.4 Inicialización
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Restaurar idioma guardado
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
  setLanguage(savedLanguage);

  // Event listeners para navegación
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToSection(link.getAttribute('href').substring(1));
    });
  });

  // Toggle menú móvil
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Inicializar barra de progreso
  updateProgressBar();
});
```

### Flujo de Datos

```
Usuario hace click en link de navegación
        ↓
Event listener dispara (DOMContentLoaded)
        ↓
Función navigateToSection(sectionId)
        ↓
Elimina clase 'active' de todas las secciones
Agrega clase 'active' a la sección destino
Actualiza CSS vía clases (no manipulación directa del DOM)
        ↓
CSS muestra/oculta con display: none/block y animación
        ↓
Usuario ve transición suave a nueva sección
```

### Variables Globales

```javascript
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const progressBar = document.getElementById('progress-bar');
const totalSections = sections.length;
```

**Ventajas:**
- Cache de querySelectorAll (mejor performance)
- Acceso rápido a elementos críticos
- Evita búsquedas repetidas en el DOM

---

## 4. FLUJO DE DATOS COMPLETO

```
┌─────────────────────────────────────────────────────────┐
│           USUARIO INTERACTÚA (Click, Scroll)            │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ↓
        ┌─────────────────────────────┐
        │   Event Listener (app.js)   │
        │   (DOMContentLoaded, click) │
        └─────────────┬───────────────┘
                      │
                      ↓
    ┌───────────────────────────────────┐
    │  Función de Manejo de Evento      │
    │ (navigateToSection, setLanguage) │
    └──────────────┬────────────────────┘
                   │
        ┌──────────┴─────────────┐
        ↓                        ↓
  ┌───────────────┐      ┌──────────────────┐
  │  Actualizar   │      │  Guardar datos   │
  │  Clases HTML  │      │  en localStorage │
  │  (app.js)     │      │  (persistencia)  │
  └───────┬───────┘      └──────────────────┘
          │
          ↓
  ┌──────────────────────────┐
  │  CSS aplica estilos      │
  │  basado en clases        │
  │  (styles.css)            │
  └───────┬──────────────────┘
          │
          ↓
  ┌──────────────────────────┐
  │  Navegador renderiza     │
  │  UI actualizada          │
  └───────┬──────────────────┘
          │
          ↓
  ┌──────────────────────────┐
  │  USUARIO VE cambios      │
  │  en la pantalla          │
  └──────────────────────────┘
```

---

## 5. PATRONES ARQUITECTÓNICOS

### 5.1 Separación de Responsabilidades (SoC)
- **HTML**: Estructura y contenido
- **CSS**: Presentación visual
- **JavaScript**: Comportamiento e interactividad
- **localStorage**: Persistencia de estado

### 5.2 Progressive Enhancement
1. HTML funciona sin CSS ni JS
2. CSS mejora la presentación
3. JS añade interactividad avanzada

### 5.3 Data Attributes para Configuración
```html
<element data-lang-es="..." data-lang-en="...">
```
- Datos separados de la lógica
- Fácil de traducir
- Sin necesidad de AJAX para idiomas

### 5.4 Event Delegation
```javascript
navLinks.forEach(link => {
  link.addEventListener('click', handler);
});
```
- Manejadores específicos por elemento
- No event delegation general (no necesaria aquí)
- Código claro y mantenible

### 5.5 Caching de Elementos DOM
```javascript
const navLinks = document.querySelectorAll('.nav-link');
// Se cachea en variable en lugar de buscar cada vez
```

---

## 6. DECISIONES DE DISEÑO

### ¿Por qué separar CSS y JS?

| Aspecto | Beneficio |
|---------|-----------|
| **Mantenimiento** | Cambiar estilos sin tocar lógica |
| **Reutilización** | CSS usado por múltiples páginas |
| **Performance** | CSS/JS se cachean en navegador |
| **Claridad** | Cada archivo tiene responsabilidad clara |
| **Testing** | Fácil de testear componentes aislados |

### ¿Por qué atributos data-lang?

- ✅ Un HTML para múltiples idiomas
- ✅ No requiere llamadas AJAX
- ✅ Datos junto a estructura relevante
- ✅ Fácil de actualizar/traducir

### ¿Por qué clases en lugar de IDs?

- ✅ CSS reutilizable
- ✅ Múltiples elementos con mismo estilo
- ✅ Mejor performance que selectores complejos
- ❌ Excepto donde se necesita identificación única (JavaScript)

---

## 7. OPTIMIZACIONES Y MEJORAS FUTURAS

### Corto Plazo
- [ ] Minificar CSS y JS
- [ ] Agregar offline support (Service Worker)
- [ ] Lazy load de secciones grandes

### Mediano Plazo
- [ ] Separar contenido en módulos HTML
- [ ] Sistema de búsqueda dentro del contenido
- [ ] Bookmarks/favoritos de secciones
- [ ] Modo oscuro

### Largo Plazo
- [ ] Convertir a SPA (Single Page Application)
- [ ] Agregar sistema de comentarios
- [ ] Integrar con plataforma de aprendizaje
- [ ] Generar certificados

---

## 8. CONCLUSIÓN

Esta arquitectura demuestra:
- **Simplicidad**: No framework necesario para contenido educativo
- **Modularidad**: Fácil de agregar/remover funcionalidades
- **Escalabilidad**: Patrón que funciona para sitios más grandes
- **Mantenibilidad**: Código claro y bien organizado
- **Accesibilidad**: HTML semántico, navegación clara

Es perfecta para:
- Sitios educativos
- Documentación interactiva
- Portafolios
- Blogs con secciones dinámicas
