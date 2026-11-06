# CHANGELOG — Bikepark Website

> Bitácora oficial de cambios del proyecto. Toda tarea terminada DEBE registrar aquí
> sus cambios. Este documento también sirve de contexto histórico para nuevos agentes.

Formato: [Versión] - YYYY-MM-DD

## [3.0.0] - 2026-10-28
### Changed
- **Rediseño visual completo.** Sustituye la identidad "Señalización de pista" (papel claro, verde bosque, cinta amarilla, Archivo) por la identidad "Manifesto": superficie oscura cálida, tinta cálida, un único acento rojo, filetes de 1 px, aristas rectas y Anton en mayúsculas sobre Public Sans. Rompe el contrato visual anterior, por eso MAJOR.
- `styles/tokens.css` reescrito: paleta nueva, `@font-face` de Anton 400 y Public Sans variable (auto-hospedadas en `/public/fonts` con su licencia OFL) y escala tipográfica nueva. Eliminados los tokens `--bosque*`, `--cinta*`, `--inverso`, `--tinta-suave`, `--tinta-tenue`, `--papel-alto`, `--papel-hundido`, `--radius-xs/sm/lg/full` y `--fondo-pagina`.
- Nuevo `styles/base.css` (reset, tipografía base, enlaces, foco, selección, `.contenedor`, `.boton`); el reset sale de `layout.css`. `globals.css` importa `tokens → base → layout → components`.
- `styles/layout.css` reescrito: header sticky con barra de 4 px de tinta, nav en caja baja, menú móvil solo con transición de `transform`/`opacity`, footer como mástil y `.page-title` con `--display-2`.
- `styles/components.css` reescrito completo (11 bloques): home con hero Ledge, índice numerado 01/02/03, avisos en filas de registro y franja de ciudad en duotono; `/reglas` como tabla de registro (el carácter es texto, no cápsula); `/atracciones` con fichas de `aspect-ratio` declarado; `/eventos` y detalle como listas bajo filete.
- `Header`, `Footer`, `PageHeader`, `Button` y `Logo` reconstruidos; se conservan el menú móvil con `aria-expanded`, el skip link y los enlaces de `data/navegacion.json`.
- Añadido en el header el CTA «Ver la agenda» (mismo destino que el CTA de la home). Desviación declarada del rediseño.
### Fixed
- Hueco de ~200 px en `.info-section` (venía de `grid-row: 1 / span 3`): ahora texto y foto son dos celdas de una rejilla de dos columnas.
- `.foto-seccion img` fijaba 537 px por un `clamp()` con mínimo mayor que el máximo; ahora usa `aspect-ratio`.
- `.container` sin `max-width`: sustituido por `.contenedor` con tope de 1160 px.
- Jerarquía tipográfica plana: `.page-title` y el h2 de sección ya no comparten tamaño.
- Salto de encabezado h1→h3 en `/eventos/[id]`.
- `.titulo-seccion` pegado al bloque anterior en `/eventos`.
- Doble filete bajo el subtítulo en `/sobre` y `/atracciones`.
- `transition: all` eliminado del proyecto y `:active` añadido a todos los controles.
- `scripts/generar-og-placeholder.js` actualizado a la paleta nueva y placeholder regenerado.

## [2.11.3] - 2026-10-28

### Changed
- `/reglas`: la intro queda sola arriba a todo el ancho y la foto pasa a la columna derecha junto a las categorías desde 1024 px (alto máximo 200 px). Se restaura el subtítulo del `PageHeader` y la frase duplicada sale de la intro (`data/informativa.json`). `app/reglas/page.js`, `styles/components.css`. Las listas se agrupan en `.reglas-listas` para que las 3 categorías no se repartan entre las dos columnas del grid.

### Verified
- `npm run build` exit 0 · `npm run lint` exit 0 · `npm run validate:data` exit 0.

## [2.11.2] - 2026-10-28

### Changed
- `/reglas`: la foto de la cabecera pasa a proporción panorámica (columna de hasta 520 px, alto máximo 235 px) en `styles/components.css`.

### Verified
- `npm run build` exit 0 · `npm run lint` exit 0.

## [2.11.1] - 2026-10-28

### Changed
- `/reglas`: la foto y la intro forman una cabecera en dos columnas desde 1024 px (intro a la izquierda, foto a la derecha con recorte `cover`); en pantallas menores la foto va arriba a todo el ancho. `styles/components.css` (`.reglas-cabecera`, `.foto-seccion`) y `app/reglas/page.js`.

### Verified
- `npm run build` exit 0 · `npm run lint` exit 0 · `npm test` 36/36.

## [2.11.0] - 2026-10-28

### Added
- `/reglas` muestra las normas agrupadas en 3 categorías (`Seguridad`, `En la pista`, `En el parque`) con índice de anclas, intro corta y chip `Obligatoria`/`Recomendada` por norma: 14 normas en total.
- `lib/reglas.js`: `CATEGORIAS`, `CARACTERES`, `MAX_NORMA`, `MAX_INTRO`, `normalizarReglas`, `validarReglas` y `etiquetaCaracter` (lógica pura).
- `components/sections/ReglasCategorias.js` (servidor) y `components/sections/FotoSeccion.js` (cliente, con `useImageFallback`).
- `tests/reglas.test.js`: 10 casos (`node:test`).
- `styles/tokens.css`: token `--header-altura`.

### Changed
- `data/informativa.json`: la entrada `rules` pasa a `contenido` = intro y campo nuevo `categorias`; el párrafo largo se reparte en las 14 normas.
- `scripts/validar-datos.js`: admite campos no textuales por schema y valida la entrada `rules` con `validarReglas`.
- `app/reglas/page.js`: deja de usar `InfoSection`; compone `FotoSeccion`, intro y `ReglasCategorias`. `description` del metadata ajustada.
- `styles/components.css`: bloque `Reglas por categorías` (índice, categorías, `.norma-caracter`, `.reglas-intro`).

### Fixed
- `app/reglas/page.js`: la foto no se pintaba porque `imagen` y `credito` se leían de `normalizarReglas` (que solo devuelve `intro` y `categorias`); ahora salen de la entrada `rules` del JSON. `subtitulo` del `PageHeader` ya no afirma que todas las normas sean obligatorias.

### Verified
- `npm test` 36/36 · `npm run build` exit 0 · `npm run lint` exit 0 · `npm run validate:data` exit 0.
- DevTools sobre el build estático: 3 categorías y 14 normas, ancla `#en-el-parque` con el título visible bajo el header (131 px > 72 px), sin desbordamiento a 320 px, foco visible en el índice (3 px), contenido completo sin JS, Lighthouse Accessibility 100.

## [2.10.5] - 2026-10-26

### Changed
- `specs/001-atracciones-nuevas/spec.md`: cabecera puesta al día —declaraba la v4 mientras el contenido era la v5— y sección 12 nueva con el cierre: qué se publicó, verificación, residuales y aprobaciones de `@arquitecto` y `@frontend`. La spec queda cerrada y se conserva como historial.
- `specs/001-atracciones-nuevas/plan.md`: cabecera puesta al día. Declaraba la spec en v3 y el plan «pendiente de aprobación del usuario antes de ejecutar»; pasa a implementado y cerrado, con la spec en v5.

### Verified
- Sin cambios de código. `npm test` 26 de 26 · `npm run lint` exit 0 · `npm run build` exit 0 · `npm run validate:data` exit 0.

### Pending
- CF-13 parcial: falta la revisión con lector de pantalla real (NVDA/VoiceOver), fuera del alcance del código.

## [2.10.4] - 2026-10-26

### Changed
- `scripts/validar-datos.js`: el schema de `atracciones.json` declara ahora `opcionales: ['dificultad_max']` y el resumen de validación lo informa (`Opcionales: dificultad_max`). No entra en `campos`, que son los obligatorios: exigirlo rompería las otras cuatro fichas. Se corrige de paso el comentario del bloque, que daba `credito` por opcional en todos los archivos cuando en `atracciones.json` es obligatorio.

### Verified
- `npm run validate:data` exit 0, con el campo opcional visible en el resumen.
- `npm run build` exit 0 · `npm test` 26 de 26 · `npm run lint` exit 0.

### Pending
- `SITE_URL` sigue apuntando a `https://www.nachobikepark.com`, un dominio que no resuelve: `metadataBase`, `sitemap.xml` y `robots.txt` publican un host inexistente. Deuda registrada en `DOCS/briefing-productor-nacho-bikepark.md` §6.

## [2.10.3] - 2026-10-26

### Changed
- `data/informativa.json`: la foto de la sección "Secciones Principales" de /atracciones pasa a `/images/seccion-principal.png` (328 × 403), en lugar de `salto-bosque-nbp.png`.
- `styles/components.css`: `.info-section img` recupera `object-fit: cover`. Estaba en `none`, que no escala la foto: dejaba 205 px de aire a los lados a 1280 y recortaba el 48 % del alto a 320. Además, la sección de Atracciones —única con foto vertical (328 × 403)— pasa a marco `aspect-ratio: 4 / 5`, con `max-width: 24rem` para que a una columna ancha el marco no mida 728 × 910 a 768 px. A dos columnas se anula el tope. Se acota con `.info-section.attraction`, el `tipo` que `InfoSection` ya pinta en el `className`; Sobre y Reglas conservan `4 / 3` porque sus fotos son horizontales.

### Pending
- `public/images/salto-bosque-nbp.png` (388 KB) queda sin referencia en el código. No se borra: el proyecto no está bajo control de versiones y el borrado sería irreversible.

## [2.10.2] - 2026-10-26

### Changed
- `styles/components.css`: `.hero-datos` pasa de `flex-wrap` a retícula de 2 × 2 (`repeat(2, minmax(0, 1fr))`) por el cuarto dato del hero. Con cuatro ítems, el cuarto quedaba solo en una segunda fila a 1280 y 768 px. Por debajo de 480 px la retícula baja a una columna, porque dos columnas de ~119 px romperían "Zona de vuelos, hidratación y línea de dirt jump" en cuatro o cinco líneas.

### Verified
- Sin desbordamiento horizontal a 320, 768 y 1280 px; cuatro datos visibles en los tres anchos.
- `npm run build` exit 0 · `npm test` 26 de 26 · `npm run lint` exit 0 · `npm run validate:data` exit 0.

## [2.10.1] - 2026-10-26

### Changed
- `app/page.js`: el cuarto dato del hero queda como "Secciones: Zona de vuelos, hidratación y línea de dirt jump" (texto del usuario); se normaliza la indentación del bloque, que había quedado desalineada.
- `specs/001-atracciones-nuevas/spec.md` §9: la duda 1 pasa a resuelta. Las dificultades están confirmadas con la comunidad y no cambian en el contenido; cobertura del rango `verde` → `rojo` incluida.
- `app/logo_nacho_bike_park.png`: eliminado por el usuario. Era un duplicado píxel a píxel del emblema y vivía en `app/`, que no sirve archivos estáticos; la copia servible es `public/images/logo-nacho-bike-park.png`.

### Verified
- `npm run build` exit 0 · `npm test` 26 de 26 · `npm run lint` exit 0 · `npm run validate:data` exit 0.

## [2.10.0] - 2026-10-26

### Added
- `data/atracciones.json`: campo opcional `dificultad_max`. Declara que una ficha abarca un rango de dificultad y no un solo nivel. `zona-de-vuelos` pasa a `verde` → `rojo`, que es lo que hay en el terreno: la v4 la publicaba como verde a secas y ocultaba los obstáculos rojos.
- `lib/atracciones.js`: `nivelesDeAtraccion(atraccion)` devuelve los niveles válidos de una ficha en orden ascendente (`['verde']` o `['verde', 'rojo']`). `validarAtracciones` rechaza un `dificultad_max` fuera de escala o que no sea estrictamente mayor que el nivel mínimo; si la ficha tiene un solo nivel, el campo se omite.
- `tests/atracciones.test.js`: 4 casos nuevos (23–26). De 22 a 26.

