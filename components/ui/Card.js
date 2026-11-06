/**
 * Card - Primitiva base de tarjeta de contenido.
 *
 * Envoltorio semántico reutilizable (<article>) que delega el 100% del estilo
 * a clases de components.css (kebab-case): pagará `.highlight-card`, `.tarjeta-novedad`,
 * `.event-card`, etc. según el contexto de la página.
 * Primitiva disponible sin adopción actual en las páginas.
 *
 * @param {object} props
 * @param {string} [props.className] - Clases de estilo de la tarjeta (obligatoria
 *   en la práctica: la primitiva no aplica estilos propios).
 * @param {object} [props.style] - Estilos inline.
 * @param {string} [props.id] - Id opcional para anclas.
 * @param {React.ReactNode} props.children - Contenido de la tarjeta.
 */
export default function Card({ className, style, id, children }) {
  return (
    <article className={className} style={style} id={id}>
      {children}
    </article>
  );
}
