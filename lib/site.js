/**
 * Datos globales del sitio (punto único de verdad para metadata).
 * Solo contiene la URL base por ahora; el resto vive en /data/*.json.
 *
 * Dominio real del park. Se define aquí una sola vez: metadataBase, sitemap.xml
 * y robots.txt lo leen de este módulo.
 */
export const SITE_URL = 'https://www.nachobikepark.com';

// Identidad real del proyecto: comunidad de MTB del Parque Nacional de Bogotá.
// Verificado en las redes oficiales (ver DOCS/briefing-productor-nacho-bikepark.md).
export const SITE_NAME = 'Nacho Bike Park';