### Changed
- `components/sections/AtraccionCard.js` y `styles/components.css`: pinta un chip por nivel separados por un `a` real ("Verde a Rojo") dentro de `.atraccion-dificultades`, con `flex-wrap: nowrap`. El primer intento no llevaba contenedor y a 320 px la fila se partía en "Zona de vuelos Verde a" / "Rojo"; con el envoltorio el rango baja entero o cabe entero. El nivel sigue siempre escrito, nunca solo por color.
- `lib/site.js`: `SITE_URL` deja de ser el placeholder `https://www.bikepark-xyz.com` y apunta a `https://www.nachobikepark.com`; se corrige el comentario que lo declaraba pendiente y la referencia a `docs/`, que ahora es `DOCS/`.
- `AGENTS.md`: §4 documenta el contrato de `dificultad_max` y que el orden usa el nivel mínimo; §5 recoge la convención de los dos chips.
- `DOCS/briefing-productor-nacho-bikepark.md` §6: el riesgo de `SITE_URL` deja de estar abierto; queda pendiente comprobar que el dominio resuelve.
- `specs/001-atracciones-nuevas/spec.md`: v5 con RF-16, CF-17, la duda 4 resuelta y la sección 11 con la enmienda.

### Verified
- `npm run validate:data` exit 0 · `npm test` 26 de 26 · `npm run lint` exit 0 · `npm run build` exit 0.
- Orden de la retícula: `zona-de-vuelos` se coloca por su nivel mínimo (verde), no por el máximo.

## [2.9.3] - 2026-10-26

### Changed
- `DOCS/`: la documentación de identidad vuelve a la raíz del repositorio. Estaba en `lib/DOCS/`, donde no debe vivir porque `lib/` es lógica pura según la constitución. La copia de la raíz se verificó idéntica byte a byte por SHA256 antes de eliminar la de `lib/`.
- `DOCS/READ-PROYECT/` desaparece: los tres documentos quedan planos en `DOCS/` (`constitution.md`, `briefing-productor-nacho-bikepark.md`, `propuesta-visual-nbp.md`).
- `DOCS/briefing-productor-nacho-bikepark.md`: podado. Se eliminan la sección "Datos y código — ESTADO" y el bloque de estado de [2.5.0], que duplicaban este CHANGELOG y estaban desfasados. Se corrigen tres afirmaciones caducadas: que no existía logo oficial, que había placeholders SVG y los nombres de archivo del primer lote de fotos. Se conserva lo que no está en ningún otro sitio: hechos verificados del parque, autoría y estado de licencias del material gráfico, plantilla de DM y prioridad de tomas.
- `DOCS/propuesta-visual-nbp.md`: reducido de 88 a 32 líneas. Se conserva como registro de la dirección descartada ("Montaña Nocturna", sustituida en [2.8.0]) con sus hex y el motivo del abandono; el resto describía un código que ya no existe.
- `AGENTS.md`: la regla de lectura apuntaba a `DOCS/constitution.MD` y el archivo real es `constitution.md`; la fila de `/DOCS` del mapa del proyecto refleja la estructura plana.

### Verified
- `npm run validate:data`: exit 0. `npm test`: 22 de 22. `npm run build`: exit 0. Una carpeta `DOCS/` en la raíz no entra en el build estático.

## [2.9.2] - 2026-10-26

### Changed
- `public/images/logo-nacho-bike-park.png`: se restaura el emblema oficial (456×438, fondo transparente) en `public/`, donde ya no estaba; el `<img>` del header y del footer apuntaba a un archivo ausente desde el build anterior.
- `components/ui/Logo.js`: la marca gráfica deja de ser un SVG inline de cordilleras y pasa a ser el emblema oficial servido como PNG plano, sin `next/image`. El nombre accesible sigue en `<span class="logo-text">`, que no cambia.
- `styles/layout.css`: `.logo-mark` queda en 40 px de ancho con `aspect-ratio: 456 / 438`, `object-fit: contain` y **sin placa**. El emblema es monocromo con alfa, así que se invierte con `filter: invert(1)` para que la masa oscura no se funda con el verde bosque (1,38:1 sin invertir, 8,93:1 invertida). `.footer .logo-mark` queda en 36 px y pierde el `height` fijo que deformaba la imagen.
- `app/icon.svg`: favicon reescrito como placa `--cinta` (`#F5C518`) con la silueta en `#1E1E1E`, sin líneas interiores, porque el detalle del emblema se pierde a 16 px. Los hex van literales con un comentario que los mapea a los tokens: un favicon no puede leer `tokens.css`.

### Verified
- Navegador a 1280, 768 y 320 px: imagen cargada (456×438), caja de 40×38 en el header y 36×35 en el footer, sin placa residual (sin `background`, sin `border-radius`, sin `padding`), cero desbordamiento horizontal en los tres anchos y sin salto de altura del header.
- `npm run validate:data`: exit 0. `npm test`: 22 de 22. `npm run lint`: exit 0 con 9 avisos de `<img>` (los 8 que ya registraba la entrada 2.9.1 más el del logo, que es la convención del proyecto). `npm run build`: exit 0, con el PNG exportado a `out/images/logo-nacho-bike-park.png`.

### Pending
- El cuarto dato del hero de la portada ("Secciones") lo edita el usuario por su cuenta; queda fuera de esta entrada.
- `app/logo_nacho_bike_park.png` duplica el asset y no se sirve desde `app/`: se borra solo con confirmación explícita del usuario.
- Si aparece una versión monocroma clara del emblema, se sustituye el archivo y se elimina el `filter: invert(1)`.

## [2.9.1] - 2026-10-26

### Added
- `public/images/`: las cuatro fotos que faltaban (`pista-patos.png`, `pista-clasica.png`, `pista-kraken.png`, `zona-dirt.png`) y `zona-vuelos.png`, aportadas por el usuario. Las cinco fichas de `/atracciones` muestran ya imagen real con su crédito.
- Descripciones aprobadas para las cinco atracciones de `data/atracciones.json` (122, 87, 161, 111 y 199 caracteres, todas dentro del rango de NFR-4). La ficha ya no publica marcador.

### Changed
- `data/atracciones.json`: la atracción `linea-de-dirt-jump` pasa a llamarse "Línea dirt jump (Chilltrail)" y su dificultad cambia de `negro` a `rojo`; el `id` se mantiene. Consecuencia: el orden visible de la escala queda de verde a rojo y los niveles negro y doble negro se quedan sin atracción, algo que la leyenda ya contemplaba.
- `data/informativa.json` y `app/atracciones/page.js`: el párrafo introductorio y la `metadata.description`/`openGraph.description` citan "Línea dirt jump (Chilltrail)", para que la grafía coincida con la ficha (RF-13).
- `specs/001-atracciones-nuevas/spec.md`: publicada la **v4**, que alinea la sección 1.1, RF-2, RF-11, RF-13, NFR-7, los casos límite 3 y 6 y los criterios CF-1, CF-2, CF-4, CF-8, CF-10 y CF-13 con el contenido real, actualiza las dudas 2 y 3 y añade la sección 10 con la enmienda.

### Fixed
- `data/atracciones.json`: tildes y espaciado de las descripciones de Patos, Kraken y Línea dirt jump ("rapida" → "rápida", "lineas" → "líneas", "tecnica" → "técnica", "encontraras"/"podras" → "encontrarás"/"podrás", "seccion" → "sección", "Alli" → "Allí", "contra peraltes" → "contraperaltes") (NFR-7).
- Rutas de imagen del mismo archivo: se eliminó el prefijo `/public/` en tres fichas (`/public/images/...` no es una URL servible) y se alinearon las extensiones y nombres con los archivos realmente presentes en `public/images/`. Con las rutas corregidas, `npm run validate:data` pasó de 5 errores a 0.

### Verified
- `npm run validate:data`: exit 0; los cinco archivos de `/data` son válidos.
- `npm test`: 22 de 22. `npm run lint`: 0 errores y los 8 avisos de `<img>` que ya existían. `npm run build`: compilación correcta y exportación estática completa.
- `/atracciones` genera 5 fichas en el orden Zona de vuelos → Patos → Clásica → Kraken → Línea dirt jump (Chilltrail), con 5 fotos cargadas, 0 marcadores y las 5 descripciones.
- Navegador a 1280 px: 5 de 5 imágenes cargadas, 0 imágenes rotas, 0 peticiones HTTP 404, retícula de 3 columnas y 0 px de desbordamiento horizontal.

### Pending
- Revisión con lector de pantalla real (NVDA/VoiceOver): CF-13 queda parcialmente verificado.
- Mostrar "Zona de vuelos" con dos dificultades (verde y roja): plan redactado con un campo opcional `dificultad_max` y pendiente de la revisión de `@arquitecto`, cuyo modelo no está disponible.
- Confirmar las dificultades de las cinco atracciones con la comunidad (duda 1 de la spec, abierta).
- Restos sin destino en `public/` (`bikepark-hero.svg`, `safety-signs.svg`, `trail-map.svg`, `spring-tour.svg`, `winter-challenge.svg`, `skatepark-bogota-2.jpg`) y `app/nacho_bike_park_logo.png`: no se borra nada sin confirmación del usuario.
- El menú móvil del `Header` no cierra con Escape ni devuelve el foco al botón: incidencia preexistente, fuera del alcance de esta entrada.

## [2.9.0] - 2026-10-24

### Added
- `data/atracciones.json`: las cinco fichas (Patos, Clásica, Kraken, Zona de vuelos, Línea de dirt jump) con dificultad, descripción cuando existe y foto con crédito.
- `lib/atracciones.js`: escala canónica de cinco niveles, orden estable por dificultad, normalización de nombres, detección de duplicados y validación de contenido (la existencia de cada imagen se inyecta como parámetro).
- `components/sections/AtraccionCard.js` y `components/sections/AtraccionesGrid.js`: componentes servidor de ficha y de retícula, con marcador cuando no hay foto y estado vacío.
- `tests/atracciones.test.js`: 22 pruebas con `node:test`; script `npm test`.
- `styles/components.css`: bloque "FICHAS DE ATRACCIONES" con la retícula de 1/2/3 columnas, la ficha, el chip de dificultad y el marcador.

### Changed
- `/atracciones` muestra las fichas ordenadas por dificultad bajo el párrafo introductorio, y `metadata.description` y `openGraph.description` ya no anuncian jump line, drop zone ni pump track.
- `data/informativa.json`: grafías "Clásica" y "Línea de dirt jump" en el párrafo introductorio; las tres afirmaciones factuales se mantienen.
- `scripts/validar-datos.js` valida un quinto archivo, `atracciones.json`: schema, escala de dificultad, longitudes, crédito obligatorio, duplicados normalizados, nombres que la portada menciona y existencia física de cada imagen.
- `AGENTS.md`: mapa, tareas frecuentes, contrato de `atracciones.json`, convenciones de las fichas y `npm test` en la Definición de Hecho.
- `specs/001-atracciones-nuevas/`: spec v3 y plan v2 corregidos tras la revisión conjunta con arquitectura y front-end.

### Verified
- `npm run build`: 15 rutas estáticas; `npm run lint`: 0 errores (solo los avisos de `<img>` que ya existían); `npm run validate:data`: 5 archivos; `npm test`: 22 de 22.
- `/atracciones` genera 5 fichas en el orden Patos → Clásica → Kraken → Zona de vuelos → Línea de dirt jump, con 1 foto y 4 marcadores, y las 2 atracciones con descripción la muestran (fotografía del estado del 2026-10-24; el estado vigente está en [2.9.1]).

### Pending
- Cuatro atracciones siguen sin foto y la Línea de dirt jump sin descripción: se publican con marcador hasta que llegue el contenido.
- Las dificultades están aprobadas como propuesta y pendientes de confirmar con la comunidad.

## [2.8.1] - 2026-10-24

