# Balance - Instrucciones para Claude

## Metodología de Trabajo: PLAN → CREATE → TEST → DEPLOY

Siempre sigue esta estructura al trabajar en cualquier tarea en este repositorio:

### 1. PLAN
- Analiza el issue o solicitud en detalle
- Lee los archivos relevantes antes de proponer cambios
- Crea un plan claro con los pasos a seguir
- Reporta el plan en el comentario del issue/PR antes de empezar a codificar

### 2. CREATE
- Implementa los cambios según el plan definido
- Sigue las convenciones del proyecto (HTML semántico, Tailwind CSS, JavaScript vanilla)
- Escribe código limpio, legible y sin duplicación
- Añade comentarios solo donde la lógica no sea evidente
- No introducir dependencias nuevas sin justificación

### 3. TEST
- Verifica que los cambios funcionan correctamente
- Comprueba que el CSS de Tailwind compila sin errores: `npx tailwindcss -i ./input.css -o ./style.css`
- Revisa que el HTML es válido y accesible
- Prueba la funcionalidad en el contexto del proyecto

### 4. DEPLOY
- Crea un Pull Request con los cambios
- El PR debe incluir:
  - Descripción clara de qué cambia y por qué
  - Referencia al issue original
  - Lista de archivos modificados
- Documenta cualquier decisión de diseño importante

---

## Stack Tecnológico

- **Frontend**: HTML5, CSS (Tailwind CSS v3), JavaScript vanilla
- **Backend/DB**: Firebase (Firestore, Authentication, Hosting)
- **Build**: Tailwind CSS CLI
- **Deploy**: Firebase Hosting

## Convenciones

- Usar clases de Tailwind en lugar de CSS custom cuando sea posible
- Seguir estructura semántica de HTML (header, main, section, article, footer)
- Nombres de variables y funciones en camelCase
- Comentarios en español

## Comandos Útiles

```bash
# Compilar CSS de Tailwind
npx tailwindcss -i ./input.css -o ./style.css

# Compilar en modo watch (desarrollo)
npx tailwindcss -i ./input.css -o ./style.css --watch

# Instalar dependencias
npm install
```
