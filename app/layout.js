import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { SITE_NAME, SITE_URL } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // El template evita repetir el sufijo "— Nacho Bike Park" en cada página:
  // las hijas solo definen su propio title ("%s").
  title: {
    default: `${SITE_NAME} — Información y Eventos`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Página informativa del Nacho Bike Park: la comunidad de MTB y downhill del Parque Nacional de Bogotá. Pistas, reglas, seguridad y agenda de fogueos.',
  openGraph: {
    type: 'website',
    locale: 'es',
    url: '/',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Información y Eventos`,
    description:
      'Pistas, reglas, seguridad y agenda de fogueos de la comunidad MTB del Parque Nacional de Bogotá.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Skip link: atajo de teclado hacia el contenido (WCAG 2.4.1) */}
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido-principal" className="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
