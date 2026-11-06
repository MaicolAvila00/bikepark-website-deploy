---
name: Color Design System
description: Paleta accesible en variables CSS :root, contraste WCAG 2.1 y estados (hover/focus/disabled) para el tema vigente del proyecto.
---

Sistema de colores del proyecto: paleta accesible, variables CSS en `:root`,
contraste WCAG 2.1 y estados (hover/focus/disabled).

## Regla crítica del proyecto

El tema vigente es **"Señalización de pista"** (claro), identidad Capital
Nublada reinterpretada: papel `#EDF0EE`, papel-alto `#F6F8F6`, tinta `#16201B`,
bosque `#1E3D2F`, bosque-profundo `#12261C`, bosque-claro `#2F5A45`, acento
único cinta `#F5C518` e inverso `#F3F6F3`.

**Regla del acento:** la cinta amarilla SOLO se usa como pintura de bloque
(header, CTA primario, tablón de avisos, estado vacío), nunca como color de
texto sobre fondo claro.

Identidades anteriores (solo contextuales, ya no vigentes): Carbon Pulse
violeta y Montaña Nocturna (oscuro, con acento salvia/ember). No existen
tokens oscuros ni acentos salvia/ember en el código actual; la fuente de
verdad es `styles/tokens.css`.

NUNCA sobrescribas la paleta ni cambies la identidad visual sin aprobación
explícita: separa "propuesta" de "cambio aplicado".

## Referencias context7 útiles

- css-color-variables
- wcag-contrast-ratio
- css-oklch-color
- css-color-mix
- accessible-color-palette

## Tareas típicas

### Auditar colores
Audita la paleta actual de `/styles/tokens.css`: contraste, consistencia y uso
de variables en `:root`.

### Crear paleta accesible
Define una paleta accesible como variables CSS en `:root` (primaria,
secundaria, neutros, estados, acentos), presentada como PROPUESTA con ratios
de contraste par por par.

### Ajustar contraste (WCAG 2.1 AA)
Verifica y ajusta contrastes texto/fondo: 4.5:1 mínimo texto normal, 3:1 texto
grande. Prioriza pares reales del sitio (text-muted, botones, placeholders).

### Estados de color
Agrega variables de estado (hover, active, focus, disabled) para botones,
links, cards y componentes interactivos, sin cambiar el tono de marca.
