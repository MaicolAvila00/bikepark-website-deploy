/**
 * Helper puro de formateo de fechas (solo build, sin estado).
 */

const formatoHumano = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * Formatea una fecha ISO (YYYY-MM-DD) al calendario en español
 * (ej: "2026-11-28" → "28 de noviembre de 2026").
 *
 * Se parsea con mediodía (T12:00:00) para evitar corrimientos de zona
 * horaria en fechas ISO sin hora (un new Date('2026-11-28') cae en UTC
 * y puede mostrarse como el día anterior en zonas negativas).
 *
 * @param {string} fechaIso - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha en formato largo en español
 */
export function formatearFechaHumana(fechaIso) {
  return formatoHumano.format(new Date(`${fechaIso}T12:00:00`));
}
