import { SITE_NAME } from '../../lib/site';
import Logo from '../ui/Logo';

/**
 * Footer - Mástil: wordmark grande en Anton, redes bajo el filete,
 * línea legal al pie. Enlaces y textos existentes sin cambios.
 * El nombre del sitio viene de lib/site.js (única fuente de verdad).
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="contenedor footer-inner">
        <div className="footer-marca">
          <Logo />
        </div>
        <nav className="footer-redes" aria-label="Redes sociales">
          <a href="https://www.instagram.com/nacho_bikepark" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="https://www.facebook.com/Nachobikepark" target="_blank" rel="noopener">
            Facebook
          </a>
        </nav>
      </div>
      <div className="contenedor footer-legal">
        <p>© {year} {SITE_NAME}. Todos los derechos reservados.</p>
        <p>Fotografías de la comunidad; el crédito de cada imagen figura junto a ella.</p>
      </div>
    </footer>
  );
}
