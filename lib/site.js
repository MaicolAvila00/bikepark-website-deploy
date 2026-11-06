/**
 * Datos globales del sitio (punto único de verdad para metadata).
 * Solo contiene la URL base por ahora; el resto vive en /data/*.json.
 *
 * Dominio real del park. Se define aquí una sola vez: metadataBase, sitemap.xml
 * y robots.txt lo leen de este módulo.
 *
 * ⚠️ PLACEHOLDER: 'https://www.nachobikepark.com' NO resuelve actualmente.
 *   Cuando se compre el dominio real, actualizar SOLO esta constante.
 *   Afecta: metadataBase, sitemap.xml, robots.txt, og:url.
 *   Ver deuda técnica en CHANGELOG.md v2.10.4 y DOCS/briefing-productor-nacho-bikepark.md §6.
 */
export const SITE_URL = 'https://www.nachobikepark.com';

// Identidad real del proyecto: comunidad de MTB del Parque Nacional de Bogotá.
// Verificado en las redes oficiales (ver DOCS/briefing-productor-nacho-bikepark.md).
export const SITE_NAME = 'Nacho Bike Park';