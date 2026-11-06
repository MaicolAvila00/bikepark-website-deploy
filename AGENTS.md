# AGENTS.md — Bikepark Website

Guía de trabajo del proyecto: cómo trabajar y qué está ya implementado. El estado más reciente está en la última entrada de `CHANGELOG.md`. Los cambios sustanciales generan un documento de seguimiento en `odd/tasks/`; los cambios pequeños y bien entendidos se implementan directo.

## Reglas

Lee `DOCS/constitution.md` antes de tocar código. Para cambios grandes, explora el código relevante y confirma el alcance antes de implementar.

## 1. Qué es

Sitio web estático de la comunidad de MTB **Nacho Bike Park** (Parque Nacional, Bogotá): contenido informativo fijo (sobre el park, reglas, atracciones) y agenda de eventos. No es un blog de noticias.
Stack: Next.js 14 (App Router), JavaScript, CSS puro, datos JSON. Build estático (`output: 'export'` → `out/`). Con este modo `next start` no funciona: usar `npm run serve`.

## 2. Mapa del proyecto

| Carpeta | Qué va ahí |
|---|---|
| `/app` | Rutas (`page.js`) y archivos especiales (`layout.js`, `not-found.js`, `robots.js`, `sitemap.xml/route.js`, `icon.svg`, OG). No crear carpetas nuevas sin añadir la ruta a la tabla de abajo. |
| `/components` | `layout/` (Header, Footer), `sections/` (InfoSection, EventCard, EventosGrid, EventJsonLd, AtraccionCard, AtraccionesGrid, FotoSeccion (foto de sección con fallback y crédito), ReglasCategorias (índice y categorías de /reglas)), `ui/` (Button, Card (sin adopción), PageHeader, Logo), `hooks/` (useImageFallback). `PascalCase`, un componente por archivo. |
| `/data` | Única fuente de verdad: `informativa.json`, `eventos.json`, `novedades.json`, `navegacion.json`, `atracciones.json`. |
| `/lib` | Helpers puros: `eventos.js` (filtrar/ordenar agenda), `fechas.js`, `site.js` (URL y nombre del sitio), `atracciones.js` (escala de dificultad, orden de fichas, normalización de nombres y validación de contenido). |
| `/styles` | `globals.css` (único CSS importado en `layout.js`; solo hace `@import` en este orden: `tokens.css` → `base.css` → `layout.css` → `components.css`) · `tokens.css` (`:root` con la paleta "Manifesto", `@font-face` de las fuentes y la escala tipográfica) · `base.css` (reset, tipografía base, enlaces, foco, selección, `.contenedor`, `.boton`) · `layout.css` (chrome: header, nav, skip link, `.page`, footer) · `components.css` (11 bloques: home, sección informativa, foto de sección, reglas, atracciones, escala de dificultad, eventos, detalle de evento, estado vacío, escenario). |
| `/public` | `images/` (secciones informativas y logo), `events/` (eventos), `fonts/` (Anton 400 y Public Sans variable, ambas OFL, con su licencia en el mismo directorio) y `opengraph-image.png` generado por `scripts/generar-og-placeholder.js`. |
| `/scripts` | `validar-datos.js`, `generar-og-placeholder.js` (Node puro, sin dependencias). |
| `/tests` | Pruebas de la lógica pura con `node:test`, ejecutables con `npm test`, sin dependencias. |
| `/specs` | Historial de especificaciones de funcionalidades ya implementadas (referencia, no obligatorio para trabajar). |
| `/DOCS` | `constitution.md` (principios del proyecto, de lectura obligatoria) y los documentos históricos de identidad del park: briefing de producción y propuesta visual descartada. Sin subcarpetas. |

**Rutas permitidas:** `/` · `/sobre` (`about`) · `/reglas` (`rules`) · `/atracciones` (`attractions`) · `/eventos` · `/eventos/[id]` (usa `generateStaticParams()`; toda ruta dinámica nueva debe incluirlo).

**Client components** (los únicos): `Header`, `InfoSection`, `EventCard`, `FotoSeccion`. Todo lo demás es server.

## 3. Tareas frecuentes

**Añadir un evento**
1. Agregar el objeto a `data/eventos.json` según el schema.
2. `npm run validate:data`.
3. `npm run build` (la página de detalle se genera sola).

**Añadir una página informativa**
1. Agregar la sección a `data/informativa.json` con `id` único.
2. Crear `app/<ruta>/page.js` con `<InfoSection seccionId="<id>" />`.
3. Agregar `{ href, label }` a `data/navegacion.json` (no editar `Header.js`).
4. Añadir la ruta a la lista de arriba.

**Añadir una atracción**
1. Agregar el objeto a `data/atracciones.json` según el schema de §4 (la dificultad decide la posición, el orden del array desempata).
2. `npm run validate:data`.
3. `npm test`.
4. `npm run build`.

