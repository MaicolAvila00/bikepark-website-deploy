'use client';

import Link from 'next/link';
import useImageFallback from '../hooks/useImageFallback';
import { formatearRangoFechas } from '../../lib/eventos';

/**
 * EventCard - Renderiza el card de un evento.
 *
 * Nota: el enlace al detalle vive DENTRO del card (no envolviéndolo) para
 * evitar HTML inválido con anchors anidados y anclas gigantes.
 *
 * @param {object} props
 * @param {object} props.evento - Objeto completo del evento desde /data/eventos.json
 *   (schema: id, titulo, fecha_inicio, fecha_fin, hora, lugar, descripcion, imagen, credito, enlace).
 * @param {string} [props.className] - Clases extra para el <article>
 * @param {object} [props.style] - Estilos inline para el <article>
 * @param {boolean} [props.enlaceDetalle=true] - Muestra el enlace "Ver detalle".
 *   En la página de detalle del evento (app/eventos/[id]) se pasa false para
 *   no enlazar a sí mismo.
 * @param {boolean} [props.mostrarImagen=true] - Muestra la imagen/crédito del
 *   evento. En la página de detalle se pasa false ([2.6.0]: allá solo va la
 *   info del evento; las fotos se quedan en los cards del listado).
 */
export default function EventCard({
  evento,
  className,
  style,
  enlaceDetalle = true,
  mostrarImagen = true,
}) {
  const {
    id,
    titulo,
    hora,
    lugar,
    descripcion,
    imagen,
    credito,
    enlace,
  } = evento;
  const { imagenDisponible, marcarIndisponible } = useImageFallback();

  return (
    <article className={`event-card ${className || ''}`} style={style} id={`event-${id}`}>
      {mostrarImagen &&
        (imagen ? (
          <>
            {imagenDisponible ? (
              <img
                src={imagen}
                alt={titulo}
                className="event-card-image"
                onError={marcarIndisponible}
              />
            ) : (
              <div className="placeholder-evento" aria-hidden="true">
                Imagen no disponible
              </div>
            )}
          </>
        ) : (
          <div className="event-card-image-placeholder" aria-hidden="true">
            Sin imagen
          </div>
        ))}
      <div className="event-card-content">
        {mostrarImagen && credito && <p className="img-credito">{credito}</p>}
        <h3 className="event-card-title">{titulo}</h3>
        <dl className="event-card-meta">
          <dt>Fecha</dt>
          <dd>{formatearRangoFechas(evento)}</dd>
          <dt>Hora</dt>
          <dd>{hora}</dd>
          <dt>Lugar</dt>
          <dd>{lugar}</dd>
        </dl>
        <p className="event-card-description">{descripcion}</p>
        {enlaceDetalle && (
          <Link
            className="event-card-link"
            href={`/eventos/${id}`}
            aria-label={`Ver detalle del evento ${titulo}`}
          >
            Ver detalle
          </Link>
        )}
        {enlace && (
          <a
            className="event-card-link"
            href={enlace}
            target="_blank"
            rel="noopener"
          >
            Más información
          </a>
        )}
      </div>
    </article>
  );
}
