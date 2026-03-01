# CLAUDE.md — Balance App

Instrucciones permanentes para Claude en este repositorio. Claude debe leer y seguir estas instrucciones en cada sesión.

## Descripción del proyecto

**Balance** es una Progressive Web App (PWA) de control de gastos personales. Tecnologías:
- HTML5 semántico
- Tailwind CSS v3 (compilado estáticamente)
- JavaScript vanilla
- Firebase Hosting + Firestore
- Service Worker para modo offline

## Metodología: PLAN → CREATE → TEST → DEPLOY

Claude siempre debe seguir esta estructura en cada tarea:

### 1. PLAN — Analizar antes de actuar
- Lee el issue o la solicitud completa
- Identifica los archivos afectados con `Glob` o `Grep`
- Lee los archivos relevantes antes de proponer cambios
- Explica el plan brevemente antes de ejecutar
- Nunca empieces a codificar sin entender el contexto

### 2. CREATE — Implementar con calidad
- Sigue las convenciones de código existentes
- Usa clases de Tailwind CSS existentes antes de añadir nuevas
- El HTML debe ser semántico y accesible (atributos `aria-*`, `role`, `alt`)
- No agregar librerías externas sin aprobación del usuario
- Evitar JavaScript inline en HTML; preferir event listeners
- Código limpio: sin console.log de depuración, sin código comentado sin usar

### 3. TEST — Verificar antes de pushear
- Verificar que todos los archivos requeridos existen: `index.html`, `style.css`, `manifest.json`, `sw.js`, `firebase.json`
- Si se modifica `input.css` o `tailwind.config.js`, compilar Tailwind:
  ```
  npx tailwindcss -i ./input.css -o ./style.css --minify
  ```
- Validar que el HTML no tiene errores estructurales obvios
- Confirmar que no se rompió funcionalidad existente

### 4. DEPLOY — Entregar correctamente
- Crear un commit descriptivo con mensaje en inglés o español
- Incluir referencia al issue en el commit o PR
- El PR debe tener título claro y descripción completa
- Si los cambios afectan el Service Worker (`sw.js`), mencionar que el usuario puede necesitar actualizar la versión del cache

## Convenciones del proyecto

### Estructura de archivos
```
/
├── index.html          # App principal (todo en un solo archivo HTML)
├── input.css           # Estilos fuente de Tailwind (editar aquí)
├── style.css           # CSS compilado (NO editar directamente)
├── tailwind.config.js  # Configuración de Tailwind
├── manifest.json       # Configuración PWA
├── sw.js               # Service Worker
├── firebase.json       # Configuración Firebase Hosting
└── CLAUDE.md           # Este archivo
```

### CSS y estilos
- Editar **siempre** `input.css`, nunca `style.css` directamente
- Recompilar Tailwind después de cambios en `input.css` o clases en `index.html`
- Paleta de colores principal: Apple-inspired, grises neutros (`#F5F5F7`, `#1D1D1F`)

### Idioma
- El código (variables, funciones, comentarios técnicos) puede estar en inglés
- La UI y mensajes de usuario deben estar en **español**
- Los commits pueden ser en español o inglés

## Comandos útiles

```bash
# Instalar dependencias
npm install

# Compilar CSS para producción
npx tailwindcss -i ./input.css -o ./style.css --minify

# Compilar CSS en modo desarrollo (watch)
npx tailwindcss -i ./input.css -o ./style.css --watch
```

## Limitaciones conocidas

- Claude **no puede modificar** archivos en `.github/workflows/` — deben aplicarse manualmente
- Los cambios al Service Worker (`sw.js`) requieren que el usuario limpie el caché del navegador o actualice la versión del cache en el archivo
