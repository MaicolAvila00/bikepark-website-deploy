/**
 * EventJsonLd - Script JSON-LD schema.org/Event para rich results en buscadores.
 *
 * Server component sin estado: recibe el evento ya resuelto (con
 * obtenerEventoPorId de lib/eventos.js) y renderiza el <script> ld+json.
 * Fechas ISO (startDate/endDate); si el evento es de un día, endDate se omite.
 *
 * @param {object} props
 * @param {object} props.evento - Objeto de /data/eventos.json
 */
export default function EventJsonLd({ evento }) {
  const startDate = `${evento.fecha_inicio}T${evento.hora}:00`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: evento.titulo,
    description: evento.descripcion,
    startDate,
    ...(evento.fecha_fin !== evento.fecha_inicio
      ? { endDate: `${evento.fecha_fin}T${evento.hora}:00` }
      : {}),
    location: {
      '@type': 'Place',
      name: evento.lugar,
    },
    ...(evento.imagen ? { image: [evento.imagen] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