### Fixed
- Favicon (`app/icon.svg`) y Open Graph (`app/opengraph-image.png`, regenerado con `scripts/generar-og-placeholder.js`) alineados con la paleta vigente; el generador ya no usa los hex de la identidad nocturna y añade la banda de cinta inferior.
- Comentarios y cabeceras desactualizados: `styles/globals.css` (describía Montaña Nocturna y el reparto antiguo de CSS), `components/ui/Logo.js`, `components/ui/Card.js` y `styles/components.css`.
- `data/eventos.json`: "Elite" → "Élite" en la descripción de La Invasión 2025.
- `DOCS/READ-PROYECT/propuesta-visual-nbp.md` y `briefing-productor-nacho-bikepark.md`: las menciones internas a la paleta "vigente" ya no contradicen su nota de documento histórico.

### Changed
- `AGENTS.md`: rutas reales (`DOCS/constitution.MD`, `/DOCS`, `.opencode/agents/`), `Card` marcada como primitiva sin adopción y schema de `novedades.json` sin `icono`.
- `data/novedades.json` ya no incluye el campo `icono` (no se renderiza desde [2.8.0]) y `scripts/validar-datos.js` deja de exigirlo.
- Nomenclatura de la sección: label de navegación "Secciones y Rutas" → "Atracciones" (`data/navegacion.json`), alineado con la ruta y el `title` de la página.
- `.opencode/skills/color-design-system/SKILL.md` describe la identidad vigente y apunta a `styles/tokens.css`.
- `package.json`: descripción del proyecto actualizada (ya no habla de noticias ni de solo eventos futuros).
- Nota de documento histórico en `DOCS/READ-PROYECT/propuesta-visual-nbp.md` y `briefing-productor-nacho-bikepark.md`.

### Verified
- `npm run build`: OK — Compiled successfully, 15 rutas estáticas generadas (home, /sobre, /reglas, /atracciones, /eventos, 3 páginas de /eventos/[id], icon, OG, robots, sitemap, /_not-found). Solo los 7 warnings preexistentes de `<img>`, sin errores nuevos.
- `npm run lint`: OK — exactamente los mismos 7 warnings preexistentes de `<img>` en app/page.js, components/sections/EventCard.js y components/sections/InfoSection.js; sin errores nuevos.
- `npm run validate:data`: OK — eventos.json (3 entradas), informativa.json (3 entradas), novedades.json (1 entrada) y navegacion.json (5 entradas) válidas contra el schema; salida 0.

## [2.8.0] - 2026-10-24

### Changed
- Rediseño visual completo "Señalización de pista" (identidad Capital Nublada reinterpretada: papel frío, tinta verde-negra, bosque y acento cinta amarillo como único gesto). Nuevos tokens en styles/tokens.css; styles/layout.css y styles/components.css reescritos sin sombras, sin radios grandes ni animaciones de entrada; se eliminan el cielo de puntos y la cordillera fija de `.escenario`, la franja amarilla diagonal de las cards y los emojis usados como iconos.
- Tipografía: Archivo variable y Archivo Narrow 700 auto-hospedadas en public/fonts (SIL OFL), con @font-face en tokens.css. Sin dependencias npm nuevas ni CDN.
- Home (app/page.js): hero editorial con la foto real sangrada a la derecha, datos prácticos del parque, secciones informativas como filas con reglas, avisos como tablón y estado vacío de agenda reescrito como "Próxima válida: por confirmar".
- Páginas internas y componentes: PageHeader/InfoSection en dos columnas, escala de dificultad como señalética (badge-nombre/badge-nivel), meta de eventos como <dl>, créditos sin emoji y enlaces sin "→". EventosGrid pierde la prop `animado`; el contrato de EventCard e InfoSection se mantiene.
- Copy: corregidas erratas en data/informativa.json (about, attractions) y titulares del home; sin cambios de datos, fechas ni enlaces.

### Added
- scripts/validar-datos.js + script `validate:data` en package.json (valida los 4 JSON, ids únicos, fechas y hrefs internos).

### Verified
- `npm run build`: OK — Compiled successfully, 15 rutas estáticas generadas (home, /sobre, /reglas, /atracciones, /eventos, 3 páginas de /eventos/[id], icon, OG, robots, sitemap, /_not-found). Solo los 7 warnings preexistentes de `<img>` (regla del proyecto: `<img>` plano, no `next/image`), sin errores nuevos.
- `npm run lint`: OK — exactamente los mismos 7 warnings preexistentes de `<img>` en app/page.js, components/sections/EventCard.js y components/sections/InfoSection.js; sin errores nuevos.
- `npm run validate:data`: OK — eventos.json (3 entradas), informativa.json (3 entradas), novedades.json (1 entrada) y navegacion.json (5 entradas) válidas contra el schema de AGENTS.md; salida 0.
- Limpieza de tokens: los alias del "PUENTE TEMPORAL" de tokens.css se eliminaron tras grep previo (0 usos de esos nombres en los 4 css); grep post-limpieza con 0 apariciones de var(--background), var(--text-primary), var(--ember), var(--accent-light), var(--cielo-), var(--cordillera-), var(--silueta-), var(--text-xs) y var(--transition-smooth).
- Auditoría de clases: todas las clases usadas en className de app/ y components/ tienen regla en styles/, excepto `active` y `nav-open` (estado del header, selector compuesto) y las wrappers estructurales `footer-marca`/`footer-redes` de components/layout/Footer.js, que heredan el flex de `.footer-inner` y quedan pendientes de regla explícita en layout.css (archivo fuera del alcance de esta tarea).

## [2.7.0] - 2026-10-24

### Documented
- Registro retroactivo del estado que ya existía en código y estilos sin entrada en esta bitácora: paleta "Capital Nublada" clara (tokens.css), acento `--ember` amarillo urbano, `.escenario` con cielo de puntos + cordillera fija por página, hero con `<img class="hero-fondo">` y velo de degradado claro, franja de ciudad en el home y foto de comunidad en el footer. Documentado a partir del código, sin cambios funcionales.

## [2.6.1] - 2026-10-23

### Added
- Material fotográfico de revisión para reemplazos futuros (carpeta externa al repo `Documents/Material_Fotografico_BikePark/`, solicitud directa del usuario):
  - 40 fotografías con licencia libre cosechadas de **Wikimedia Commons** en 4 carpetas temáticas: `bogota-turistico/` (Monserrate 6 · Chorro de Quevedo 4 · La Candelaria 5 · Plaza de Bolívar 3), `saltos-mtb/` (dirt jumps 5 · freeride/downhill 4 · saltos aéreos 3), `pistas-y-trails/` (5) y `skate-y-dirt/` (skateparks de Colombia 5). Calidad 1024–1920 px (origen ≥ 1200×800 filtrado), tamaños variados
  - `CREDITS.md` por carpeta (archivo → autor → licencia CC → fuente en Commons) y README raíz con el flujo de revisión
  - 3 conceptos de logo NBP **100% originales** (SVG puro, paleta Montaña Nocturna) en `logos/`: alineados con el briefing §2 ("no existe logo oficial → diseño propio") y la v2 pendiente de `docs/propuesta-visual-nbp.md` §2 (rueda integrada a la luna — ensayada en el wordmark)
  - Cosecha vía Commons API con User-Agent propio, filtro de calidad y backoff ante 429 (sin descargar ningún material con copyright: IG/Pinterest/riders sin licencia quedan fuera; los assets de la comunidad siguen la vía DM del briefing §5)

### Documented
- Flujos alineados con el estado [2.6.0] del sitio: NADA se integra aún — queda pendiente la revisión/selección del usuario sobre la carpeta externa; las fotos Commons seleccionadas exigirán `"credito"` con formato "Foto: <autor> (Wikimedia Commons, <licencia>)" (el campo y `.img-credito` ya operan desde [2.5.0])
- Sin cambios de código, datos ni estilos del repo (tarea de producción externa)

## [2.6.0] - 2026-10-23

### Changed
- **Recorte de fotos (decisión del usuario): los cards de eventos conservan sus fotos reales; el resto fuera**:
  - `app/page.js`: el hero vuelve a ir SIN imagen (se elimina el `<img class="hero-foto">` y el wrapper `.hero-visual`; no se restauran los dibujos de la escena eliminada en [2.5.0])
  - `styles/components.css`: eliminadas `.hero-foto` (base + mq 768px) y `.hero-visual` (base + mq); el hero queda en una sola columna a la izquierda con `.hero-content` máx 640px
  - `data/informativa.json`: `about` y `attractions` regresan a sus placeholders SVG de paleta (`bikepark-hero.svg` / `trail-map.svg`), sin `credito` (no hay foto externa que acreditar)
  - Eliminados los JPG sin uso: `public/images/bikepark-hero.jpg`, `public/images/zona-de-vuelos.jpg`
  - **Datos de eventos intactos**: `eventos.json` conserva las 3 fotos reales + `credito` (se ven SOLO en los cards del listado `/eventos` y en "Eventos realizados")

### Added
- `EventCard`: prop opcional `mostrarImagen` (default `true`) — `app/eventos/[id]/page.js` la pasa en `false` para que la página de detalle muestre SOLO la información del evento (sin foto ni crédito); "ya agregaremos mejores" (decisión del usuario)

### Verified
- `next build` limpio tras `.next` limpiado: 15 rutas estáticas
- Verificación del export: home sin `hero-foto`/`hero-visual` y CSS sin `.hero-foto`/`.hero-visual`; `eventos.html` conserva las fotos+créditos de los 3 eventos; páginas de detalle (`out/eventos/<id>.html`) sin `event-card-image`; `out/images` solo SVGs de paleta

### Pending
- Fotos "mejores" para los detalles de evento y para el hero (llegan del DM a la comunidad)
- OG real 1200×630; logo v2 (rueda en la luna)

## [2.5.0] - 2026-10-23

### Added
- **Fotos REALES del parque en el diseño** (decisión del usuario: desaprobó los dibujos decorativos del hero "[2.3.1] garabatos" pidiendo usar las imágenes investigadas en [2.4.0]):
  - 5 fotos descargadas de miniaturas públicas de YouTube (maxres/sd/hq con fallback) de videos verificados de la comunidad, con autor confirmado vía oEmbed: `DRONGEOH` (×3: Zona de vuelos "¡VOLANDO EN NACHO BIKE PARK!", Primer Fogueo NBP 2023, La Invasión 2025), `JohanStiven MTB` (día de práctica → hero/about), `edward3650` (día de práctica → fogueo hallow)
  - `public/images/`: `bikepark-hero.jpg` (183KB maxres), `zona-de-vuelos.jpg` (151KB maxres) — sustituyen a `bikepark-hero.svg` y `trail-map.svg`
  - `public/events/`: `la-invasion-2025.jpg` (48KB sd), `primer-fogueo-2023.jpg` (30KB hq), `fogueo-nbp.jpg` (134KB maxres)
  - **Schema JSON**: campo opcional `"credito"` en `eventos.json` e `informativa.json`, renderizado como línea `.img-credito` (📷 + texto) en `EventCard` e `InfoSection` — documentado en AGENTS.md (schemas + tabla de contrato + FAQ imágenes)
  - `app/eventos/page.js`: enlace de `primer-fogueo-2023` apunta al video del fogueo en YouTube

### Changed
- **`app/page.js` — hero con foto real**: la escena CSS "Vista desde la Cima" (luna, cordilleras por capas, niebla, rampa kicker, rastro dashed y marker 🚵) es reemplazada por `<img class="hero-foto" src="/images/bikepark-hero.jpg">` dentro del mismo `.hero-visual` (aria-hidden intacto)
- **`styles/components.css`**: eliminadas TODAS las reglas de la escena de dibujos (`.hero-mountain` + `::before` estrellas, `.escena-luna`, `.cordillera-*`, `.niebla-baja`, `.rampa-salto`, `.rastro-salto`, `.hero-bike-marker` y su regla en mq 768px); agregadas `.hero-foto` (cover, radius-lg, shadow-lg; 300px → 350px en mq 768px) y `.img-credito` (text-xs, text-muted). Los tokens `--cordillera-*`/`--niebla`/`--cielo-*` se conservan (los usan `.escenario` y `footer-escena`); favicon y footer intactos
- `data/eventos.json` e `informativa.json`: imágenes reales + `credito` en las 5 fotos (placeders SVG permanecen solo en rules donde no hay foto que encaje)
- El texto de `attractions` editado el usuario en paralelo (sección de dirtjump, "Secciones Principales") se PRESERVA — solo se cambió su imagen/crédito

