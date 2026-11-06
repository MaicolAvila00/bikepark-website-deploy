import EventCard from './EventCard';

/**
 * EventosGrid - Grid de EventCards con estado vacío integrado (server component).
 *
 * Encapsula la repetición de "grid + .estado-vacio" que existía en el home y
 * en /eventos. El estado de los eventos SIEMPRE se calcula antes con los
 * helpers de lib/eventos.js (eventosProximos/eventosPasados): este componente
 * NO filtra ni corta el JSON directo.
 *
 * @param {object} props
 * @param {Array<object>} props.eventos - Eventos ya filtrados/ordenados con lib/eventos.js
 */
export default function EventosGrid({ eventos }) {
  if (eventos.length === 0) {
    return (
      <div className="estado-vacio">
        <p><strong>Próxima válida: por confirmar</strong></p>
        <p>
          El siguiente fogueo aún no tiene fecha. La comunidad anuncia cada
          rodada primero en Instagram.
        </p>
        <p>
          <a href="https://www.instagram.com/nacho_bikepark" target="_blank" rel="noopener">
            Seguir a @nacho_bikepark
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {eventos.map((evento) => (
        <EventCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}
