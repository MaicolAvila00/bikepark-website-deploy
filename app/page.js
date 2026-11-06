import Link from 'next/link';
import Button from '../components/ui/Button';
import EventosGrid from '../components/sections/EventosGrid';
import eventos from '../data/eventos.json';
import novedades from '../data/novedades.json';
import { eventosProximos } from '../lib/eventos';
import { formatearFechaHumana } from '../lib/fechas';

/**
 * Home — Manifesto: hero de foto, índice numerado, avisos, franja ciudad y agenda.
 *
 * Los proximosEventos siguen siendo los 2 eventos futuros más cercanos; si un
 * evento del JSON venció nunca aparece aquí como "próximo" (criterio congelado
 * en el build).
 */
export default function HomePage() {
  const proximosEventos = eventosProximos(eventos).slice(0, 2);

  return (
    <div className="escenario">
      {/* Hero: el titular es texto plano; las mayúsculas las pone el CSS */}
      <section className="hero">
        <div className="contenedor hero-rejilla">
          <div className="hero-texto">
            <h1 className="hero-titular">
              <span className="linea">El templo</span>
              <span className="linea">del downhill</span>
              <span className="linea">de <span className="caliente">Bogotá</span></span>
            </h1>
            <p className="hero-intro">
              Pistas construidas y mantenidas por riders en los cerros
              orientales. Aquí corre la comunidad del Parque Nacional: desde
              los chiquis hasta élite.
            </p>
            <div className="hero-acciones">
              <Button href="/eventos">Ver la agenda</Button>
              <Link href="/reglas">Conoce las reglas antes de bajar</Link>
            </div>
            <ul className="hero-datos">
              <li>
                <span>Pistas</span>Clásica, Patos y Kraken
              </li>
              <li>
                <span>Niveles</span>Chiquis a élite
              </li>
              <li>
                <span>Acceso</span>Parque Nacional Enrique Olaya Herrera
              </li>
              <li>
                <span>Secciones</span>Zona de vuelos, hidratación y línea de dirt jump
              </li>
            </ul>
          </div>
          <figure className="hero-figura">
            <img src="/images/hero-salto-zona-vuelos.jpg" alt="" />
            <figcaption className="img-credito">
              Captura: comunidad Nacho Bike Park
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Índice numerado: cada fila es un enlace real hacia su sección */}
      <section className="contenedor bloque-indice">
        <h2 className="titulo-seccion">Qué encontrarás en el cerro</h2>
        <Link className="fila-indice" href="/atracciones">
          <span className="indice-numero">01</span>
          <h3 className="indice-titulo">Pistas y zonas de vuelo</h3>
          <p className="indice-texto">
            Tres pistas por dificultad y dos zonas de vuelo con drops,
            dobles, transfers, triples, mesetas y peraltes. Todo construido
            y mantenido por la comunidad.
          </p>
        </Link>
        <Link className="fila-indice" href="/reglas">
          <span className="indice-numero">02</span>
          <h3 className="indice-titulo">Reglas y seguridad</h3>
          <p className="indice-texto">
            El uso del casco es obligatorio. Respeta a los demás riders,{' '}
            a la comunidad que mantiene las pistas y demás personas que comparten el parque.
          </p>
        </Link>
        <Link className="fila-indice" href="/sobre">
          <span className="indice-numero">03</span>
          <h3 className="indice-titulo">La comunidad</h3>
          <p className="indice-texto">
            Quiénes somos, cómo se construyen las pistas y cómo sumarte a
            las jornadas de mantenimiento.
          </p>
        </Link>
      </section>

      {/* Avisos: filas separadas por filete, sin tarjeta */}
      <section className="contenedor bloque-avisos">
        <h2 className="titulo-seccion">Avisos del parque</h2>
        {novedades.map((novedad) => (
          <article key={novedad.id} className="aviso">
            <span className="aviso-badge">{novedad.badge}</span>
            <time dateTime={novedad.fecha}>{formatearFechaHumana(novedad.fecha)}</time>
            <p className="aviso-mensaje">{novedad.mensaje}</p>
            <Link href="/eventos" className="aviso-enlace">Ver los eventos realizados</Link>
          </article>
        ))}
      </section>

      {/* Franja ciudad: las mismas 4 fotos en duotono */}
      <section className="contenedor bloque-franja">
        <h2 className="titulo-seccion">El parque y la ciudad</h2>
        <div className="franja-fotos">
          <figure className="foto-duotono">
            <img src="/images/monserrate-06.jpg" alt="Monserrate" />
            <figcaption className="img-credito">Captura: comunidad Nacho Bike Park</figcaption>
          </figure>
          <figure className="foto-duotono">
            <img src="/images/comunidad-nbp.png" alt="Grupo de la comunidad" />
            <figcaption className="img-credito">Captura: comunidad Nacho Bike Park</figcaption>
          </figure>
          <figure className="foto-duotono">
            <img src="/images/bogota-candelaria-cerros.jpg" alt="Candelaria y cerros" />
            <figcaption className="img-credito">Foto: Felipe Restrepo Acosta (CC BY-SA 3.0)</figcaption>
          </figure>
          <figure className="foto-duotono">
            <img src="/images/monserrate-01.jpg" alt="Monserrate" />
            <figcaption className="img-credito">Foto: Remux (CC BY-SA 4.0)</figcaption>
          </figure>
        </div>
      </section>

      {/* Agenda: los 2 eventos próximos vía EventosGrid */}
      <section className="contenedor bloque-agenda">
        <h2 className="titulo-seccion">Próximos eventos</h2>
        <EventosGrid eventos={proximosEventos} />
        <div className="agenda-cta">
          <Button href="/eventos">Ver todos los eventos</Button>
        </div>
      </section>
    </div>
  );
}
