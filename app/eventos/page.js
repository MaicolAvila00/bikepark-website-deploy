import EventosGrid from '../../components/sections/EventosGrid';
import eventos from '../../data/eventos.json';
import { eventosProximos, eventosPasados } from '../../lib/eventos';
import PageHeader from '../../components/ui/PageHeader';

export const metadata = {
  title: 'Eventos',
  description:
    'Agenda del Nacho Bike Park: fogueos cronometrados y eventos de la comunidad. Los próximos se anuncian primero en Instagram @nacho_bikepark.',
  openGraph: {
    title: 'Eventos — Nacho Bike Park',
    description:
      'Agenda del Nacho Bike Park: fogueos y eventos de la comunidad, más el archivo de eventos realizados.',
    url: '/eventos',
  },
};

/**
 * Agenda del parque: próximos (vacíos, estado "por confirmar") + archivo de
 * eventos realizados de la comunidad (ambos calculados con lib/eventos.js).
 */
export default function EventosPage() {
  const proximos = eventosProximos(eventos);
  const pasados = eventosPasados(eventos);

  return (
    <div className="escenario">
      <section className="contenedor page">
        <PageHeader
          titulo="Agenda del Parque"
          subtitulo="Fogueos cronometrados y eventos de la comunidad del Nacho Bike Park. Cuando haya fecha confirmada, el anuncio llega primero a la agenda del parque."
        />
        <EventosGrid eventos={proximos} />
        {pasados.length > 0 && (
          <>
            <h2 className="titulo-seccion">Eventos realizados</h2>
            <EventosGrid eventos={pasados} />
          </>
        )}
      </section>
    </div>
  );
}
