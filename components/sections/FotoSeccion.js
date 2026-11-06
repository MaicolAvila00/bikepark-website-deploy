'use client';

import useImageFallback from '../hooks/useImageFallback';

/**
 * FotoSeccion - Muestra una foto de sección con fallback y crédito.
 *
 * @param {object} props
 * @param {string} props.imagen - Ruta absoluta de la imagen (ej: '/images/foto.jpg').
 *   Si llega vacía, no renderiza nada.
 * @param {string} props.credito - Texto del crédito de la foto.
 * @param {string} props.alt - Texto alternativo de la imagen.
 */
export default function FotoSeccion({ imagen, credito, alt }) {
  const { imagenDisponible, marcarIndisponible } = useImageFallback();

  if (!imagen) {
    return null;
  }

  return (
    <figure className="foto-seccion">
      {imagenDisponible ? (
        <img src={imagen} alt={alt} onError={marcarIndisponible} />
      ) : (
        <div className="placeholder-imagen" aria-hidden="true">
          Imagen no disponible
        </div>
      )}
      <figcaption className="img-credito">{credito}</figcaption>
    </figure>
  );
}
