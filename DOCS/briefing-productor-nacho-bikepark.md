# Briefing de Producción — Nacho Bike Park (Bogotá)

> **Documento histórico.** La identidad visual vigente es "Señalización de pista" (CHANGELOG [2.8.0]); este briefing no describe paleta alguna y sus referencias de identidad ya no están en el código.

> Documento de producción generado por la investigación del productor (tarea 0
> aprobada por el usuario, ver CHANGELOG [2.4.0]). Es el contexto de entrega para
> el diseño gráfico y para el código del sitio. La investigación se verificó
> contra fuentes públicas el 2026-10-23.

---

## 1. Hallazgo clave

El **Nacho Bike Park (NBP)** existe en la vida real: es la **comunidad de MTB /
downhill del Parque Nacional Enrique Olaya Herrera** de Bogotá (cerros
orientales). No es un complejo comercial — es un bikepark urbano construido y
mantenido por la propia comunidad ("riders para riders").

| Dato | Valor |
|------|-------|
| Nombre | Nacho Bike Park / NBP |
| Qué es | "Comunidad de MTB en Bogotá 🚵" (bio del IG) |
| Slogans usados | "La capital school ⛰️" · "El templo del downhill en Bogotá" · "Comunidad de riders del Parque Nacional de Bogotá para el mundo" |
| Ubicación | Parque Nacional Enrique Olaya Herrera, Bogotá, Colombia |

## 2. Canales oficiales

| Canal | URL | Seguidores (al 2026-10-23) |
|-------|-----|---------------------------|
| Instagram | https://www.instagram.com/nacho_bikepark | 3,939 |
| Facebook | https://www.facebook.com/Nachobikepark | 1,163 |
| YouTube (referencias) | canal `@nachobikepark933` citado en videos de la comunidad | — |
| Landing de eventos | https://travesiadeportiva.com/calendario/nacho-bike-fest-la-invasion | — |

**Logo.** La web no usa un logo derivado de esta investigación: desde [2.9.2]
sirve el emblema facilitado por el proyecto (`public/images/logo-nacho-bike-park.png`).
El origen de ese archivo y sus permisos de uso no constan en este documento.

## 3. Eventos y cultura reales

- **Nacho Bike Fest: La Invasión** — carrera cronometrada con disfraces y
  premios (edición 2025: 9 de noviembre; inscripciones cerraron el 5 de
  noviembre; categorías hasta Doble Experto y Élite).
- **Fogueos NBP** — series cronometradas abiertas ("válidas") con categorías:
  **Chiquis, Damas, Infantil, Novatos, Experto, Élite**.
- **Halloween Ride / Fogueo Hallow** — rodada anual disfrazada (octubre).
- **Nocturnos 🌚** — rodadas nocturnas.
- **Soil Searching** — jornadas de construcción y mantenimiento de pistas;
  la comunidad construye sus propias pistas (colaboración con "Tacky Builders").
- Rodadas matinales típicas ~7:00 a.m.

## 4. Atracciones reales verificadas

- **Zona de vuelos** (jump line): obstáculos con nombre propio —
  **Drop, Doble, Transfer, Triple, Meseta y Peraltes**
  (fuente: video "¡VOLANDO EN NACHO BIKE PARK!").
- **Pista Clásica** — descenso insignia (línea "Kamikaze", saltos).
- Nivel: principiantes → élite. Pistas cercanas censadas en Trailforks
  (región Bogotá, ej. DH La Cortica, azul) como referencia de ratings.

## 5. Assets y licencias

| Asset | Fuente | Uso web | Permiso |
|-------|--------|---------|---------|
| Fotos de La Invasión (nov 2025) | IG de la comunidad + fotógrafos: Karen Sofía Solano Sierra, Jefferson Burbano, Hassan Pinto | galería/cards | ⚠️ Pedir licencia por DM |
| Tomas aéreas de drone (fogueos, saltos) | Canal DRONGEOH (@Drongeoh0420): "¡VOLANDO EN NACHO BIKE PARK!", "PRIMER FOGUEO NBP 2023", "¡SIN FRENOS! La INVASIÓN 2025" | hero / OG image real 1200×630 | ⚠️ Pedir licencia por DM |
| Reel "PARAÍSO #5" | TikTok @eldanimtb / IG @bi.mo.ca | referencia de estilo | Referencia, no uso |
| Videos de comunidad "Pista Clasica" | FB page "En bici es mas chimbita" | referencia | Referencia, no uso |

**Regla vigente:** no se publica material gráfico sin crédito. Los placeholders
SVG de la primera versión ya no existen en el repositorio; donde falta foto, la
ficha pinta un marcador desde el servidor y nunca una imagen rota.

### Origen del material ya publicado

Primer lote de fotos reales, entrado en [2.5.0] con miniaturas públicas de
videos de YouTube de la comunidad y autor confirmado vía oEmbed. Los nombres de
archivo de entonces ya no coinciden todos con los del repositorio; lo que
importa de esta tabla es la autoría y el estado del permiso.

| Origen (video) | Autor (oEmbed) |
|----------------|----------------|
| "Parque Nacional - NACHO BIKE PARK Dia de practica" | JohanStiven MTB |
| "¡VOLANDO EN NACHO BIKE PARK! Drop, Doble, Transfer..." | DRONGEOH |
| "¡SIN FRENOS! La INVASIÓN 2025" | DRONGEOH |
| "PRIMER FOGUEO NBP 2023" (drone) | DRONGEOH |
| "El Nacho bikepark esta increible en bogota" | edward3650 |

**Estado del permiso: pendiente en todos los casos.** Son miniaturas públicas de
YouTube mostradas con crédito visible, y el crédito no equivale a licencia.
Sigue pendiente el DM a la comunidad y a los fotógrafos citados arriba, más
DRONGEOH para las tomas de dron.

**Plantilla DM sugerida (ES, para Instagram/Facebook):**
> ¡Hola, Nacho Bike Park! 🚵 Estamos montando la página informativa del parque
> (la comunidad del Parque Nacional) y nos encantaría usar algunas fotos del
> [evento/pista] con el crédito al autor. ¿Nos autorizan el uso y cómo prefieren
> el crédito? (También interesados en cubrir el próximo fogueo.) ¡Gracias!

### Prioridad de tomas pendientes

1. Hero con rider en vuelo al atardecer.
2. Zona de vuelos desde dron.
3. Multitud/fogueo con disfraces.
4. Pista Clásica, Kamikaze POV.
5. Jornada Soil Searching.

**OG real 1200×630:** pendiente. Hoy se sirve el placeholder generado por
`scripts/generar-og-placeholder.js`.

## 6. Riesgos y notas de producción

- **Fechas/horas de fogueos históricos**: aproximadas (marcadas en las
  descripciones). Si la comunidad confirma fechas exactas, actualizar los JSON.
- **La Invasión**: única fecha 100 % verificada (2 fuentes independientes).
- **Dominio.** `SITE_URL` apunta a `https://www.nachobikepark.com` desde
  [2.10.0]; ya no es un placeholder. Falta comprobar que el dominio resuelve y
  sirve el sitio antes del primer deploy público.
- Los enlaces externos (IG/FB/evento) usan `target="_blank" rel="noopener"`
  (regla de `AGENTS.md`).
