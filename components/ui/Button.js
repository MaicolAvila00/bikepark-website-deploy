import Link from 'next/link';

/**
 * Button - Primitiva base para CTAs (enlace o botón).
 *
 * Navegación interna SIEMPRE con next/link (regla de AGENTS.md); externo con
 * <a target="_blank" rel="noopener">. Sin href renderiza un <button> nativo.
 * Mapea a las clases del sistema en base.css: primario y secundario.
 *
 * @param {object} props
 * @param {string} [props.href] - Si existe, renderiza un enlace interno/externo.
 * @param {'primary'|'secondary'} [props.variant='primary'] - Variante de estilo
 *   (`.boton--primario` / `.boton--secundario` de base.css).
 * @param {string} [props.className] - Clases extra.
 * @param {React.ReactNode} props.children - Contenido del botón.
 */
export default function Button({ href, variant = 'primary', className, children }) {
  // Variante por defecto: primario (rojo del acento).
  const clase = `boton ${variant === 'secondary' ? 'boton--secundario' : 'boton--primario'} ${
    className || ''
  }`.trim();

  if (!href) {
    return <button className={clase}>{children}</button>;
  }

  const esExterno = href.startsWith('http://') || href.startsWith('https://');
  if (esExterno) {
    return (
      <a className={clase} href={href} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }

  return (
    <Link className={clase} href={href}>
      {children}
    </Link>
  );
}
