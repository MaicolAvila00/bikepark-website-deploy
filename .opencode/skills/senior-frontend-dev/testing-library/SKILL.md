---
name: Testing Library
description: Testing profesional (React Testing Library, MSW, Playwright E2E) siendo un proyecto 100% estático SIN tests actuales en el repo.
---

Testing profesional: React Testing Library, MSW (mock service worker),
Playwright E2E y regresión visual — para un proyecto 100% estático que HOY no
tiene tests en el repo. Introducir dependencias de testing (vitest, jest,
RTL, playwright) rompe la regla de AGENTS.md "sin instalar dependencias sin
documentar": propón primero un plan, espera aprobación, y registra cada
dependencia nueva en CHANGELOG + AGENTS.md.

## Referencias context7 útiles

- react-testing-library
- msw-mock-service-worker
- playwright-react
- visual-regression-testing

## Tareas típicas

### Test unitario de componente
Escribe tests unitarios para un componente con React Testing Library y
@testing-library/jest-dom (ej: EventCard con/nota imagen, InfoSection con id
inexistente → null fail-safe).

### Playwright E2E
Crea tests E2E para rutas críticas: home, sobre, reglas, atracciones,
eventos, detalle de evento. Para el build estático, correr contra `npm run
serve` de la carpeta `out/`.

### MSW para mocks
Configura MSW para mockear peticiones externas en tests de integración
(aunque el proyecto no llama APIs hoy: útil para formularios futuros).
