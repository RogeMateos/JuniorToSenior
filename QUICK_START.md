# 🚀 QUICK START - Guía Rápida del Proyecto

## ¿Dónde está cada cosa?

### 📄 Contenido educativo
**Archivo**: `index.html`
- Todo el contenido del curso
- Todas las secciones (12)
- Todos los ejemplos de código

### 🎨 Estilos visuales
**Carpeta**: `css/styles.css`
- Colores y diseño
- Layout (sidebar, contenido)
- Animaciones
- Responsividad (mobile, tablet, desktop)

### ⚙️ Interactividad y comportamiento
**Carpeta**: `js/app.js`
- Cambio de idioma (ES/EN)
- Navegación entre secciones
- Barra de progreso
- Bloques expandibles

---

## 🔧 ¿Qué cambio si quiero...?

### Cambiar colores
```
→ Abre: css/styles.css
→ Busca: :root { ... }
→ Edita: --color-primary, --color-danger, etc.
```

### Agregar una sección nueva
```
→ Abre: index.html
→ Busca: <section id="section-summary">
→ Copia esa sección y modifícala
→ Agrega link en el sidebar <nav>
```

### Cambiar un título
```
→ Abre: index.html
→ Busca el texto del título
→ Edita el contenido de los atributos data-lang-es y data-lang-en
```

### Cambiar fuente o tamaño de texto
```
→ Abre: css/styles.css
→ Busca: h1, h2, h3 { font-size: ... }
→ Edita el tamaño
```

### Cambiar la navegación
```
→ Abre: index.html
→ Busca: <nav> <ul id="nav-list">
→ Agrega/edita elementos <li> <a href="#section-id">
```

---

## 📱 Estructura Visual

```
┌─────────────────────────────────────────────┐
│  [☰] Frontend Pro          [ES] [EN]       │ ← Sidebar
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ▓▓▓▓▓▓ [Progreso]                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                             │
│  La Habilidad Clave         Contenido →    │
│  1. ¿Por qué Frameworks?                   │
│  2. Modelos Mentales                       │
│  2.3 State Machine                         │
│  2.4 Esencial vs Derivado                  │
│  2.5 Patrones de Estado                    │
│  2.6 Arquitectura del Estado                │
│  2.7 Anti-patrones                         │
│  ...                                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 Ejemplo: Agregar una nueva sección

### Paso 1: Agregar enlace en navegación
```html
<!-- En index.html, dentro de <nav> <ul> -->
<li>
  <a href="#section-nueva" class="nav-link"
     data-lang-es="Mi Nueva Sección"
     data-lang-en="My New Section">
    Mi Nueva Sección
  </a>
</li>
```

### Paso 2: Crear la sección de contenido
```html
<!-- En index.html, dentro de <main class="main-content"> -->
<section id="section-nueva" class="content-section">
    <h1 data-lang-es="Mi Nueva Sección"
        data-lang-en="My New Section">
        Mi Nueva Sección
    </h1>

    <p data-lang-es="Contenido en español..."
       data-lang-en="Content in English...">
        Contenido en español...
    </p>

    <!-- Botones de navegación -->
    <div class="nav-buttons">
        <button class="btn btn-primary"
                onclick="navigateToSection('section-anterior')">
            ← Anterior
        </button>
        <button class="btn btn-primary"
                onclick="navigateToSection('section-siguiente')">
            Siguiente →
        </button>
    </div>
</section>
```

### Paso 3: ¡Listo!
La nueva sección:
- ✅ Aparecerá en el menú
- ✅ Será navegable
- ✅ Soportará ES/EN automáticamente
- ✅ Tendrá la barra de progreso
- ✅ Será responsive

---

## 🌐 Multiidioma (ES/EN)

### Cómo funciona
```html
<elemento data-lang-es="Texto español"
          data-lang-en="Text in English">
  Contenido inicial
</elemento>
```

### Cambiar idioma
```javascript
// En el navegador, ejecuta:
setLanguage('es')  // Español
setLanguage('en')  // Inglés
```

### Se guarda automáticamente
- Cuando cambias idioma, se guarda en localStorage
- La próxima vez que abras la página, usa tu idioma preferido

---

## 📊 Bloques Temáticos

### Problema (Rojo)
```html
<div class="problem-block" data-title="El Problema 🔴">
  <p>Descripción del problema...</p>
</div>
```

### Solución (Verde)
```html
<div class="solution-block" data-title="La Solución 🟢">
  <p>Descripción de la solución...</p>
