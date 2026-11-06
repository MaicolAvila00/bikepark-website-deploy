# CONSTITUCIÓN — Bikepark Website

1. **Stack mínimo.** Next.js 14 (export estático), JavaScript, CSS puro y JSON. Sin backend, TypeScript, Tailwind ni dependencias nuevas sin aprobación y registro en AGENTS.md + CHANGELOG. *Verifica:* `package.json` y `output: 'export'` en `next.config.js`.

2. **Spec antes que código.** Toda funcionalidad nueva se especifica en `specs/NNN-nombre/spec.md` y se aprueba antes de programar; AGENTS.md describe solo lo ya implementado. Si el código cambia un contrato, AGENTS.md y CHANGELOG cambian en el mismo trabajo. *Verifica:* existe el spec aprobado y se cumple la "Definición de Hecho".

3. **Lógica separada de interfaz.** La lógica vive en `/lib` (pura, sin estado ni `'use client'`); los componentes solo renderizan. La agenda se filtra siempre con `lib/eventos.js`. *Verifica:* ningún componente filtra u ordena el JSON.

4. **Tests sin instalar nada.** Solo `node:test` y scripts en `/scripts`, más `build`, `lint` y `validate:data` en verde. *Verifica:* `npm run build && npm run lint && npm run validate:data`.

5. **Cero datos de usuarios.** El sitio no recolecta, guarda ni envía datos personales: sin formularios, cookies, analíticas ni scripts de terceros sin aprobación. *Verifica:* buscar `fetch`, `localStorage`, `cookie` y `<script src` externos.

6. **Español.** Textos y datos en español (es-CO); nombres de dominio en español y sin tildes en claves JSON ni archivos. Inglés solo para convenciones del framework. *Verifica:* `<html lang="es">` y claves de `/data`.