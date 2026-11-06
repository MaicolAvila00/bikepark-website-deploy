---
name: Component Design System
description: Design tokens, variant APIs y contratos de props para el sistema de componentes del proyecto (sin Storybook/versiones extra).
---

Sistema de componentes: design tokens, APIs de variantes y contratos de props
para `/components`. El proyecto es estático y sin dependencias extra, así que
las variantes se resuelven con clases CSS y data-atributes (sin librerías tipo
CVA ni Storybook salvo aprobación del usuario).

Material vigente: los tokens ya existen en `:root` de `globals.css`; los
componentes son funcionales y puros con datos desde `/data/*.json`.

## Tareas típicas

### Design tokens en CSS
Crea o extiende design tokens como variables CSS en `:root` de `globals.css`
(colores, tipografía, espaciado, bordes, sombras). Sin renombrar las vigentes.

### API de variantes
Crea un componente con API de variantes (size, variant, disabled) usando solo
clases CSS y data-atributes, ej: `<button className="btn" data-variant="secondary">`.

### Contrato de props
Define el contrato de props (tipos JSDoc, valores por defecto, comportamientos)
para un componente existente, como se espera en AGENTS.md.

## Nota sobre Storybook

Este proyecto no usa Storybook (sería dependencia nueva prohibida sin
registro). Si piden documentación de componentes, propón un archivo Markdown
ligero en vez de instalar Storybook sin autorización.
