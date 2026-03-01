# Balance - Instrucciones para Claude

## Arquitectura de Agent Teams: PLAN → CREATE → TEST → DEPLOY

El workflow se implementa mediante un equipo de agentes especializados. Cada fase es
orquestada por un agente distinto con herramientas y responsabilidades específicas,
lo que permite mayor velocidad, calidad y paralelización del trabajo.

### Cómo Funciona el Equipo

```
Issue / Solicitud
      │
      ▼
┌─────────────┐     plan.md      ┌──────────────┐
│   Agente    │ ──────────────► │    Agente    │
│   PLANNER   │                  │   CREATOR    │
│ (Analiza y  │                  │ (Implementa  │
│  planifica) │                  │   el código) │
└─────────────┘                  └──────────────┘
                                        │
                          reporte.md    │
                    ┌───────────────────┘
                    ▼
             ┌─────────────┐     resultado.md  ┌──────────────┐
             │   Agente    │ ─────────────────►│    Agente    │
             │   TESTER    │                   │   DEPLOYER   │
             │ (Verifica y │                   │ (Crea PR y   │
             │  valida)    │                   │  documenta)  │
             └─────────────┘                   └──────────────┘
```

### Agente PLANNER — Fase de Análisis
**Responsabilidad**: Analizar el issue y producir un plan de implementación detallado.
**Herramientas permitidas**: `Glob`, `Grep`, `Read`, `WebSearch`, `WebFetch`, `Agent(Explore)`
**Entradas**: Issue o solicitud del usuario
**Salida requerida**: Plan estructurado con pasos, archivos afectados y decisiones de diseño
**Instrucciones específicas**: Ver `.claude/agents/planner.md`

### Agente CREATOR — Fase de Implementación
**Responsabilidad**: Implementar los cambios según el plan del PLANNER.
**Herramientas permitidas**: `Read`, `Edit`, `Write`, `Bash`, `Glob`, `Grep`
**Entradas**: Plan producido por el PLANNER
**Salida requerida**: Código implementado, limpio y listo para pruebas
**Instrucciones específicas**: Ver `.claude/agents/creator.md`

### Agente TESTER — Fase de Validación
**Responsabilidad**: Verificar que la implementación cumple los requisitos y no introduce errores.
**Herramientas permitidas**: `Bash`, `Read`, `Grep`, `Glob`
**Entradas**: Código implementado por el CREATOR
**Salida requerida**: Reporte de pruebas con estado (PASS/FAIL) y observaciones
**Instrucciones específicas**: Ver `.claude/agents/tester.md`

### Agente DEPLOYER — Fase de Despliegue
**Responsabilidad**: Preparar y crear el Pull Request con toda la documentación.
**Herramientas permitidas**: `Bash` (git commands), `Read`
**Entradas**: Reporte del TESTER
**Salida requerida**: Pull Request creado con descripción clara y referencia al issue
**Instrucciones específicas**: Ver `.claude/agents/deployer.md`

---

## Reglas de Orquestación

1. **Secuencia estricta**: PLANNER → CREATOR → TESTER → DEPLOYER. No saltear fases.
2. **Handoff explícito**: Cada agente documenta su salida antes de pasar al siguiente.
3. **Fallo temprano**: Si TESTER reporta fallos críticos, vuelve a CREATOR con el contexto del error.
4. **Un agente a la vez**: Nunca ejecutar dos fases en paralelo sobre el mismo feature.
5. **Paralelización permitida**: El PLANNER puede lanzar sub-agentes Explore en paralelo para investigar diferentes partes del código simultáneamente.

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
