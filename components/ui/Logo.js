/**
 * Logo - Marca del sitio: el emblema oficial del park servido como PNG
 * plano desde /images/logo-nacho-bike-park.png. Va sin placa: al ser
 * monocromo con alfa, se invierte por CSS (`filter: invert(1)` en
 * `.logo-mark`) para que se lea sobre el papel oscuro. El emblema
 * contiene la palabra "NACHO" dibujada como parte del logotipo: el
 * contraste de marca no aplica (WCAG 1.4.3 exime logotipos) y por eso
 * el `alt` va vacío, para no repetir el nombre. El nombre accesible
 * vive en el texto real de <span className="logo-text">Nacho Bike
 * Park</span>.
 *
 * Sigue siendo un componente servidor, sin estado.
 */
export default function Logo() {
  return (
    <span className="logo-brand">
      <img className="logo-mark" src="/images/logo-nacho-bike-park.png" alt="" width="456" height="438" />
      <span className="logo-text">Nacho Bike Park</span>
    </span>
  );
}