Sin tocar componentes.

**Añadir una foto**
1. Guardarla en `/public/images/` o `/public/events/` (JPEG, sin tildes en el nombre).
2. Referenciarla con ruta absoluta en el JSON (`"/events/foto.jpg"`).
3. Incluir siempre `"credito"`. Si la imagen falla, el componente muestra un placeholder; nunca debe quedar una imagen rota.

**Añadir o cambiar una norma de /reglas**
1. Editar `categorias` de la entrada `rules` en `data/informativa.json` (texto ≤140 caracteres, `caracter` `obligatoria` | `recomendada`).
2. `npm run validate:data`.
3. `npm test`.
4. `npm run build`.

Sin tocar componentes.

## 4. Contratos de datos

Cambiar un campo exige cambiar en el mismo trabajo los componentes que lo leen. Claves JSON sin tildes.

- **`eventos.json`**: `id` (único, kebab-case) · `titulo` · `fecha_inicio` y `fecha_fin` (`YYYY-MM-DD`; iguales si dura un día) · `hora` (`HH:MM`) · `lugar` · `descripcion` · `imagen` · `credito` (opcional) · `enlace` (URL externa o `""`). El `id` alimenta `/eventos/[id]`.
- **`informativa.json`**: `id` (único, minúsculas) · `tipo` · `titulo` · `contenido` · `imagen` · `credito` (opcional) · `enlace` (URL externa o `""`).
  - La entrada `rules` usa `contenido` como texto de intro (≤220 caracteres, no debe reproducir una norma) y añade el campo `categorias`: las 3 categorías canónicas (`seguridad`, `en-la-pista`, `en-el-parque`), cada una con `normas: [{ texto, caracter }]`. El crédito de la foto es obligatorio en `rules`.
- **`atracciones.json`**: `id` (único, kebab-case) · `nombre` (2–30 caracteres, grafía canónica de la portada) · `dificultad` (`verde` | `azul` | `rojo` | `negro` | `doble_negro`) · `dificultad_max` (opcional; mismo dominio que `dificultad` y estrictamente mayor que ella. Declara que la ficha abarca un rango: `zona-de-vuelos` es `verde` → `rojo`. Si la atracción tiene un solo nivel, se omite) · `descripcion` (admite `""`; si existe, 60–220 caracteres) · `imagen` (admite `""`; si no está vacía, ruta absoluta a un archivo de `/public`) · `credito` (obligatorio). El orden del array desempata a igual dificultad. La retícula se ordena por el nivel mínimo (`dificultad`), nunca por el máximo. Sin `imagen`, la ficha muestra un marcador con nombre y crédito; si el archivo referenciado no existe, `npm run validate:data` falla.
- **`novedades.json`**: `id` (único, kebab-case) · `badge` · `fecha` (`YYYY-MM-DD`) · `mensaje`. El emoji ya no se renderiza desde [2.8.0].
- **`navegacion.json`**: `href` (empieza con `/`) · `label`.

## 5. Convenciones de código

