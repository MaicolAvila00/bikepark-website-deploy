import { Fragment } from 'react';
import {
  claseNivel,
  etiquetaNivel,
  nivelesDeAtraccion,
  tieneDescripcion,
} from '../../lib/atracciones';

/**
 * AtraccionCard - Ficha de una atracción, estilo registro: la foto abre la
 * ficha (vertical 4/5), después la cabecera con nombre y chips de dificultad,
 * la descripción y al final el crédito. Sin borde ni fondo: el filete superior
 * lo separa de la ficha anterior. Sin `<img>` pinta el marcador desde el
 * servidor, sin JavaScript.
 *
 * Si la ficha declara `dificultad_max`, pinta un chip por nivel separados por
 * un "a" real (RF-16), nunca fusionados y siempre con el nivel escrito.
 *
 * @param {object} props
 * @param {object} props.atraccion - Registro ya validado de /data/atracciones.json
 *   (schema: id, nombre, dificultad, dificultad_max?, descripcion, imagen, credito).
 */
export default function AtraccionCard({ atraccion }) {
  const { nombre, descripcion, imagen, credito } = atraccion;
  const dificultades = nivelesDeAtraccion(atraccion);

  return (
    <article className="atraccion">
      {imagen ? (
        <img
          className="atraccion-foto"
          src={imagen}
          alt={`Foto de la atracción ${nombre}`}
        />
      ) : (
        <div className="atraccion-marcador">
          <span className="marcador-nombre">{nombre}</span>
          <span className="img-credito">{credito}</span>
        </div>
      )}
      <header className="atraccion-cabecera">
        <h3>{nombre}</h3>
        <span className="atraccion-dificultades">
          {dificultades.map((nivel, indice) => (
            <Fragment key={nivel}>
              {indice > 0 && ' a '}
              <span className={`badge-dificultad ${claseNivel(nivel)}`}>
                {etiquetaNivel(nivel)}
              </span>
            </Fragment>
          ))}
        </span>
      </header>
      {tieneDescripcion(atraccion) && (
        <p className="atraccion-descripcion">{descripcion}</p>
      )}
      <p className="atraccion-credito img-credito">{credito}</p>
    </article>
  );
}
