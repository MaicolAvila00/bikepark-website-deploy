---
name: Accessibility
description: Accesibilidad (WCAG 2.1/2.2, ARIA, focus management, axe-core) para el sitio estático, con foco en el header móvil y los estados de foco.
---

Accesibilidad (a11y): WCAG 2.1/2.2, patrones ARIA, gestión de foco, testing
con axe-core y navegación por teclado.

## Estado a11y actual del proyecto (conocerlo antes de auditar)

- Skip link "Saltar al contenido" + `main id="contenido-principal"` ([1.8.0])
- Nav con `.active` + `aria-current="page"` (WCAG 2.4.8)
- `*:focus-visible` global violeta; foco de botones con `--accent-light`
- `--text-muted` #94a3b8 sobre `--primary` ≈5.7:1 ([1.6.2])
- El menú móvil (client component `Header`) es la pieza con margen de mejora:
  cierre con Escape, devolución de foco al toggle (roadmap P1 [1.7.2])

## Referencias context7 útiles

- wcag-21-contrast-ratio
- aria-live-regions
- aria-roles-patterns
- focus-management-react
- axe-core-testing

## Tareas típicas

### Auditoría a11y
Audita componentes existentes: contraste, ARIA, foco, navegación por teclado,
etiquetas accesibles y orden de headings.

### Patrones ARIA
Aplica patrones ARIA correctos a un patrón (button, dialog, menu, tab, alert):
roles, estado (aria-expanded, aria-current) y referencias (aria-controls).

### Navegación por teclado
Implementa navegación completa (Tab, Enter, Espacio, Escape) en un componente
interactivo — el menú hamburguesa es el objetivo inmediato del proyecto.