- Enlaces internos con `next/link`; externos con `target="_blank" rel="noopener"`.
- `<img>` plano, no `next/image` (exigiría `images.unoptimized: true` en `next.config.js`, documentado antes de usarlo).
- Clases CSS en `kebab-case`. Colores, espaciados y tamaños SIEMPRE desde los tokens de `tokens.css`: ningún componente escribe un color literal ni un `px` de espaciado.
- Paleta "Manifesto": una sola superficie oscura (`--papel`, casi negro cálido), tinta cálida (`--tinta`, `--tinta-2`, `--tinta-apagada`), filetes (`--linea`, `--linea-fuerte`) y un ÚNICO acento rojo (`--acento`, `--acento-profundo`, `--acento-texto`, `--acento-tinta`). El acento se usa como pintura de bloque; como color de texto solo con `--acento-texto`, que ya cumple AA sobre el papel. No existe un segundo color de marca.
- Geometría: radios a 0 (`--radius`), sin sombras, sin degradados y sin animaciones de entrada. Las transiciones se limitan a `transform`, `opacity` o `color` con `--transition`. Una única animación permitida: el reveal del titular del hero, anulado con `prefers-reduced-motion`.
- Tipografía: display **Anton 400** (`--fuente-display`), siempre en mayúsculas y reservada a titulares y numerales; cuerpo **Public Sans** (`--fuente-texto`). Etiquetas, pies, metas y enlaces de navegación van en Public Sans, un paso menores (`--etiqueta`, `--micro`, `--nano`), en caja baja y sin tracking. Las dos fuentes se auto-hospedan en `/public/fonts` con su OFL: prohibido `next/font/google` y cualquier CDN de fuentes.
- Imágenes: toda foto declara `aspect-ratio` y `object-fit: cover`; PROHIBIDO fijar el alto en píxeles. Tratamiento de foto: `filter: grayscale(1) contrast(1.15)` y anillo `1px solid var(--linea)`. El crédito va en `.img-credito` bajo la imagen.
- Contenedor único: la clase `.contenedor` (`max-width: var(--contenedor)` = 1160 px, gutter `--gutter`). Ninguna página define su propio ancho. El h1 de ruta (`.page-title`, `--display-2`) es siempre mayor que el h2 de sección (`.titulo-seccion`, `--titulo`): la jerarquía no se aplana.
- Todos los controles tienen los ocho estados, `:active` incluido, y foco visible con `3px solid var(--foco)`.
- El logo es el PNG `/images/logo-nacho-bike-park.png` servido con `<img>` plano y **sin placa**: es monocromo con alfa y se invierte con `filter: invert(1)` en `.logo-mark` para que se lea sobre la superficie oscura. Contiene la palabra "NACHO" dibujada como parte del logotipo, así que el contraste de marca no aplica (WCAG 1.4.3 exime logotipos); el nombre accesible vive en el texto real `.logo-text` y el `alt` va vacío. El marcado es `.logo-brand` (flex), `.logo-mark` (36 px) y `.logo-text`.
- `EventCard` ya incluye su enlace al detalle: no envolverlo en `<Link>`; muestra el crédito como texto plano. `EventosGrid` recibe la lista ya filtrada con `lib/eventos.js`, nunca el JSON crudo. `PageHeader` mantiene sus props `titulo` y `subtitulo`.
- No usar `useState` para contenido que ya está en `/data` (el fallback de imagen es la excepción, vía `useImageFallback`).
- `AtraccionCard` y `AtraccionesGrid` son componentes servidor (sin `'use client'` ni estado). La lista se ordena en la página con `ordenarAtracciones()` de `lib/atracciones.js`; ni la tarjeta ni la retícula ordenan o filtran.
- Si una ficha declara `dificultad_max`, `AtraccionCard` pinta un chip por nivel separados por un `a` real ("Verde a Rojo") dentro de `.atraccion-dificultades`. Nunca se fusionan en un chip único y el conector es texto, no CSS. Ese contenedor lleva `flex-wrap: nowrap`: o cabe entero, o baja entero.
- Los cinco tokens `--dificultad-*` con `--dificultad-texto` se conservan tal cual (AA validado con blanco sobre cada color) y el nivel siempre va escrito, nunca solo por color. `negro` y `doble-negro` llevan `outline: 1px solid var(--linea-fuerte)` para no desaparecer sobre el papel oscuro.
- `ReglasCategorias` es componente servidor y no ordena ni filtra: recibe la salida de `normalizarReglas`; el orden canónico vive en `lib/reglas.js`. El carácter de cada norma (`Obligatoria` / `Recomendada`) es TEXTO en `.regla-caracter`, nunca una cápsula de color.
- El `scroll-margin-top` de las categorías de `/reglas` depende del token `--header-altura`.
- Sin `imagen`, la ficha de atracción pinta el marcador desde el servidor: no se usa `useImageFallback` ni `onError` en las fichas.
- 2 espacios; comillas simples en JS, dobles en JSON y JSX.

## 6. Definición de "Hecho"

Una tarea no se reporta como terminada hasta que:
1. `npm run build`, `npm run lint` y `npm test` pasan sin errores nuevos.
2. Si se tocó `/data`: `npm run validate:data` pasa (el script ya existe: valida los 5 JSON —eventos, informativa, atracciones, novedades y navegación— contra el schema, ids únicos, fechas reales y hrefs internos).
3. Si cambió una ruta, un schema o el contrato de un componente: este archivo está actualizado.
4. `CHANGELOG.md` tiene una entrada nueva. Si algún punto no aplica, se dice explícitamente ("sin cambios de ruteo").

## 7. Agentes (`.opencode/agents/`)

- `@orquestador`: punto de entrada para cualquier tarea; decide a quién consultar y delega.
- `@arquitecto`: schemas de `/data`, `/lib` y build estático.
- `@frontend`: componentes, accesibilidad y consistencia visual.
- `@ejecutor`: aplica cambios ya aprobados; no decide.

## 8. Formato de CHANGELOG.md

Entradas de más reciente a más antigua:

```md
## [X.Y.Z] - YYYY-MM-DD
### Added / Changed / Fixed
- Qué cambió y en qué archivos
```

Versiones: `PATCH` = fix, copy o estilo menor · `MINOR` = componente, ruta o campo nuevo retrocompatible · `MAJOR` = rompe un contrato (schema, props, estructura).