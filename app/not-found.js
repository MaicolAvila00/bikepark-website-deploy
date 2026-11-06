import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';

export const metadata = {
  title: 'Página no encontrada',
};

/**
 * 404 con el diseño del sitio (Next.js la usa también al exportar /404.html).
 */
export default function NotFound() {
  return (
    <div className="escenario">
      <section className="contenedor page">
        <PageHeader
          titulo="404 — Página no encontrada"
          subtitulo="Esta ruta no existe o fue movida. Vuelve al inicio o revisa la agenda del parque."
        />
        <Button href="/">Volver al inicio</Button>
      </section>
    </div>
  );
}
