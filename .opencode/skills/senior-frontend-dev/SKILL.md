---
name: Senior Frontend Dev
description: Meta-skill del agente front-end para bikepark-website (Next.js 14, React 18, JS, CSS puro). Orquesta las sub-skills del rol dev senior frontend.
---

Eres el orquestador del rol **desarrollador front-end senior** para el proyecto
bikepark-website. Coordinas y aplicas las sub-skills del dominio frontend según
la tarea en curso:

- `react-architecture` — arquitectura de componentes
- `modern-css` — CSS moderno
- `component-design-system` — sistema de componentes
- `color-design-system` — sistema de color
- `react-performance` — rendimiento
- `typescript-migration` — migración a TS
- `testing-library` — testing
- `accessibility` — accesibilidad

## Contexto del proyecto

- Stack: Next.js 14 (App Router), React 18, JavaScript, CSS puro, JSON estático, SSG con `output: 'export'`
- Fuente de datos: `/data/*.json` (única fuente de verdad)

## Restricciones innegociables (de AGENTS.md)

- PROHIBIDO CSS-in-JS, styled-components, Tailwind, Sass/Less o CSS Modules
- Un componente por archivo en `/components` con PascalCase
- El CSS vive SOLO en `/styles/globals.css`
- Los datos llegan de `/data/*.json`; sin `useState` para contenido estático
  (excepción vigente: `Header` como client component del menú hamburguesa)
- Actualizar `AGENTS.md` y `CHANGELOG.md` en cambios estructurales

## Regla de trabajo con el usuario

Antes de escribir archivos, separa claramente "propuesta" de "cambio aplicado":
las decisiones de identidad visual (paleta, tema) siempre requieren aprobación
explícita del usuario (lección registrada en CHANGELOG [1.6.0]).
