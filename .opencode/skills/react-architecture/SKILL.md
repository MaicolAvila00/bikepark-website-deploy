---
name: React Architecture
description: Patrones de arquitectura de componentes React (Compound Components, Render Props, Slots, Headless UI) y auditoría de estructura de componentes.
---

Patrones de arquitectura de componentes React: Compound Components, Render
Props, Slots, Headless UI y separación presentador/contenedor.

## Referencias context7 útiles

- react-compound-components
- react-render-props
- react-headless-ui
- react-hooks-best-practices

## Tareas típicas

### Auditar estructura de componentes
Audita la estructura actual de componentes en `/components` y propone mejoras
de arquitectura (responsabilidades, acoplamiento, contratos de props).

### Refactorizar a Compound Components
Refactoriza un componente monolítico al patrón Compound Components con una API
de props clara. Respeta la regla del proyecto: un componente por archivo,
funciones puras, datos por props.

### Crear wrapper headless
Crea un wrapper headless (sin estilos) para un componente UI existente,
separando la lógica de la presentación. En este proyecto el CSS vive solo en
`/styles/globals.css`, así que los wrappers reciben las clases por props.
