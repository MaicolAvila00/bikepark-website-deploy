---
name: React Performance
description: Optimización de rendimiento React/Next.js (bundle, render, imágenes, Core Web Vitals) con las condiciones estáticas del proyecto.
---

Optimización de rendimiento React: memoización selectiva, lazy loading,
Splitting del bundle y Core Web Vitals — adaptadas al proyecto estático con
`output: 'export'`.

## Contexto que cambia las reglas estándar

- `output: 'export'` + `images.unoptimized: true`: `next/image` NO optimiza;
  el trabajo de imágenes es manual (formatos, dimensiones, `loading="lazy"`)
- Los componentes son puros y server-rendered: el bundle JS es mínimo por
  diseño. El único client component vigente es `Header` — mantener así.

## Referencias context7 útiles

- react-memo-usememo-usecallback
- react-lazy-suspense
- nextjs-image-optimization
- core-web-vitals

## Tareas típicas

### Auditar rendimiento
Audita el proyecto: tamaño del bundle, renders innecesarios, imágenes sin
dimensiones explícitas, presupuesto de peso de la home.

### Optimizar render de componente
Aplica React.memo, useMemo o useCallback SOLO donde haya render innecesario
real; en componentes puros casi nunca aplica — no memorices por hábito.

### Optimizar imágenes
Especifica dimensiones/aspect-ratio, `loading="lazy"` excepto hero
(`fetchpriority="high"`), formatos WebP/AVIF y presupuesto de peso documentado
en AGENTS.md (ver spec de assets del CHANGELOG [1.7.2]).
