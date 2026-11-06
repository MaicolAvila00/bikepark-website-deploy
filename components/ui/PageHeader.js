/**
 * PageHeader - Cabecera semántica de página (server component, sin estado).
 *
 * Reemplaza la repetición de <h1 className="page-title"> + <p className="page-subtitle">
 * en las páginas informativas y de listado. El estilo vive en layout.css
 * (.page-title / .page-subtitle); el <header> wrapper no aplica estilos propios.
 *
 * Uso: <PageHeader titulo="Sobre el Bikepark" subtitulo="..." />
 *
 * @param {object} props
 * @param {string} props.titulo - Título principal de la página (h1.page-title)
 * @param {string} [props.subtitulo] - Subtítulo introductorio (p.page-subtitle)
 * @param {React.ReactNode} [props.children] - Extras opcionales bajo el subtítulo
 */
export default function PageHeader({ titulo, subtitulo, children }) {
  return (
    <header>
      <h1 className="page-title">{titulo}</h1>
      {subtitulo && <p className="page-subtitle">{subtitulo}</p>}
      {children}
    </header>
  );
}