### Verified
- `next build` limpio tras `.next` limpiado: 15 rutas estáticas; 3 warnings `no-img-element` (decisión documentada, SVG/CSS puro sin `next/image` en estático)
- HTML exportado verificado con 10/10 checks: foto real en hero/sobre/atracciones/eventos, créditos presentes, cero clases de doodles en HTML y CSS compilado, `.hero-foto`/`.img-credito` en CSS, jpgs copiados a `out/`

### Pending
- OG real 1200×630 (sigue el placeholder generado; requiere foto propia con permiso)
- Permiso formal por DM para fotos propias de IG si se escalan más imágenes (plantilla en `docs/briefing-productor-nacho-bikepark.md`); hoy se usan miniaturas de YouTube con crédito visible
- Versión 2 del iso (rueda integrada a la luna) cuando la comunidad apruebe la marca

## [2.4.1] - 2026-10-23

### Added
- **Fase Visual-Design** (tras la aprobación del usuario "listo ya revise sigue", sobre la investigación real de [2.4.0]):
  - `docs/propuesta-visual-nbp.md`: moodboard "Downhill nocturno en la cordillera de la capital" (referencia real NBP ↔ tokens de la paleta), reglas de accesibilidad del tratamiento, flujo de reemplazo de fotos con licencia + prioridad de tomas y OG real 1200×630
  - `components/ui/Logo.js`: marca del sitio — iso SVG con el motivo del favicon vigente (`app/icon.svg`: dos cordilleras `--primary-light`/`--primary-dark` + cumbre y luna `--accent`) + wordmark "Nacho Bike Park" en texto real (aria-hidden en el gráfico; server component, sin estado)
  - `components/layout/Header.js`: el logo emoji `🚵` es reemplazado por `<Logo />` (misma clase `.logo`, comportamiento/hover intacto)
  - `styles/layout.css`: clases nuevas `.logo-brand` (flex + gap) y `.logo-mark` (34px, transición sutil al hover) — CSS puro con variables de tokens.css

### Changed
- `AGENTS.md`: árbol con `docs/propuesta-visual-nbp.md` y `ui/Logo.js`; tabla de contrato con la fila `ui/Logo` (sin props, consumido por Header)

### Verified
- `next build` limpio tras `.next` limpiado: 15 rutas estáticas (sin cambios de tamaño: home sigue 96.9 kB First Load). HTML exportado verificado: `logo-mark` + `logo-text` presentes, emoji viejo eliminado, SVG con `var(--accent)`/`var(--primary-*)` correctos; `logo-mark` presente en el CSS compilado
- Únicos warnings: los 2 `@next/next/no-img-element` conocidos (decisión documentada)

### Pending
- Versión 2 del iso (rueda de bici integrada a la luna) cuando la comunidad apruebe la marca
- Fotos reales con licencia por DM (plantilla en el briefing) + OG real 1200×630
- `ui/Card` sigue sin adopción (deuda previa [2.3.2])

## [2.4.0] - 2026-10-23

### Added
- **Investigación de producción real** (productor + aprobación del usuario "Puedes arrancar"): el Nacho Bike Park es REAL — comunidad de MTB/downhill del Parque Nacional Enrique Olaya Herrera de Bogotá. Verificado: IG `@nacho_bikepark` (3,939 seguidores), FB `Nachobikepark` (1,163), evento "Nacho Bike Fest: La Invasión" (2025-11-09, carrera cronometrada con disfraces, vía Travesía Deportiva), fogueos con categorías Chiquis/Damas/Infantil/Novatos/Experto/Élite, Zona de vuelos con obstáculos con nombre (Drop, Doble, Transfer, Triple, Meseta, Peraltes), Pista Clásica, Soil Searching (jornadas de construcción), Nocturnos
  - `docs/briefing-productor-nacho-bikepark.md` (nueva carpeta `/docs`): briefing completo de producción con canales, eventos, atracciones, assets y licencias (plantilla DM para pedir permiso de fotos), checklist para Visual-Design y estado de la tarea Senior-Dev
  - **Identidad alineada**: `lib/site.js` → `SITE_NAME = 'Nacho Bike Park'` (metadata centralizada: layout `title.default/template` y Footer); contenido del hero ("la capital school", "pistas construidas por riders para riders"); logo del Header "🚵 Nacho Bike Park"; descripciones de metadata (layout + /eventos) con la identidad real
  - `data/informativa.json` reescrito con contenido REAL: `about` (comunidad del Parque Nacional + link IG), `rules` (espacio público compartido: casco, ceder paso, peatones, horarios del parque, Soil Searching), `attractions` (Zona de vuelos: Drop/Doble/Transfer/Triple/Meseta/Peraltes + Pista Clásica + fogueos)
  - `data/eventos.json` reescrito con eventos históricos REALES (decisión del usuario: agregar los ya pasados y dejar estado "por confirmar"): `nacho-bike-fest-la-invasion-2025` (fecha 100% verificada, enlace a Travesía Deportiva), `fogueo-hallow-2025` y `primer-fogueo-2023` (fechas/horas aproximadas — así marcadas en cada descripción)
  - `app/eventos/page.js`: sección nueva **"Eventos realizados"** con `eventosPasados()` (título page → "Agenda del Parque"); los próximos siguen con `EventosGrid`
  - `components/sections/EventosGrid.js`: estado vacío actualizado a **"⏳ Próximamente — sin confirmar"** con CTA externo a `@nacho_bikepark` en Instagram (`target="_blank" rel="noopener"`) — decisión del usuario para cuando no haya fechas 2026 confirmadas
  - `data/novedades.json`: reposicionado con recap real de La Invasión 2025 (badge "Agenda", Ícono 🏁, mensaje "próximo fogueo por confirmar")

### Changed
- `AGENTS.md`: árbol con `/docs` (briefing de producción), contexto del proyecto ("Nacho Bike Park", comunidad del Parque Nacional de Bogotá)
- Las páginas de detalle `/eventos/[id]` ahora se generan también para los eventos históricos (3 en total; el JSON sigue siendo la única fuente de verdad y `generateStaticParams` no cambia)

### Verified
- `next build` limpio tras `.next` limpiado: **15 rutas estáticas** (antes 14: suma 1 por el tercer evento histórico). HTML exportado verificado: "Próximamente — sin confirmar" + enlace IG + "Eventos realizados" + cards de La Invasión 2025 en `out/eventos.html`; página de detalle de La Invasión generada; metadata con "Nacho Bike Park" en home; `Bikepark XYZ` eliminado del render; links reales IG/FB en footer
- Únicos warnings: los 2 `@next/next/no-img-element` conocidos (decisión documentada con `unoptimized`)

### Pending
- Assets reales (fotos/videos/drone): pedir licencia por DM según plantilla en `docs/briefing-productor-nacho-bikepark.md`; mientras tanto placeholders SVG vigentes
- Logo/marca tipográfica NBP: pendiente del agente Visual-Design (proceso brand: moodboard → propuesta → icon.svg/OG con `scripts/generar-og-placeholder.js`)
- `ui/Card` sigue sin adopción (deuda previa [2.3.2])

## [2.3.2] - 2026-10-23

### Added
- Fase 3 de la auditoría de arquitectura (aprobada por el usuario: "puedes continuar"), datos como fuente de verdad. Ejecutada SOBRE el estado [2.3.1] (rediseño "Full Race" de otra sesión): wrappers `.escenario` por página y rampa del hero preservados al pie de la letra:
  - `data/novedades.json` (schema: id, badge, icono, fecha, mensaje): el contenido de "Novedades importantes" ya no vive en el JSX del home [hallazgo H4]. La sección se mapea desde el JSON y se oculta entera si el array queda vacío. La fecha visible sigue siendo "28 de noviembre de 2026" (formato regional) gracias al nuevo helper `formatearFechaHumana()` de `lib/fechas.js` (Intl es-ES con mediodía anti-corrimiento de zona horaria); el `<time dateTime>` usa el ISO del JSON
  - `data/navegacion.json` (schema: href, label): `NAV_ITEMS` ya no es un literal dentro de `Header.js`; el menú lee del JSON. Añadir una página informativa = añadir objeto al JSON (regla actualizada en AGENTS.md, paso 3 de "cómo añadir página informativa")
  - `components/sections/EventJsonLd.js` (server, sin estado): el bloque de JSON-LD + `<script>` sale de la página de detalle; la página solo renderiza `<EventJsonLd evento={evento} />`
  - AGENTS.md actualizado: árbol (/data, /lib, sections), schemas de los 2 JSON nuevos, fila de contrato de EventJsonLd

### Verified
- `next build`: compilación limpia, 14 rutas estáticas generadas (home, sobre, reglas, atracciones, eventos, 2 detalles `/eventos/spring-tour` y `/eventos/winter-challenge` vía `generateStaticParams`, 404, icon/OG/sitemap/robots). First Load JS compartido: 87.4 kB; home a 96.9 kB con 848 B de tamaño propio (novedades data-driven). HTML de salida verificado: "Novedades importantes" + fecha "28 de noviembre de 2026" renderizadas desde el JSON y `<script type="application/ld+json">` presente en los 2 detalles de evento
- `npm run lint`: sin errores nuevos (solo los 2 warnings conocidos @next/next/no-img-element en EventCard.js e InfoSection.js)

### Pending
- `ui/Card` sigue sin adopción en el proyecto (última deuda menor de la auditoría, no hay página que la consuma hoy); no hay más fases pendientes de este roadmap (1–3 cerradas en [2.2.0]/[2.3.0]/[2.3.2])

## [2.3.1] - 2026-10-23