</div>
```

### Concepto (Azul)
```html
<div class="concept-block">
  <h4>Título del concepto</h4>
  <p>Explicación...</p>
</div>
```

### Entrevista (Púrpura, expandible)
```html
<div class="interview-block" onclick="toggleInterview(this)">
  <div class="interview-title">
    <span>Pregunta de Entrevista</span>
    <span class="toggle-arrow">▶</span>
  </div>
  <div class="interview-content">
    <p>Respuesta...</p>
  </div>
</div>
```

### Analogía (Azul claro)
```html
<div class="analogy-block" data-title="💡 Analogía">
  <p>Explicación usando una analogía...</p>
</div>
```

### Advertencia (Amarillo)
```html
<div class="warning-block" data-title="⚠️ Advertencia">
  <p>Nota importante...</p>
</div>
```

---

## 🎨 Cambiar Colores

### En `css/styles.css` (línea ~8):

```css
:root {
    --color-primary: #007bff;      /* Azul - Botones principales */
    --color-secondary: #6c757d;    /* Gris - Texto secundario */
    --color-success: #28a745;      /* Verde - Soluciones */
    --color-danger: #dc3545;       /* Rojo - Problemas */
    --color-warning: #ffc107;      /* Amarillo - Advertencias */
    --color-info: #17a2b8;         /* Cian - Conceptos */
    --color-dark: #343a40;         /* Gris oscuro - Texto */
    --color-light: #f8f9fa;        /* Gris claro - Fondos */
    --color-white: #ffffff;        /* Blanco puro */
}
```

Ejemplo: Para cambiar el color azul principal a rojo:
```css
--color-primary: #dc3545;  /* Rojo en lugar de azul */
```

---

## 📝 Código de Ejemplo

En `css/styles.css` (línea ~370+):

```css
.code-block {
    background-color: #2b2b2b;        /* Fondo oscuro */
    color: #f8f8f2;                   /* Texto claro */
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
    overflow-x: auto;                 /* Scroll horizontal si es muy largo */
    font-family: "Fira Code", monospace;
    font-size: 0.95em;
}

.code-block .token.keyword { color: #569cd6; }   /* Azul */
.code-block .token.string  { color: #ce9178; }   /* Naranja */
.code-block .token.comment { color: #6a9955; }   /* Verde */
```

---

## 💻 Funciones JavaScript Principales

### 1. Cambiar idioma
```javascript
setLanguage('es')  // Cambiar a español
setLanguage('en')  // Cambiar a inglés
```

### 2. Navegar a sección
```javascript
navigateToSection('section-core-skill')
navigateToSection('section-state-machine')
// ... etc
```

### 3. Actualizar barra de progreso
```javascript
updateProgressBar()
```

### 4. Expandir/contraer bloque
```javascript
toggleInterview(element)
```

---

## 📱 Responsividad

El proyecto es responsive por defecto:

| Tamaño | Comportamiento |
|--------|-----------------|
| **Desktop** (>992px) | Sidebar fijo a la izquierda |
| **Tablet** (768px-992px) | Sidebar colapsable |
| **Móvil** (<768px) | Sidebar oculto, menú hamburguesa (☰) visible |

Para ajustar el breakpoint, edita en `css/styles.css`:
```css
@media (max-width: 992px) {
    /* Estilos para tablets/móviles */
}
```

---

## 🐛 Debugging

### En la consola del navegador (F12)

**Ver el idioma guardado:**
```javascript
localStorage.getItem('preferredLanguage')
```

**Cambiar idioma:**
```javascript
setLanguage('en')
```

**Ver qué sección está activa:**
```javascript
document.querySelector('.content-section.active').id
```

**Ver todas las secciones:**
```javascript
document.querySelectorAll('.content-section')
```

---

## 📚 Archivos de Documentación

1. **README.md** - Para entender qué es el proyecto
2. **ARCHITECTURE.md** - Para entender cómo está construido
3. **REFACTORING_SUMMARY.md** - Para entender los cambios realizados
4. **QUICK_START.md** - Este archivo, para empezar rápido

---

## ✨ Conclusión

Este proyecto demuestra una arquitectura **modular y profesional**:

- **HTML**: Solo estructura y contenido
- **CSS**: Solo estilos y layout
- **JavaScript**: Solo interactividad

Esto es lo que aprenderás en el curso: **buena arquitectura = código mantenible y escalable**.

¡Ahora estás listo para explorar, modificar y expandir el proyecto! 🚀
