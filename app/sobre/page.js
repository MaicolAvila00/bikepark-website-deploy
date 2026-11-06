import InfoSection from '../../components/sections/InfoSection';
import PageHeader from '../../components/ui/PageHeader';

export const metadata = {
  title: 'Sobre el Bikepark',
  description:
    'Quiénes somos, qué encontrarás en el parque (rutas, zonas de habilidad, servicios) y cómo preparar tu visita al bikepark.',
  openGraph: {
    title: 'Sobre el Bikepark',
    description:
      'Quiénes somos, qué encontrarás en el parque y cómo preparar tu visita.',
    url: '/sobre',
  },
};

export default function SobrePage() {
  return (
    <div className="escenario">
      <section className="contenedor page">
        <PageHeader
          titulo="Sobre el Bikepark"
          subtitulo="Todo lo que necesitas saber sobre nuestro parque antes de visitarnos."
        />
        <InfoSection seccionId="about" />
      </section>
    </div>
  );
}
