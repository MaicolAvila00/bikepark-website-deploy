import InfoSection from '../../components/sections/InfoSection';
import PageHeader from '../../components/ui/PageHeader';
import AtraccionesGrid from '../../components/sections/AtraccionesGrid';
import atracciones from '../../data/atracciones.json';
import { ordenarAtracciones } from '../../lib/atracciones';

export const metadata = {
  title: 'Atracciones',
  description:
    'Patos, Clásica, Kraken, Zona de vuelos y Línea dirt jump (Chilltrail): las atracciones del parque con su escala de dificultad de verde a doble negro.',
  openGraph: {
    title: 'Atracciones',
    description:
      'Patos, Clásica, Kraken, Zona de vuelos y Línea dirt jump (Chilltrail): las atracciones del parque con su escala de dificultad de verde a doble negro.',
    url: '/atracciones',
  },
};

export default function AtraccionesPage() {
  const listaOrdenada = ordenarAtracciones(atracciones);
  return (
    <div className="escenario">
      <section className="contenedor page">
        <PageHeader
          titulo="Atracciones Principales"
          subtitulo="Rutas, zonas de habilidad y todo lo que ofrece el parque por nivel."
        />
        <InfoSection seccionId="attractions" />

        <h2 className="titulo-seccion">Las atracciones</h2>
        <AtraccionesGrid atracciones={listaOrdenada} />

        <h2 className="titulo-seccion">Escala de dificultad</h2>
        <ul className="badges-rutas">
          <li className="badge-dificultad badge-verde"><span className="badge-nombre">Verde</span><span className="badge-nivel">Principiantes</span></li>
          <li className="badge-dificultad badge-azul"><span className="badge-nombre">Azul</span><span className="badge-nivel">Intermedio</span></li>
          <li className="badge-dificultad badge-rojo"><span className="badge-nombre">Rojo</span><span className="badge-nivel">Avanzado</span></li>
          <li className="badge-dificultad badge-negro"><span className="badge-nombre">Negro</span><span className="badge-nivel">Experto</span></li>
          <li className="badge-dificultad badge-doble-negro"><span className="badge-nombre">Doble negro</span><span className="badge-nivel">Profesional</span></li>
        </ul>
      </section>
    </div>
  );
}
