---
name: Modern CSS
description: CSS moderno (Cascade Layers, Container Queries, :has(), OKLCH, @property, Subgrid) aplicado a /styles/globals.css del proyecto.
---

CSS moderno: Cascade Layers, Container Queries, `:has()`, OKLCH, `@property`,
Subgrid y media queries modernas. Todo en el único archivo
`/styles/globals.css` del proyecto (regla de AGENTS.md) — ningún camino lleva a
CSS Modules ni preprocesadores.

## Referencias context7 útiles

- css-cascade-layers
- css-container-queries
- css-has-selector
- css-oklch-color
- css-property-api
- css-subgrid

## Tareas típicas

### Auditar CSS legacy
Audita `/styles/globals.css` y identifica patrones legacy que puedan
modernizarse sin cambiar el rendering aprobado.

### Crear sistema de tokens
Genera un sistema de design tokens (colores, espaciado, tipografía) como
variables CSS en `:root`. En este proyecto los tokens YA EXISTEN: propón
extensiones, no renombres — los componentes consumen los nombres actuales.

### Refactorizar a CSS moderno
Refactoriza un bloque de CSS a CSS moderno usando Cascade Layers, Container
Queries y `:has()`. Valida soporte de navegador antes de proponer.

### Breakpoints responsivos
Define y aplica breakpoints (768px, 1024px) con media queries y, si aporta,
container queries por componente.
