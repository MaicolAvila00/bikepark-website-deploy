'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import navegacion from '../../data/navegacion.json';
import Logo from '../ui/Logo';

/**
 * Header - Nav de borde: marca (Logo) + lista + CTA de agenda.
 * Navegación interna SIEMPRE con next/link. Menú móvil accesible con
 * toggle (useState permitido). Página activa con aria-current="page".
 */
// Los ítems del menú viven en /data/navegacion.json (fuente de verdad de la navegación).
const NAV_ITEMS = navegacion;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // "/" solo activa el Home exacto; los demás marcan su sección y sus derivados.
  const seccionActiva = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="cabecera">
      <div className="contenedor cabecera-inner">
        <Link href="/" className="marca" onClick={closeMenu}>
          <Logo />
        </Link>

        <nav className="navegacion" aria-label="Navegación principal">
          <ul className={`nav-list ${isMenuOpen ? 'nav-open' : ''}`} id="mobile-nav">
            {NAV_ITEMS.map((item) => {
              const activo = seccionActiva(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={activo ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* CTA de agenda: mismo texto que usa el home para /eventos */}
          <Link href="/eventos" className="nav-cta boton boton--primario" onClick={closeMenu}>
            Ver la agenda
          </Link>
        </nav>

        <button
          className="menu-movil"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={toggleMenu}
        >
          <span className="menu-linea" aria-hidden="true"></span>
          <span className="menu-linea" aria-hidden="true"></span>
          <span className="menu-linea" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
}
