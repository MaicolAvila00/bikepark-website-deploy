---
name: TypeScript Migration
description: Tipado gradual para el proyecto JavaScript (JSDoc, tipos de props, schemas de data) — sin migrar el stack por decisión del usuario.
---

Tipado gradual para el proyecto (que por decisión está en **JavaScript**):
anotaciones JSDoc, tipos de props y schemas de datos — como material de
migración, no como cambio de stack. Migrar archivos a `.tsx`/`.ts` requiere
aprobación explícita (violaría la convención vigente de AGENTS.md).

## Referencias context7 útiles

- typescript-jsdoc-type-checking
- typescript-branded-types
- typescript-react-generics
- nextjs-typescript-config

## Tareas típicas

### JSDoc a componentes JS
Añade anotaciones JSDoc (`@param`, `@returns`, `@typedef`) a componentes JS
para tipado estático SIN cambiar la extensión del archivo. `checkJs` se
activaría solo con aprobación del usuario.

### Tipos para props
Define typedefs JSDoc para props de un componente, incluyendo variantes y
opcionales.

### Schemas de data en tipos
Crea typedefs JSDoc para los schemas JSON `/data/*.json`
(informativa.json, eventos.json) sincronizados con AGENTS.md — los campos
RESTRINGIDOS (sin tilde: `descripcion`) y sus tipos son parte del contrato.
