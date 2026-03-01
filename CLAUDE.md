# Balance - Instrucciones para Claude

## Arquitectura de Agent Teams: PLAN → CREATE → TEST → DEPLOY

El workflow se implementa mediante un equipo de agentes especializados con sub-agentes
dinámicos. Cada agente principal evalúa la complejidad del task y decide cuántos
sub-agentes especializados lanzar en paralelo para maximizar calidad y velocidad.

### Cómo Funciona el Equipo

```
Issue / Solicitud
      │
      ▼
┌──────────────────────────────────┐
│          Agente PLANNER          │
│  Evalúa complejidad → lanza      │
│  sub-agentes en paralelo:        │
│  • Exploración de Código         │
│  • Investigación Web             │
│  • Análisis de Impacto           │
│  • Diseño UI/UX                  │
└──────────────┬───────────────────┘
               │ plan.md
               ▼
┌──────────────────────────────────┐
│          Agente CREATOR          │
│  Evalúa plan → lanza             │
│  sub-agentes por área técnica:   │
│  • Sub-Agente HTML               │
│  • Sub-Agente JavaScript         │
│  • Sub-Agente CSS/Tailwind       │
│  • Sub-Agente Refactoring        │
└──────────────┬───────────────────┘
               │ reporte.md
               ▼
┌──────────────────────────────────┐
│          Agente TESTER           │
│  Lanza validaciones en paralelo: │
│  • Validador HTML                │
│  • Validador JavaScript          │
│  • Validador CSS/Tailwind        │
│  • Validador Funcional           │
│  • Validador Accesibilidad       │
└──────────────┬───────────────────┘
               │ resultado.md
               ▼
┌──────────────────────────────────┐
│         Agente DEPLOYER          │
│  Según complejidad lanza:        │
│  • Sub-Agente Documentador       │
│  • Sub-Agente Reviewer Final     │
└──────────────────────────────────┘
```

### Escala de Complejidad (usada por todos los agentes)

| Nivel | Criterio | Sub-agentes |
|-------|----------|-------------|
| **SIMPLE** | 1-2 archivos, cambio menor | 0 — el agente actúa directamente |
| **MODERADO** | 3-5 archivos o múltiples funciones | 2-3 sub-agentes en paralelo |
| **COMPLEJO** | +5 archivos o integración entre sistemas | 4+ sub-agentes en paralelo |

### Agente PLANNER — Fase de Análisis
**Responsabilidad**: Evaluar complejidad, lanzar sub-agentes de investigación y producir un plan detallado.
**Herramientas permitidas**: `Glob`, `Grep`, `Read`, `WebSearch`, `WebFetch`, `Agent(Explore)`, `Agent(general-purpose)`
**Sub-agentes disponibles**: Exploración de Código, Investigación Web, Análisis de Impacto, Diseño UI/UX
**Entradas**: Issue o solicitud del usuario
**Salida requerida**: Plan estructurado con nivel de complejidad, sub-agentes consultados, pasos y criterios de éxito
**Instrucciones específicas**: Ver `.claude/agents/planner.md`

### Agente CREATOR — Fase de Implementación
**Responsabilidad**: Lanzar sub-agentes por área técnica e integrar la implementación final.
**Herramientas permitidas**: `Read`, `Edit`, `Write`, `Bash`, `Glob`, `Grep`, `Agent(general-purpose)`
**Sub-agentes disponibles**: HTML, JavaScript, CSS/Tailwind, Refactoring
**Entradas**: Plan producido por el PLANNER
**Salida requerida**: Código implementado, limpio y listo para pruebas
**Instrucciones específicas**: Ver `.claude/agents/creator.md`

### Agente TESTER — Fase de Validación
**Responsabilidad**: Lanzar sub-agentes de validación en paralelo y agregar los resultados.
**Herramientas permitidas**: `Bash`, `Read`, `Grep`, `Glob`, `Agent(general-purpose)`
**Sub-agentes disponibles**: Validador HTML, JavaScript, CSS/Tailwind, Funcional, Accesibilidad
**Entradas**: Código implementado por el CREATOR
**Salida requerida**: Reporte consolidado con estado (PASS/FAIL) por dimensión de calidad
**Instrucciones específicas**: Ver `.claude/agents/tester.md`

### Agente DEPLOYER — Fase de Despliegue
**Responsabilidad**: Lanzar sub-agentes de documentación/revisión y crear el Pull Request.
**Herramientas permitidas**: `Bash` (git commands), `Read`, `Agent(general-purpose)`
**Sub-agentes disponibles**: Documentador, Reviewer Final
**Entradas**: Reporte del TESTER
**Salida requerida**: Pull Request creado con descripción generada por sub-agente y referencia al issue
**Instrucciones específicas**: Ver `.claude/agents/deployer.md`

---

## Reglas de Orquestación

1. **Secuencia estricta**: PLANNER → CREATOR → TESTER → DEPLOYER. No saltear fases.
2. **Handoff explícito**: Cada agente documenta su salida antes de pasar al siguiente.
3. **Fallo temprano**: Si TESTER reporta fallos críticos, vuelve a CREATOR con el contexto del error.
4. **Un agente principal a la vez**: Nunca ejecutar dos fases en paralelo sobre el mismo feature.
5. **Sub-agentes en paralelo**: Dentro de cada fase, los sub-agentes se lanzan simultáneamente cuando no tienen dependencias entre sí.
6. **Escalado dinámico**: Cada agente decide cuántos sub-agentes lanzar según la complejidad evaluada — no hay un número fijo.

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
