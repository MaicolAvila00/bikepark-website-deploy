/**
 * Helpers puros para la agenda de eventos.
 * Solo se ejecutan en build (SSG con output: 'export'): el criterio de
 * "próximo/pasado" se congela en cada deploy, no hay runtime en el cliente.
 *
 * Convención: un evento cuenta como "próximo" durante TODO su día de cierre.
 */

/**
 * Devuelve los eventos ordenados cronológicamente (más próximo primero).
 * No muta el array original.
 *
 * @param {Array<object>} eventos - Array de /data/eventos.json
 * @returns {Array<object>} Copia ordenada por fecha_inicio
 */
export function ordenarPorFecha(eventos) {
  return [...eventos].sort(
    (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
  );
}

/**
 * Eventos futuros (o en curso), ordenados cronológicamente.
 *
 * @param {Array<object>} eventos - Array de /data/eventos.json
 * @param {Date} [ahora] - Referencia temporal (build); parametrizable para tests
 * @returns {Array<object>}
 */
export function eventosProximos(eventos, ahora = new Date()) {
  return ordenarPorFecha(eventos).filter(
    (evento) => new Date(`${evento.fecha_fin}T23:59:59`) >= ahora
  );
}

/**
 * Eventos ya finalizados, ordenados cronológicamente (más reciente primero).
 *
 * @param {Array<object>} eventos - Array de /data/eventos.json
 * @param {Date} [ahora] - Referencia temporal (build)
 * @returns {Array<object>}
 */
export function eventosPasados(eventos, ahora = new Date()) {
  return ordenarPorFecha(eventos)
    .reverse()
    .filter((evento) => new Date(`${evento.fecha_fin}T23:59:59`) < ahora);
}

/**
 * Busca un evento por su id (clave única del schema).
 *
 * @param {Array<object>} eventos - Array de /data/eventos.json
 * @param {string} id - Id del evento (ej: 'spring-tour')
 * @returns {object|null} El evento encontrado, o null si no existe
 */
export function obtenerEventoPorId(eventos, id) {
  return eventos.find((evento) => evento.id === id) || null;
}

/**
 * Formatea el rango de fechas visible del evento: si es de un solo día
 * no repite la fecha (ej: "2026-11-15" o "2026-11-15 — 2026-11-17").
 *
 * @param {object} evento - Objeto de /data/eventos.json
 * @returns {string} Rango de fechas formateado
 */
export function formatearRangoFechas(evento) {
  return evento.fecha_inicio === evento.fecha_fin
    ? evento.fecha_inicio
    : `${evento.fecha_inicio} — ${evento.fecha_fin}`;
}