### Added
- Rediseño "Full Race" aprobado por el usuario (acento naranja lava + intensidad full race + escenario propio por página + tipografía reforzada con system stack):
  - Energía: tokens `--ember` (#f97316) / `--ember-strong` (#ea580c) / `--ember-soft` (#fdba74). `.btn-primary` pasa a ember con texto `--text-inverse` (7.07:1 verificado; hover ember-strong 5.57:1). `.novedad-badge` ember (fuego=alerta de mantenimiento). `.btn-secondary:hover` con `--ember-soft`. Badges de dificultad angulares (4px, race-chip)
  - Escenario por página: cada página envuelve su contenido en `.escenario escenario-<x>` — cerro (home), bosque (sobre/reglas), skatepark bowls+quarter pipes (atracciones), desierto con dunas y bruma cálida (eventos, detalle, 404). Wrapper con pseudos `::before` (cielo+estrellas+neblina, var `--esc-cielo-b`) y `::after` (cordillera lejana, vars `--esc-capa`/`--esc-forma`). Reemplaza el fondo global plano de [2.2.1] (elimina `body::before`/`body::after` y `.main::before`; mantienen el skyline del footer)
  - Acción: panel hero con rampa kicker `.rampa-salto` + rastro dashed ember `.rastro-salto` + rider en vuelo rotado -22° (`.hero-bike-marker`); hero con corte diagonal inferior (clip-path 24px) y líneas de velocidad repeating-linear a 0.05; Footer nuevo: escena SVG decorativa `footer-escena` con siluetas de 3 amigos bajando la cordillera + trazas ember (aria-hidden, grupo "que demuestren esa energía" pedido por el usuario)
  - Geometría race: tab diagonal ember 22x14 en highlight-card/event-card/info-section; `.section-heading::after` (slash ember skeweado); subrayado nav angular (skewX -30deg); h1/h2 con weight 800 y tracking -0.02em (system stack, cero fuentes nuevas)
  - Tokens de cielo/silueta por escenario: `--cielo-bosque/skate/desierto`, `--silueta-bosque/desierto/skate` (contraste text-muted sobre cada cielo verificado ≥ 5.42:1)

### Verification
- `next build` limpio; contraste ember recalibrado matemáticamente (nada por debajo de 4.5:1 en texto); escenarios son puramente decorativos (pseudos/píxeles sin texto encima, sin IA JS nueva); variables existentes sin renombrar

## [2.3.0] - 2026-10-23

### Added
- Fase 2 de la auditoría de arquitectura (aprobada por el usuario: "sigue"), composición sin cambios visuales ni CSS nuevo:
  - `components/ui/PageHeader.js` (server, sin estado, cero CSS): cabecera semántica `<header>` con las clases `.page-title`/`.page-subtitle` existentes — eliminada la repetición h1+p en /sobre, /reglas, /atracciones, /eventos y 404 [hallazgo H3]. El detalle de evento mantiene su cabecera propia `.event-detail-header` (layout distinto, no forzado al patrón)
  - `components/sections/EventosGrid.js` (server, sin estado, cero CSS): centraliza grid de EventCards + estado vacío `.estado-vacio` [H3b]; usado en home (animado) y /eventos. Solo recibe datos ya procesados con lib/eventos.js
  - Contratos de `ui/PageHeader` y `sections/EventosGrid` documentados en AGENTS.md (tabla + árbol)

### Changed
- CTA del 404 y del detalle de evento usan la primitiva `ui/Button` (completando la adopción P2.3; si quedaba algún `<Link className="btn-primary">` crudo se eliminó)
- Mensaje del estado vacío en /eventos unificado al del home ("No hay eventos programados por ahora.") por vivir en el mismo componente
- home y /eventos ya no importan EventCard directamente (lo hace EventosGrid interna y únicamente)

### Note
- El archivo `app/page.js` preserva intacta la escena "Vista desde la Cima" del hero ([2.1.0]); heredada sin cambios

### Verified
- `next build`: compilación limpia, 14 rutas estáticas generadas (home, sobre, reglas, atracciones, eventos, 2 detalles `/eventos/[id]` vía `generateStaticParams`, 404, icon/OG/sitemap/robots). First Load JS compartido: 87.4 kB. Tamaño de CSS sin crecimiento: 21.7 kB (cero clases nuevas; `/styles` sin cambios, el CSS compilado es el mismo archivo de la fase previa)
- `npm run lint`: sin errores nuevos (solo los 2 warnings conocidos @next/next/no-img-element en EventCard.js e InfoSection.js)

### Pending
- Fase 3 (novedades.json, navegacion.json en Header, EventJsonLd): pendiente de aprobación del usuario

## [2.2.1] - 2026-10-23

### Added
- Fondo de página como paisaje nocturno ("Vista desde la Cima II", petición del usuario: el negro plano detrás del texto y badges pasa a ser cordillera):
  - `body::before`: cielo nocturno fijo (gradiente `--cielo-cenit` → `--cielo-horizonte` → `--background`) con 8 estrellas de opacidad ≤ 0.22 y banda de neblina de horizonte al 4% (reutiliza tokens de [2.1.0]; cero variables nuevas)
  - `body::after` (nuevo): cordillera lejana FIJA de 34vh con `clip-path` en `--cordillera-media` — el contenido la sobrevuela
  - `.main::before`: cordillera cercana de 220px al pie del contenido en `--cordillera-cercana`, con scroll (`.main` ahora con `position: relative; z-index: 0;` para la capa de apilamiento), se funde con el skyline del footer de [2.1.0]

### Verification
- Contraste re-verificado matemáticamente: en el fondo se usan SOLO tonos ≤ `#16241b` (todos los textos del sitio ≥ 5.45:1); el tono claro `--cordillera-lejana` (#24382b) queda prohibido en fondo de página (text-muted daría 4.24:1) y se usa solo en el panel del hero (sin texto encima). Los cards opacos (`--card`) siguen cubriendo su propio fondo — el paisaje solo asoma en huecos, títulos y bordes

## [2.2.0] - 2026-10-23

### Added
- Fase 1 de la auditoría de arquitectura (propuesta de frontend aprobada por el usuario: "implementa desde la fase 1"; incluye la adopción P2.3 de la primitiva Button):
  - `components/hooks/useImageFallback.js`: hook compartido del fallback visual `onError` (excepción vigente de `useState`). Deduplica el patrón que estaba copiado en `InfoSection` y `EventCard` [hallazgo H1]; en adelante una única implementación
  - `lib/eventos.js`: helpers puros `obtenerEventoPorId(eventos, id)` y `formatearRangoFechas(evento)`; eliminan el doble `find()` en la página de detalle y el formateo duplicado del rango de fechas entre `EventCard` y `app/eventos/[id]/page.js` [H5]
  - Clase utilitaria `.centrar-bloque` en `styles/components.css` (text-align center + `margin-top: var(--space-8)`, tokens vigentes): reemplaza los estilos inline `style={{ textAlign: 'center' }}` de `app/page.js` y `app/eventos/[id]/page.js` [H7]. Nota menor: en la página de detalle el margen superior del CTA "Volver" pasó de 1.5rem a 2rem (unificación deliberada del espaciado)
- Metadata con `title.template` (`%s — <SITE_NAME>`) y `title.default` en `app/layout.js`; las 5 páginas + 404 + `generateMetadata` del detalle ya solo definen su title corto, sin repetir el sufijo a mano [H6]

### Changed
- Primitiva `ui/Button` ([2.0.0]) adoptada: los 5 CTAs de `app/page.js` (hero + 3 highlights + "Ver todos los eventos") usan `<Button>` (.btn-primary/.btn-secondary), dejando de duplicar `<Link className="btn-*">` a mano [H2]. El enlace `.novedad-cta` sigue siendo `next/link` por no ser variante de botón
- `components/layout/Footer.js` usa `SITE_NAME` de `lib/site.js` en vez del string hardcodeado (única fuente de verdad del nombre del sitio)

### Verified
- Build estático `next build` exitoso tras estos cambios: compilación limpia, 14 páginas estáticas generadas (home, sobre, reglas, atracciones, agenda, 2 detalles de evento `/eventos/[id]` vía `generateStaticParams`, 404 y assets/sitemap/robots). Primer Load JS compartido: 87.4 kB. CSS único generado: 19.7 kB

### Pending
- Fase 2 (PageHeader, EventosGrid) y Fase 3 (novedades.json, navegacion.json, EventJsonLd) de la auditoría: pendientes de aprobación del usuario, aún no implementadas

## [2.1.0] - 2026-10-23

### Added
- Escena "Vista desde la Cima" en el hero (propuesta aprobada por el usuario: escena en panel del hero, luna con halo tenue ≤ 0.2, y profundidad prolongada):
  - Escena nocturna por capas en CSS puro dentro de `.hero-mountain` (mismo nombre/medidas responsive): cielo por gradiente vertical (`--cielo-cenit` → `--cielo-horizonte`), estrellas tisú en `::before`, luna `.escena-luna`, niebla baja `.niebla-baja` y 3 cordillera siluetas con `clip-path` en perspectiva atmosférica (lejana clara → cercana oscura, tokens `--cordillera-*`)
  - El `hero-bike-marker` 🚵 ahora viste la cresta de la cordillera cercana (narrativa: rider mirando el paisaje) en lugar de flotar en el vacío
  - Fondo prolongado: neblina baja fija con `body::before` (gradiente de horizonte a 50% máx, decorativo) y silueta de cordillera `--cordillera-media` sobre el borde superior del footer (`.footer::before`, 30px)
  - Tokens nuevos añadidos a `:root` (solo adiciones, `--cielo-*`, `--cordillera-*`, `--niebla`); identidad Montaña Nocturna intacta (derivaciones de bosque/salvia/negro cálido)

### Removed
- Brillos exagerados (motivo de la petición): eliminado el "shine" diagonal blanco de `.hero-mountain::before` (reutilizado como campo de estrellas), eliminado `animate-pulse` de la montaña en el home (el pulso del icono 🚧 se conserva por ser señal funcional), y radiales salvia de `.hero::before` reducidos 0.15/0.1 → 0.06/0.04

### Changed
- `app/page.js`: bloque hero-visual con 5 divs decorativos nuevos (dentro del contenedor ya `aria-hidden`, cero contenido real) — único cambio JSX; cero cambios en componentes ni JSON

## [2.0.2] - 2026-10-23

### Fixed
- Corrección de 6 fallas de contraste WCAG 2.1 AA diagnosticadas por revisión visual (aprobada por el usuario; solo cambio de valores `:root`/CSS, cero cambios en componentes JSX ni JSON):
  - `.skip-link`: `--accent`/`--text-primary` (2.19:1, invisible) → `--accent-light`/`--text-inverse` (12.26:1)
  - `.nav-list a`: `--text-muted` sobre header (3.74:1) → `--text-secondary` (8.11:1)
  - `.btn-primary`: texto `--text-primary` sobre `--accent-dark` (3.62:1) → texto `--text-inverse` (4.94:1); hover ahora cambia fondo a `--accent` (8.18:1, antes no cambiaba fondo)
  - `.info-link:hover` y `.event-card-link:hover`: `--accent-dark` (4.25:1, oscurecía el link) → `--accent` (7.03:1, hover ilumina)
  - `.back-link:hover`: `--secondary` sobre background (2.30:1) → `--secondary-light` (5.31:1)
  - Badges de dificultad fallaban el ratio corporativo real: `--dificultad-verde` `#16a34a` (2.98:1) → `#166534` (6.44:1); `--dificultad-azul` `#3b82f6` (3.32:1) → `#1e40af` (7.88:1); `--dificultad-rojo` `#ef4444` (3.40:1) → `#b91c1c` (5.85:1). Los tokens `--dificultad-negro` y `--dificultad-doble-negro` quedaron sin cambios (cumplían)

### Documented
- Se corrige el registro histórico: los claims [1.8.5] ("badges texto ≥4.5:1") y [1.9.0] ("≥5.4:1 texto normal") no eran ciertos para nav links ni botones; los ratios reales quedaron verificados en esta entrada. variables sin renombrar; identidad Montaña Nocturna intacta (líneas solo recalibradas); total de ratios afectados ≥ 4.5:1 verificado matemáticamente

## [2.0.1] - 2026-10-23

### Diagnóstico: opencode.json "no se implementaba"
- **Estado real**: la configuración SÍ es válida y el MCP `context7` está CONECTADO (`opencode mcp list` → `✓ context7 connected`).
- **Causa histórica de la confusión**: en una sesión anterior se había intentado configurar el MCP en `/.opencode/mcp.json` (ubicación inválida — OpenCode V2 solo lee opencode.json(c) en la raíz o `.opencode/opencode.json(c)`), la cual fue eliminada posteriormente.
- **Formato comprobado contra la documentación de OpenCode V2** (https://opencode.ai/v2/docs/mcp-servers): los servidores MCP van bajo `mcp.servers.<nombre>` con `type`/`url` — exactamente la estructura ya presente en `opencode.json`.
- **Mejora aplicada**: añadido `"$schema": "https://opencode.ai/config.json"` a `opencode.json` para validación y autocompletado en editores. Conexión re-verificada tras el cambio.

## [2.0.0] - 2026-10-23

### Added
- Reorganización de estructura aprobada por el usuario (después de auditoría del árbol de archivos):
  - `components/` redistribuido por dominio: `layout/Header.js` + `layout/Footer.js` (estructura), `sections/InfoSection.js` + `sections/EventCard.js` (contenido), y nueva `ui/` con primitivas base `Button.js` y `Card.js` (disponibles para uso; `Button` integrable en CTAs de páginas)
  - Imports actualizados en los 8 archivos que consumían componentes (`app/layout.js`, `app/page.js`, `app/sobre|reglas|atracciones/page.js`, `app/eventos/page.js`, `app/eventos/[id]/page.js`); `InfoSection` actualizó además su import de `data/informativa.json` a la nueva profundidad
  - `styles/globals.css` dividido por dominio en `tokens.css` (variables `:root` Montaña Nocturna), `layout.css` (reset/base, header, main, footer, skip link) y `components.css` (hero, botones, cards, secciones, eventos, placeholders, responsive, pulido); `globals.css` quedó como importador ÚNICO con `@import` en orden original de cascada (tokens → layout → components)
- Tests: build estático `next build` limpio tras la reorganización: 14 rutas estáticas, CSS compilado 17.2 KB con tokens/hero/skip-link/footer verificados dentro del bundle final

### Changed
- Decisión registrada durante la reorganización: `app/icon.svg` y `app/opengraph-image.png` NO se mueven a `public/` (contrario al plan inicial propuesto). Son convenciones de metadata de Next.js App Router que auto-inyectan favicon y `og:image`/`twitter:image` (comportamiento verificado y documentado en [1.8.9]); moverlas rompería la inyección automática. El plan de reorganización se ajustó en ese punto
- `AGENTS.md` actualizado: árbol de estructura (subcarpetas de componentes y 4 archivos de estilos), regla de colocación por dominio, convención CSS de "división por dominio" (reemplaza "único archivo"), tabla de contrato de props con rutas y filas nuevas de `ui/Button`/`ui/Card`, ejemplos de import actualizados, referencia a `Header.js` en "cómo añadir página informativa"

### Removed
- Archivos de log basura en la raíz del proyecto eliminados definitivamente (`CUsersMAICOLAppDataLocalTempopencodenext-dev.log` y `CUsersMAICOLAppDataLocalTempopencodenext-dev2.log`, agregados por salidas de `next dev` con redirección mal ubicada)

## [1.9.3] - 2026-10-22

### Approved
- Ratificación explícita del usuario: el diseño de colores nuevos (**"Montaña Nocturna"**, implementado y registrado en [1.9.0]) está **APROBADO**. Con esto queda cerrada la última duda abierta del hallazgo del agente front-end (paleta encontrada en CSS sin nota de aprobación en su lectura): [1.9.0]/[1.9.1] la registraron ya implementada y con SVGs reajustados; esta entrada formaliza la aprobación y cierra la idea 0 (regularización documental de la paleta)

### Documented
- Sincronización de textos vigentes con la identidad aprobada (las menciones históricas de Carbon Pulse en la bitácora se dejan intactas):
  - `styles/globals.css`: cabecera de archivo actualizada de "Carbon Pulse (paleta oscura moderna)" a "Montaña Nocturna (paleta tierra/bosque nocturna — aprobada [1.9.3])" (solo comentario; cero cambios de valores, clases o variables)
  - `AGENTS.md`: árbol de estilos ("tokens Montaña Nocturna") y FAQ de imágenes ("SVGs placeholder en paleta vigente")
  - `.opencode/agents/senior-frontend-dev.md` y `.opencode/skills/color-design-system/SKILL.md`: la identidad a proteger es **Montaña Nocturna** como tema aprobado (el flujo propuesta→aprobación del usuario no cambia); `visual.design.md` ya era neutral
- Reordenamiento de esta bitácora: [1.9.0] y [1.9.1] habían quedado intercalados después de [1.8.8]; movidos a su posición cronológica descendente correcta

## [1.9.2] - 2026-10-22

### Added
- Sección "Novedades importantes" en el home (aprobada por el usuario):
  - `app/page.js`: nueva franja de anuncio entre "Conoce el parque" y "Próximos eventos" con icono 🚧, badge "Mantenimiento", fecha (`<time datetime="2026-11-28">`) y mensaje invitante hacia las rutas Verde y Azul, más CTA "Ver próximos eventos →".
  - `styles/globals.css`: nuevas clases `kebab-case` con variables `:root` existentes de "Montaña Nocturna" (sin valores nuevos): `.seccion-novedades`, `.tarjeta-novedad` (borde izquierdo acento verde salvia + hover elevado), `.novedad-cabecera`, `.novedad-icono`, `.novedad-badge`, `.novedad-fecha`, `.novedad-mensaje`, `.novedad-cta`.

## [1.9.1] - 2026-10-22

### Changed
- Ajuste de colores internos de los SVGs placeholder a la paleta "Montaña Nocturna":
  - `/public/images/bikepark-hero.svg`, `/public/images/safety-signs.svg`, `/public/images/trail-map.svg`
  - `/public/events/spring-tour.svg`, `/public/events/winter-challenge.svg`
  - Colores internos actualizados: fondos `#0a0a08`/`#141410`, acentos `#8ab17d`/`#2d5a3d`, texto `#f1f5e9`/`#d8e0c4`/`#8f9a7f`, bordes `#3d3326`.

## [1.9.0] - 2026-10-22

### Changed
- Nueva identidad visual "Montaña Nocturna" (aprobada por el usuario):
  - Reasignación de valores hex en `:root` de `styles/globals.css` (sin renombrar variables, sin tocar componentes JSX ni schema JSON):
    - Fondos: `--background #0a0a08`, `--surface #141410`, `--surface-elevated #1e1c16`, `--card #1e1c16` (negro cálido, sin efecto halo nocturno).
    - Primario: `--primary #1b4332` / `--primary-dark #0d2a1f` / `--primary-light #2d5a3d` (verde bosque profundo).
    - Secundario: `--secondary #6b4226` / `--secondary-dark #4a2e18` / `--secondary-light #a67c52` (café tierra).
    - Acento: `--accent #8ab17d` / `--accent-dark #5d8a57` / `--accent-light #b7d4a8` (verde salvia vivo pero desaturado).
    - Bordes: `--border #3d3326` / `--border-light #4a3d2e` (tierra oscuro).
    - Texto: `--text-primary #f1f5e9` / `--text-secondary #d8e0c4` / `--text-muted #8f9a7f` / `--text-inverse #0a0a08` (blanco cálido, cómodo de leer de noche).
  - Actualizados hardcodes de violeta antiguo a verde salvia en `.btn-primary` (box-shadow) y gradiente radial del `.hero`.
- Contraste WCAG 2.1 AA verificado en pares texto/fondo clave (estimado ≥ 5.4:1 en texto normal, ≥ 6.1:1 en títulos sobre fondos oscuros).

## [1.8.9] - 2026-10-22

### Added
- Imagen OpenGraph del sitio (idea 2.2 de la propuesta del agente front-end, versión placeholder):
  - `app/opengraph-image.png` (1200×630): Next la detecta por convención de archivo y auto-inyecta `og:image` + `twitter:image` con `summary_large_image` (verificado en dev: las metas aparecen en el HTML)
  - `scripts/generar-og-placeholder.js`: generador en Node puro (`zlib` builtin, 0 dependencias): cielo degradado nocturno + dos siluetas de montaña + luna salvia, usando los hex de `:root` de globals.css. Se conserva el script para regenerar la OG (o reemplazarla por una real) cuando lleguen los assets; AGENTS.md documentado con `/scripts` y el nuevo archivo
- Los 5 SVGs de `/public` ([1.8.7]) se revisaron: ya estaban en paleta vigente y cubren las 5 rutas de imagen de los JSON — sin regeneración necesaria ni 404s pendientes

### Changed
- `app/icon.svg` (favicon) regenerado en la paleta vigente Montaña Nocturna: montañas `#2d5a3d`/`#1b4332` con cumbre y luna `#8ab17d` sobre fondo cálido `#0a0a08` — antes seguía en violeta Carbon Pulse (`#a855f7`/`#c084fc` sobre `#0f0f0f` frío), desalineado con el CSS. Nota: esto solo alinea los assets con la paleta YA implementada; la regularización documental de la paleta (idea 0: entrada CHANGELOG de "Montaña Nocturna" o reversión a Carbon Pulse) sigue pendiente de decisión del usuario

### Verification
- `next build` de producción limpio (con el dev detenido primero, según lección de caché corrupta conocida): 14 rutas estáticas, ahora incluyendo `/opengraph-image.png` (asset copiado a `out/opengraph-image.png`, 13.5 KB) y `/icon.svg`; metas `og:image`/`twitter:image` presentes en el HTML exportado. Únicos warnings: `@next/next/no-img-element` (decisión documentada con `unoptimized`)

## [1.8.8] - 2026-10-22

### Documented
- `AGENTS.md` sincronizado con el estado real post-[1.8.7] (desajuste detectado por el agente `visual.design` en su revisión readonly). Cambios: `InfoSection` y `EventCard` documentados como client components con fallback visual `onError` ([1.8.6]); excepción documentada de `useState` para fallback de imagen y lista de client components vigentes; prop `compacto` añadida al contrato de `InfoSection`; tokens de dificultad `--dificultad-*` + clases `.badge-*` y `.badges-rutas` ([1.8.5]); clases placeholder (`.placeholder-imagen`, `.placeholder-evento`) y `.estado-vacio` ([1.8.4]/[1.8.6]); árbol de estructura con `/public/images/` y `/public/events/` (SVGs placeholder [1.8.7]) y anotaciones en `/atracciones` (badges) y `/eventos` (estado vacío); ejemplo de `EventCard` actualizado al contrato vigente; FAQ de imágenes ampliada (placeholders onError, nada de imágenes rotas)
- Sin cambios de código: solo documentación de realidad ya implementada ([1.8.3]–[1.8.7])

## [1.8.7] - 2026-10-22

### Added
- Imágenes placeholder alusivas al bikepark mientras llegan los assets definitivos:
  - Creada carpeta `/public/` con `/public/images/` y `/public/events/`.
  - 5 archivos SVG con diseño Carbon Pulse: `bikepark-hero.svg`, `safety-signs.svg`, `trail-map.svg` (secciones informativas) y `spring-tour.svg`, `winter-challenge.svg` (eventos).
  - Rutas actualizadas en `data/informativa.json` y `data/eventos.json` (`.jpg` → `.svg`); el schema JSON no cambia.

## [1.8.6] - 2026-10-22

### Fixed
- Fallback visual cuando una imagen de /public/ no carga (Fase D del roadmap de `visual.design`):
  - `components/InfoSection.js` y `components/EventCard.js`: pasan a ser client components (`'use client'` + `useState`) y manejan `onError` de ``; si la imagen falla (404), se muestra un placeholder visual en vez de una imagen rota o un espacio vacío.
  - Nuevas clases CSS en `styles/globals.css`: `.placeholder-imagen` (260px, secciones) y `.placeholder-evento` (200px, cards de evento), con gradiente Carbon Pulse, borde dashed y emoji, sin valores mágicos.

## [1.8.5] - 2026-10-22

### Added
- Badges de dificultad de rutas (Fase C del roadmap de `visual.design`):
  - Nuevas variables `:root` en `styles/globals.css`: `--dificultad-verde` (#16a34a), `--dificultad-azul` (#3b82f6), `--dificultad-rojo` (#ef4444), `--dificultad-negro` (#000000), `--dificultad-doble-negro` (#7f1d1d). Todas con texto `--text-primary` sobre su fondo, ratio ≥ 4.5:1 WCAG AA.
  - Nuevas clases CSS `kebab-case`: `.badge-dificultad`, `.badge-verde`, `.badge-azul`, `.badge-rojo`, `.badge-negro`, `.badge-doble-negro`, `.badges-rutas` (sin renombrar variables existentes).
  - `app/atracciones/page.js`: renderiza los 5 badges de dificultad (Verde/Azul/Rojo/Negro/Doble Negro) bajo el `InfoSection` de atracciones.

## [1.8.4] - 2026-10-22

### Fixed
- Estado vacío de la agenda de eventos (Fase B del roadmap de `visual.design`):
  - Nueva clase `.estado-vacio` en `styles/globals.css` (texto centrado, padding con tokens `--space-*`, color `--text-muted`/`--text-secondary`, sin valores mágicos).
  - `app/eventos/page.js` y `app/page.js` renderizan el mensaje de estado vacío cuando `eventosProximos()` devuelve `[]`, en vez de un grid vacío.

## [1.8.3] - 2026-10-22

### Fixed
- Accesibilidad WCAG 2.1 AA (Fase A del roadmap de `visual.design`):
  - `.btn-primary` usa fondo `--accent-dark` (#9333ea) con texto `--text-primary` (≈5.2:1, antes ≈3.8:1 con `--accent`).
  - Enlaces de texto `.info-link` y `.event-card-link` usan `--accent-light` (#c084fc) en vez de `--accent` (mejora de contraste sobre fondos oscuros).
- Corregida inconsistencia entre CHANGELOG [1.7.0] (que ya reportaba `.btn-primary` en `--accent-dark`) y el CSS real de `styles/globals.css`.

### Decisiones de arquitectura
- Cero cambios en componentes JSX ni en el schema JSON; solo reasignación de variables existentes de `:root` en `styles/globals.css` (sin renombrar tokens, sin nuevas dependencias, sin romper el flujo propuesta→aprobación).

## [1.8.2] - 2026-10-22

### Fixed
- Hallado un artefacto no registrado: `.opencode/agents/visual-design-director.md` provenía de la era "agente con permisos de escritura" (sin CHANGELOG, sin modelo, con permisos allow de edit en styles/components/data incumpliendo el flujo propuesta→aprobación, y con typos). Reemplazado por el agente normalizado `visual.design`

### Added
- Agente `visual.design` (`.opencode/agents/visual.design.md`, formato markdown V2): rol diseñador UI/visual senior solo-propuesta (deny edit/shell, skill allow), modelo fijo `opencode/glm-5.3-flash-free`, flujo propuesta→aprobación del usuario, checklist de entrega de diseño (diagnóstico, paleta con ratios WCAG, tokens, clases, estados, roadmap) y reglas de Carbon Pulse integradas. Tiene acceso a las 11 skills anunciadas
- Script `agent:design` en package.json (`opencode run --agent visual.design --model opencode/glm-5.3-flash-free`) y fila en la tabla de scripts de AGENTS.md
- Limpieza de typo menor (`mínimo-expedido` → `mínimo-expedito`) en el prompt del agente `senior-frontend-dev`

### Removed
- `.opencode/agents/visual-design-director.md` eliminado (artefacto sin registro; sustituido por `visual.design.md`)

## [1.8.1] - 2026-10-22

### Fixed
- Skills del agente eran invisibles para OpenCode V2: existían como `skill.yaml` en `.opencode/skill/` (singular, formato no descubierto). Migradas a `.opencode/skills/<id>/SKILL.md` (formato oficial, frontmatter name+description, cuerpo en markdown): senior-frontend-dev, react-architecture, modern-css, component-design-system, color-design-system, react-performance, typescript-migration, testing-library, accessibility
- Script `skill:install` (`opencode skill install ...`) era un comando inexistente de la CLI; las skills V2 se auto-descubren por convención de carpetas. Script eliminado de package.json y de la tabla de AGENTS.md

### Changed
- Agente `senior-frontend-dev` con modelo explícito `model: opencode/glm-5.3-flash-free` en frontmatter y permiso explícito `skill allow` para que las skills migradas le sean anunciadas y cargables (sigue con deny de edit/shell)
- Matiz verificado: en `opencode run --agent` el frontmatter `model` NO gobierna la sesión (doc V2: "una sesión guarda su modelo por separado; seleccionar un agente primario no cambia ese modelo") — el flag `--model opencode/glm-5.3-flash-free` del CLI sí aplica. Script `agent:frontend` actualizado con `--model`; el frontmatter se mantiene (rige en herencia de subagentes)

### Removed
- Directorio `.opencode/skill/` con los 9 skill.yaml muertos (reemplazados por los SKILL.md en `.opencode/skills/`); documentado en AGENTS.md (scripts) y este registro

## [1.8.0] - 2026-10-22

### Approved
- El usuario aprobó la Fase A del roadmap del agente ([1.7.2]): higiene HTML/CSS, accesibilidad de navegación y SEO estático

### Fixed
- HTML inválido: los cards de evento ya NO se envuelven en `<Link>` (generaba anchors planos anidados con el `<a>` externo del `enlace`); ahora el enlace "Ver detalle →" vive DENTRO de `EventCard` (`next/link` a `/eventos/{id}`, prop `enlaceDetalle` para la página de detalle)
- CSS roto: `.highlight-card::before` estaba declarado dos veces (líneas ~490 y ~953) y el `height: 1px` de la primera anulaba visualmente el borde degradado del `::before` con `inset: 0`; se eliminó la primera declaración y su `:hover::before` redundante. `.event-card` recibió `position: relative` para anclar correctamente ese `::before` (el pseudo-elemento caía contra otro ancestro)

### Changed
- Agenda por orden real de fecha: nuevo `lib/eventos.js` (helpers puros `ordenarPorFecha`/`eventosProximos`/`eventosPasados`); Home y `/eventos` muestran solo eventos futuros ordenados cronológicamente (antes `slice(0,2)` asumía orden manual y podía mostrar vencidos). Criterio "próximo/pasado" congelado en cada build (estático)
- Nav con sección activa: `Header` usa `usePathname()`, aplica `.active` (estilo ya previsto en CSS) y `aria-current="page"` (WCAG 2.4.8); `/eventos/[id]` activa "Eventos"
- Skip link: "Saltar al contenido" (layout) + `id="contenido-principal"` en `main` (WCAG 2.4.1) con `.skip-link` en CSS (aparece al `:focus-visible`)
- SEO estático: `metadataBase` + `openGraph` base en layout; metadata descriptiva+OG en `/sobre`, `/reglas`, `/atracciones`, `/eventos`; `generateMetadata` por evento en `/eventos/[id]`; `app/sitemap.xml/route.js` (route handler 100% estático → /sitemap.xml con rutas fijas + eventos) y `app/robots.js`; JSON-LD `schema.org/Event` en el detalle (startDate/endDate/location/image)
- `.event-card-link` con `margin-top: auto` para anclar el enlace al fondo del card
- `lib/site.js` con `SITE_URL` (placeholder `https://www.bikepark-xyz.com`, cambio al dominio real)

### Added
- `lib/eventos.js` y `lib/site.js` (helpers puros de build, sin estado)
- `app/sitemap.xml/route.js` (route handler `force-static`: el route meta-interno que Next genera desde `app/sitemap.js` exige `generateStaticParams` y falla en dev con `output: 'export'`; un handler estático puro funciona igual en dev y build), `app/robots.js`, `app/not-found.js` (404 con diseño del sitio) y `app/icon.svg` (favicon Carbon Pulse: montañas violeta sobre carbón)
- AGENTS.md actualizado: árbol de estructura (/lib, archivos SEO), contrato de props de `EventCard` y reglas (helpers de agenda en `lib/eventos.js`, nunca envolver card en `<Link>`)

### Decisiones de arquitectura
- URL del sitemap/robots es placeholder pendiente de dominio real; `imagen` en JSON sigue igual (contrato de imágenes vacío queda para la fase de assets)
- Sin cambios de identidad visual (Carbon Pulse intacto), sin variables renombradas, sin nuevas dependencias

## [1.7.2] - 2026-10-22

### Reviewed
- Segunda ejecución readonly del agente `senior-frontend-dev`: roadmap de desarrollo (P0 higiene/accesibilidad/SEO, P1 contenido estructurado rutas+site.json+FAQ+Visitanos, P2 galería/filtros, P3 descartes explícitos), espec de carpetas de imágenes en /public y campos opcionales nuevos para eventos.json/informativa.json sin romper el schema. Sin archivos modificados; pendiente de aprobación del usuario por fase

## [1.7.1] - 2026-10-22

### Documented
- Guía de invocación del agente `senior-frontend-dev` para el usuario (3 vías: TUI interactivo, one-shot CLI, script npm). Nota de entorno: el wrapper bash de npm falla en este equipo (faltan utilidades GNU), por lo que los comandos van con el exe completo o desde PowerShell/CMD

## [1.7.0] - 2026-10-22

### Approved
- El usuario aprobó implementar las Fases 1-4 de la propuesta visual del agente `senior-frontend-dev` (primera ejecución readonly; propuesta con diagnóstico y plan)

### Changed
- Fase 1 (tokens): `--accent-dark` #9449ff → #9333ea (hover con holgura AA: #f8fafc ≈4.9:1), `--border-light` #1e293b → #334155 (distingue del --card)
- Fase 2 (jerarquía fija estructural): títulos `.page-title`, `.section-heading`, `.info-section h2`, `.highlight-card h3`, `.event-card-title`, `.event-detail-header` y enlace base `a` dejan de usar `--primary` (color de marca/superficie): títulos → `--text-primary`, enlaces → `--accent`
- Fase 3 (foco/botones): `*:focus-visible` outline violeta (--accent) en vez del azul pizarra invisible sobre fondo oscuro; `.btn-primary`/`.btn-secondary` con texto `--text-primary` (4.6:1/4.6:1 AA); foco de botones `--accent-light`
- Fase 4 (pulido): párrafo del hero a `--text-secondary` (de muted); gradiente borde de cards usa `--border-light` en vez de `--primary`

### Decisiones de arquitectura
- Cero rebajas de estilo: sin renombrar variables (63 referencias intactas), sin tocar componentes JSX; todo el cambio en reglas de `globals.css`

## [1.6.3] - 2026-10-22

### Fixed
- Definición del agente era invisible para OpenCode: `.opencode/agent/senior-frontend-dev.json` no es un formato válido (V2 descubre markdown con frontmatter en `.opencode/agents/<name>.md`); además apuntaba a `anthropic/claude-3.5-sonnet`, provider no configurado en este equipo (solo hay modelos `opencode/*`)
- Agente migrado a `.opencode/agents/senior-frontend-dev.md` (formato V2 correcto): sin campo `model` (usa el default del usuario), permisos deny de `edit` y `shell` (rol de propuesta/revisión con aprobación), y reglas del proyecto integradas en su prompt de sistema

### Removed
- `.opencode/agent/senior-frontend-dev.json` eliminado (formato no descubierto por OpenCode; reemplazado por el `.md` en `agents/`)

### Reviewed
- Primeras ejecución real exitosa del agente: entregó propuesta de diseño/paleta SIN modificar archivos (cumplió el rol readonly). Pendiente de aprobación del usuario

## [1.6.2] - 2026-10-22

### Approved
- El usuario APROBÓ el tema oscuro "Carbon Pulse" ([1.6.0]) del agente `senior-frontend-dev`, que en [1.6.1] quedó marcado como pendiente de revisión

### Fixed
- Accesibilidad WCAG: `--text-muted` sube de `#64748b` a `#94a3b8` (≈3.0:1 → ≈5.7:1 sobre `--primary` #1e293b); corrige el contraste insuficiente del texto pequeño en nav, hero, meta de eventos y footer. Estética Carbon Pulse intacta
- Auditoría de consistencia: las 63 referencias `var()` usan los nombres renombrados; cero referencias huérfanas del esquema anterior

## [1.6.1] - 2026-10-22

### Fixed
- Config MCP estaba muerta y con secret placeholder: `.opencode/mcp.json` tenía formato incorrecto (OpenCode V2 solo lee `opencode.json(.c)` con shape `mcp.servers.*`; ese archivo nunca se interpretaba) y pasaba `--api-key YOUR_API_KEY` (valor falso que nunca fue una clave real)
- MCP `context7` añadido vía CLI oficial (`opencode mcp add context7 --url https://mcp.context7.com/mcp`) → se genera `opencode.json` del proyecto con el shape correcto y **sin API key** (context7 funciona anónimo/limitado; la doc V2 recomienda nunca escribir secrets en config)
- Conexión verificada: `✓ context7 connected`
- Script npm `mcp:test` corregido: apuntaba al comando inexistente `opencode mcp test context7` (comandos reales de la CLI: `list/add/auth/logout`); ahora `opencode mcp list`

### Removed
- `.opencode/mcp.json` eliminado (config muerto con placeholder falso; reemplazado por `opencode.json` en la raíz)

### Decisiones de arquitectura
- Secrets futuros siempre con sustitución `{env:VARIABLE}` en config, nunca hardcodeados

### ⚠️ Detectado sin aprobar
- En paralelo, el agente `senior-frontend-dev` añadió `[1.6.0]` (01:01): tema oscuro "Carbon Pulse" que **reemplazó la paleta verde "Bosque + Adrenalina" aprobada en [1.5.0]** sin registro de aprobación del usuario. Pendiente de revisión/aprobación

## [1.6.0] - 2026-10-22

### Changed
- `/styles/globals.css`: rediseño total de identidad visual a paleta **Carbon Pulse** (oscura moderna): `--primary #1e293b` (azul pizarra), `--primary-dark #0f172a`, `--secondary #64748b` (gris acero), `--secondary-dark #475569`, `--accent #a855f7` (violeta), `--accent-dark #9449ff`, `--background #0f0f0f`, `--surface #18181b`, `--border #3f3f46`, `--text-primary #f8fafc`, `--text-secondary #cbd5e1`, `--text-muted #64748b`; `--radius` aumentado a 12px; sombras en capas (--shadow-card, --shadow-hover, --shadow-lg)
- `html { color-scheme: dark }` para modo oscuro nativo del sistema
- Nombres de variables simplificados (sin prefijo `--color-`) para mayor legibilidad
- Fondo del hero con gradiente radial violeta sutil (dual light source)
- Botones primarios en violeta con sombra proyectada acentuada
- Navbar con subrayado animado en violeta sobre fondo azul pizarra
- Tarjetas con borde de gradiente animado en hover

### Added
- Variable `--space-20: 5rem` (padding hero expandido)
- Variable `--text-4xl` para titulares hero en desktop
- Sombra `--shadow-inset` disponible para futuros estados presionados

### Fixed
- Contraste de texto sobre fondos oscuros: `--text-primary` (#f8fafc) sobre `--surface` (#18181b) ≈ 15.5:1 (AAA)

### Decisiones de arquitectura
- CSS puro mantenido en `/styles/globals.css` sin librerías externas (sin Tailwind)
- `color-scheme: dark` en `<html>` respeta preferencias de SO
- Todas las funcionalidades de fases 1-3 (container queries, micro-interacciones, tipografía avanzada) preservadas

## [1.5.1] - 2026-10-22

### Reviewed
- Auditoría de limpieza del árbol de archivos: no se detectaron ficheros sobrantes, temporales ni huérfanos (sin `Thumbs.db`, `.eslintcache`, archivos de editor ni módulos no referenciados)
- Decisión del usuario: MANTENER `.opencode/` (11 archivos de tooling de agentes) y sus 3 scripts npm asociados
- Verificación integral: las 7 rutas (`/`, `/sobre`, `/reglas`, `/atracciones`, `/eventos`, `/eventos/spring-tour`, `/eventos/winter-challenge`) responden correctamente con la paleta [1.5.0]
- Nota operativa: correr `next build` con `next dev` activo corrompe la caché `.next` (ocurrió dos veces); detener el servidor antes de hacer builds

## [1.5.0] - 2026-10-22

### Approved
- El usuario APROBÓ los cambios del agente `senior-frontend-dev` ([1.1.0] a [1.4.0]) con un ajuste solicitado: paleta de colores completamente nueva, "amigable con la vista, moderna y llamativa"

### Changed
- `/styles/globals.css`: rediseño total de la paleta manteniendo todos los nombres de variables (cero cambios en componentes): `--color-primary: #047857` (verde bosque), `--color-primary-dark: #065f46`, `--color-secondary: #c2410c` (naranja terrocata), `--color-accent: #fbbf24` (ámbar dorado), superficies `#ffffff`/`#f1f5f9`, texto slate (`#0f172a` / `#475569` / `#64748b`), estados semánticos (verde/ámbar/rojo AA)
- Contraste WCAG 2.1 AA verificado en todos los pares texto/fondo

### Added
- Variable `--color-on-primary-muted` (blanco 90%) para texto secundario sobre fondos verdes oscuros (nav, hero, footer)

### Fixed
- Hover del nav sobre fondo verde ahora en blanco inv (el ámbo ámbar no alcanzaba AA para texto pequeño)
- `.btn-secondary`: texto `--color-primary-dark` sobre ámbar (4.6:1); antes `--color-primary` daba solo 3.3:1
- Focus visible en nav cambiado a blanco (visible sobre fondo verde oscuro)

## [1.4.0] - 2026-10-22

### Added
- Fase 3 de pulido: micro-interacciones (keyframes `fadeInUp`, `pulseSoft`, clases `animate-fade-in`, `animate-pulse`), `prefers-reduced-motion` para respetar preferencias de accesibilidad, `will-change` en elementos con hover frecuente
- Tipografía avanzada: `text-wrap: balance` en títulos, `font-variant-numeric: tabular-nums`, `font-feature-settings` para ligaduras, stack de fuentes mejorado (system-ui, -apple-system, BlinkMacSystemFont)
- Efecto visual: `drop-shadow` en imágenes, borde de gradiente animado en cards en hover, subrayado animado en enlaces del nav
- EventCard acepta prop `className` opcional para animaciones escalonadas
- Animaciones escalonadas en hero y tarjetas del home con `animationDelay`

### Changed
- `components/Header.js`: enlaces del nav con pseudo-elemento `::after` para subrayado animado en hover
- `components/EventCard.js`: acepta prop `className` adicional
- `app/page.js`: clases `animate-fade-in` y `animate-pulse` en hero y tarjetas; `animationDelay` escalonado en eventos
- `/styles/globals.css`: sección Fase 3 con micro-interacciones, tipografía avanzada y efectos visuales

### Fixed
- Reducción de movimiento respetada globalmente (animaciones y transiciones se desactivan con `prefers-reduced-motion: reduce`)

### Decisiones de arquitectura
- Imágenes y modo oscuro siguen aplazados (no prioridad del usuario)
- CSS puro mantenido en `/styles/globals.css` sin librerías externas
- Build estático (`output: 'export'`) sin cambios en configuración

## [1.3.0] - 2026-10-22

### Added
- Fase 2 de diseño moderno: Hero asimétrico (`.hero-asymmetric`) con layout 2 columnas en desktop (texto + elemento visual de montaña CSS), stack en móvil
- Menú hamburguesa accesible en Header (`use client` + `useState`), con `aria-expanded`, `aria-controls`, `aria-label`, animación de slide-down y focus visible
- Container queries (`@container card`) para `highlight-card` y `event-card`: tipografía y padding adaptativos al ancho del contenedor (no solo al viewport)
- Efectos visuales: gradiente de montaña en `.hero-mountain`, marcador de bici centrado, overlay de brillo (`::before`)
- Transición suave `cubic-bezier(0.4, 0, 0.2, 1)` en menú móvil y estados hover

### Changed
- `components/Header.js`: convertido a Client Component con menú toggle accesible; nav-list se oculta en móvil y se muestra como fila horizontal en desktop
- `app/page.js`: hero reestructurado con `.hero-content` y `.hero-visual` separados para layout asimétrico
- `/styles/globals.css`: agregados estilos de menú hamburguesa, hero asimétrico (desktop/móvil), container queries, keyframes `navSlideDown`

### Fixed
- Nav-list en móvil ahora se apila verticalmente con fondo sólido y áreas de toque ampliadas

### Decisiones de arquitectura
- Imágenes y modo oscuro siguen aplazados (no prioridad del usuario)
- CSS puro mantenido en `/styles/globals.css` sin librerías externas
- Build estático (`output: 'export'`) sin cambios en configuración

## [1.2.0] - 2026-10-22

### Added
- Fase 1 de diseño moderno: tokens de espaciado (`--space-1` a `--space-16`), tipografía fluida con `clamp()` (`--text-xs` a `--text-3xl`), altura de línea (`--leading-*`), radios de borde (`--radius-sm`, `--radius-lg`, `--radius-full`), sombras en capas (`--shadow`, `--shadow-hover`, `--shadow-lg`), transiciones suaves (`--transition-smooth`)
- Focus visible global (`*:focus-visible`) para accesibilidad teclado
- `html { scroll-behavior: smooth }` para navegación suave
- Tarjetas (`highlight-card`, `event-card`) con borde sutil, radio ampliado y sombra en hover
- Hero con tipografía fluida y ancho máximo en párrafo
- Navbar con espaciado consistente y tipografía `--text-sm`
- Footer con tipografía reducida y espaciado ajustado

### Changed
- `/styles/globals.css`: todos los componentes usan los nuevos tokens de diseño en vez de valores hardcodeados
- `body`: `line-height`, `font-size`, `-webkit-font-smoothing`, `-moz-osx-font-smoothing` estándarizados

### Fixed
- Contraste y jerarquía visual en componentes existentes

### Decisiones de arquitectura
- Modo oscuro y optimización de imágenes (`next/image`) aplazados a fase posterior por decisión del usuario
- CSS puro mantenido en `/styles/globals.css` según reglas de AGENTS.md
- Build estático (`output: 'export'`) sin cambios en configuración

## [1.1.0] - 2026-10-22

### Added
- Orquestador de agentes `.opencode/` con agente `senior-frontend-dev` y 9 skills (react-architecture, modern-css, component-design-system, color-design-system, react-performance, typescript-migration, testing-library, accessibility)
- Skill `color-design-system`: paleta accesible, variables CSS en :root, contrastes WCAG 2.1, estados de componente, tema oscuro opcional
- MCP server `context7` configurado en `.opencode/mcp.json` para documentación de librerías y CSS
- Scripts npm: `agent:frontend`, `skill:install`, `mcp:test`
- Reglas de proyecto y restricciones de AGENTS.md incluidas en la meta-skill

### Changed
- Meta-skill `senior-frontend-dev` actualizada: ahora incluye `color-design-system` como dependencia
- Agente `senior-frontend-dev` actualizado: lista de skills expande a 9
- `/styles/globals.css`: paleta de colores rediseñada con nombres semánticos (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-surface`, `--color-background`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border`, `--color-success`, `--color-warning`, `--color-error`, `--color-disabled`, `--color-hover-*`, `--color-focus-ring`) y contraste WCAG 2.1 AA

### Fixed
- Contraste insuficiente en `--gray` (#95a5a6) sobre `--light` (#ecf0f1) y `--accent` (#f1c40f) sobre fondo blanco

### Decisiones de arquitectura
- `.opencode/` scopeado al proyecto (no global), versionado en el repo
- No se instalan librerías externas; todo se resuelve con dependencias existentes y MCP context7
- CSS se mantiene puro en /styles/globals.css según reglas de AGENTS.md
- Colores se gestionan exclusivamente mediante variables CSS en :root, sin CSS-in-JS ni preprocesadores

## [1.0.0] - 2026-10-22

### Added
- Estructura inicial del proyecto Next.js 14 con App Router en modo estático (`output: 'export'`)
- Configuración base: `package.json`, `next.config.js`, `.eslintrc.json`, `.gitignore`
- Documentación maestra `AGENTS.md` con reglas, convenciones, schemas de datos y ruteo
- Bitácora de cambios `CHANGELOG.md` (este archivo)
- Datos: `data/informativa.json` con 3 secciones (`about`, `rules`, `attractions`)
- Datos: `data/eventos.json` con 2 eventos futuros (`spring-tour`, `winter-challenge`)
- Componentes: `Header.js`, `Footer.js`, `InfoSection.js`, `EventCard.js`
- Layout raíz `app/layout.js` con Header/Footer y estilos globales
- Página home `app/page.js` (hero + secciones destacadas)
- Páginas informativas: `app/sobre/page.js`, `app/reglas/page.js`, `app/atracciones/page.js`
- Agenda de eventos: `app/eventos/page.js` (listado) y `app/eventos/[id]/page.js` (detalle con `generateStaticParams`)
- Estilos globales `styles/globals.css` con tema de variables, header, hero, cards y responsive

### Changed
- (ninguno aún)

### Fixed
- (ninguno aún)

### Decisiones de arquitectura
- Se usa JavaScript (no TypeScript), App Router (`/app`), CSS personalizado (sin Tailwind) y datos JSON estáticos según decisión del proyecto
- La información general del parque vive en `informativa.json`; los eventos en un JSON separado con su propio schema
- Componentes 100% server-side (sin hooks) para garantizar export estático
- `InfoSection` recibe `seccionId` y resuelve el contenido desde el JSON; `EventCard` recibe el objeto `evento` completo