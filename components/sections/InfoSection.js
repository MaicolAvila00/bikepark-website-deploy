'use client';

import useImageFallback from '../hooks/useImageFallback';
import secciones from '../../data/informativa.json';

/**
 * InfoSection - Renderiza una sección informativa del JSON.
 *
 * Texto en columna propia (.info-texto) y figura hermana dentro de
 * .info-section: así el CSS reparte el hueco en dos columnas sin estirar la
 * imagen a mano (era la causa del hueco de 200 px con grid-row: 1 / span 3).
 *
 * @param {object} props
 * @param {string} props.seccionId - Id de la sección en /data/informativa.json
 *   (ej: 'about', 'rules', 'attractions').
 * @param {string} [props.compacto] - Si es truthy, omite el mensaje de imagen
 *   no disponible.
 */
export default function InfoSection({ seccionId, compacto = false }) {
  const seccion = secciones.find((s) => s.id === seccionId);
  const { imagenDisponible, marcarIndisponible } = useImageFallback();

  if (!seccion) {
    // Si el id no existe aún en el JSON, no renderiza nada (fail-safe)
    return null;
  }

  return (
    <section className={`info-section ${seccion.tipo}`}>
      <div className="info-texto">
        <h2>{seccion.titulo}</h2>
        <p>{seccion.contenido}</p>
        {seccion.enlace && (
          <a
            className="info-link"
            href={seccion.enlace}
            target="_blank"
            rel="noopener"
          >
            Más información
          </a>
        )}
      </div>
      {seccion.imagen ? (
        <figure className="info-figura">
          {imagenDisponible ? (
            <img
              src={seccion.imagen}
              alt={seccion.titulo}
              onError={marcarIndisponible}
            />
          ) : (
            <div className="placeholder-imagen" aria-hidden="true">
              Imagen no disponible
            </div>
          )}
          {seccion.credito && (
            <figcaption className="img-credito">{seccion.credito}</figcaption>
          )}
        </figure>
      ) : (
        !compacto && <p className="no-image">Imagen de la sección aún no disponible.</p>
      )}
    </section>
  );
}
