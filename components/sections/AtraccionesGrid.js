import AtraccionCard from './AtraccionCard';

/**
 * AtraccionesGrid - Lista de fichas de atracciones.
 *
 * Componente servidor (sin estado). IMPORTANTE: la lista debe llegar ya
 * ordenada desde la página (con `ordenarAtracciones` de lib/atracciones.js);
 * el grid no ordena ni filtra nada por sí mismo.
 *
 * @param {object} props
 * @param {Array<object>} props.atracciones - Arreglo de registros ya ordenado
 *   de /data/atracciones.json. Puede venir vacío (estado vacío).
 */
export default function AtraccionesGrid({ atracciones }) {
  if (!Array.isArray(atracciones) || atracciones.length === 0) {
    return <p className="atracciones-vacio">Todavía no hay atracciones publicadas.</p>;
  }

  return (
    <ul className="atracciones-grid">
      {atracciones.map((atraccion) => (
        <li key={atraccion.id}>
          <AtraccionCard atraccion={atraccion} />
        </li>
      ))}
    </ul>
  );
}
