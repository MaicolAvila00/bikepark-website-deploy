import PageHeader from '../../components/ui/PageHeader';
import FotoSeccion from '../../components/sections/FotoSeccion';
import ReglasCategorias from '../../components/sections/ReglasCategorias';
import { normalizarReglas } from '../../lib/reglas';
import secciones from '../../data/informativa.json';

export const metadata = {
  title: 'Reglas y Seguridad',
  description:
    'Normas del bikepark: seguridad, convivencia en la pista y uso del parque, con lo que es obligatorio y lo que se recomienda para un riding seguro para todos.',
  openGraph: {
    title: 'Reglas y Seguridad',
    url: '/reglas',
  },
};

// La foto ya no va en columna: queda debajo de las categorías, a todo el ancho.
export default function ReglasPage() {
  const entrada = secciones.find((s) => s.id === 'rules');
  const reglas = normalizarReglas(entrada);
  return (
    <div className="contenedor page">
      <PageHeader
        titulo="Reglas y Seguridad"
        subtitulo="Qué es obligatorio y qué se recomienda para un riding seguro para todos."
      />
      {!reglas || !reglas.categorias ? null : (
        <>
          {/* intro y credito salen de la entrada cruda, no de normalizarReglas */}
          <p className="reglas-intro">{reglas.intro}</p>
          <ReglasCategorias categorias={reglas.categorias} />
        </>
      )}
      <FotoSeccion imagen={entrada.imagen} credito={entrada.credito} alt={entrada.titulo} />
    </div>
  );
}
