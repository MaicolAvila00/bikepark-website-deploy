import EventCard from '../../../components/sections/EventCard';
import eventos from '../../../data/eventos.json';
import {
  obtenerEventoPorId,
  formatearRangoFechas,
} from '../../../lib/eventos';
import Button from '../../../components/ui/Button';
import EventJsonLd from '../../../components/sections/EventJsonLd';
import { notFound } from 'next/navigation';

/**
 * Genera el export estático de cada evento (output: 'export').
 * Si se añade un evento nuevo al JSON, su página se genera en el build
 * automáticamente.
 */
export function generateStaticParams() {
  return eventos.map((evento) => ({ id: evento.id }));
}

/**
 * Metadata por evento (title + description en el snippet de buscadores).
 * El sufijo del sitio lo añade el template de app/layout.js.
 */
export function generateMetadata({ params }) {
  const evento = obtenerEventoPorId(eventos, params.id);

  if (!evento) {
    return { title: 'Evento no encontrado' };
  }

  return {
    title: evento.titulo,
    description: evento.descripcion,
  };
}

export default function EventoSinglePage({ params }) {
  const evento = obtenerEventoPorId(eventos, params.id);

  if (!evento) {
    notFound();
  }

  return (
    <div className="escenario">
      <section className="contenedor page">
        <EventJsonLd evento={evento} />

        <div className="event-detail-header">
          <h1 className="page-title">{evento.titulo}</h1>
          <dl className="event-card-meta">
            <dt>Fecha</dt><dd>{formatearRangoFechas(evento)}</dd>
            <dt>Hora</dt><dd>{evento.hora}</dd>
            <dt>Lugar</dt><dd>{evento.lugar}</dd>
          </dl>
        </div>

        <div className="event-detail">
          <h2 className="titulo-seccion">Evento</h2>
          <EventCard evento={evento} enlaceDetalle={false} mostrarImagen={false} />

          {evento.enlace && (
            <p>
              <a
                className="btn-secondary"
                href={evento.enlace}
                target="_blank"
                rel="noopener"
              >
                Más información del evento
              </a>
            </p>
          )}
        </div>

        <div className="acciones-bloque">
          <Button href="/eventos">Volver a la agenda de eventos</Button>
        </div>
      </section>
    </div>
  );
}
