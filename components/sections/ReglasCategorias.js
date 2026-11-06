import { etiquetaCaracter } from '../../lib/reglas';

// /reglas como tabla de registro: índice ancla + categorías con normas
// numeradas por filete. El contenido llega de normalizarReglas; aquí no se
// filtra ni se ordena nada.
export default function ReglasCategorias({ categorias }) {
  return (
    <>
      <nav className="reglas-indice" aria-label="Categorías de reglas">
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <a href={'#' + categoria.id}>{categoria.titulo}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="reglas-categorias">
        {categorias.map((categoria) => (
          <section key={categoria.id} id={categoria.id} className="reglas-categoria">
            <h2 className="reglas-categoria-titulo">{categoria.titulo}</h2>
            <ol className="reglas-normas">
              {categoria.normas.map((norma, indice) => (
                <li key={norma.texto} className="regla">
                  {/* Identación de registro: 01, 02… reinicia por categoría. */}
                  <span className="regla-numero">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span className="regla-texto">{norma.texto}</span>
                  <span className={`regla-caracter regla-caracter-${norma.caracter}`}>
                    {etiquetaCaracter(norma.caracter)}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
