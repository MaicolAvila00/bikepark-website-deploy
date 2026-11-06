/** Reglas por categorías: constantes canónicas, normalización y validación pura. */

export const CATEGORIAS = [
  { id: 'seguridad', titulo: 'Seguridad' },
  { id: 'en-la-pista', titulo: 'En la pista' },
  { id: 'en-el-parque', titulo: 'En el parque' }
];

export const CARACTERES = ['obligatoria', 'recomendada'];

export const MAX_NORMA = 140;
export const MAX_INTRO = 220;

const cadena = (valor) => typeof valor === 'string' ? valor : '';
// clave de comparación: sin distinguir mayúsculas y sin espacios en los extremos
const claveTexto = (texto) => cadena(texto).trim().toLowerCase();

const etiquetaPorId = new Map(CATEGORIAS.map((c) => [c.id, c.titulo]));

/** Normaliza una entrada de reglas al orden canónico de CATEGORIAS, sin filtrar. */
export function normalizarReglas(entrada) {
  if (!entrada || typeof entrada !== 'object' || Array.isArray(entrada)) {
    return { intro: '', categorias: [] };
  }
  const porId = new Map(
    (Array.isArray(entrada.categorias) ? entrada.categorias : [])
      .filter((c) => c && typeof c === 'object')
      .map((c) => [c.id, c])
  );
  // conservamos también las categorías que no sean canónicas, tras las canónicas
  const canonicas = CATEGORIAS.map((c) => {
    const encontrada = porId.get(c.id);
    if (!encontrada) return null;
    porId.delete(c.id);
    return {
      id: c.id,
      titulo: cadena(encontrada.titulo) || c.titulo,
      normas: (Array.isArray(encontrada.normas) ? encontrada.normas : []).filter(
        (n) => n && typeof n === 'object'
      ).map((n) => ({ texto: cadena(n.texto), caracter: cadena(n.caracter) }))
    };
  }).filter(Boolean);
  const sobrantes = [...porId.values()].map((c) => ({
    id: cadena(c.id),
    titulo: cadena(c.titulo),
    normas: (Array.isArray(c.normas) ? c.normas : []).filter(
      (n) => n && typeof n === 'object'
    ).map((n) => ({ texto: cadena(n.texto), caracter: cadena(n.caracter) }))
  }));
  return { intro: cadena(entrada.contenido), categorias: [...canonicas, ...sobrantes] };
}

/**
 * `entrada` es la sección de informativa.json: `contenido` es la intro y
 * `categorias` trae las normas. Devuelve mensajes, nunca lanza.
 */
export function validarReglas(entrada) {
  const errores = [];
  if (!entrada || typeof entrada !== 'object' || Array.isArray(entrada)) {
    return ['La entrada de reglas debe ser un objeto.'];
  }

  const intro = cadena(entrada.contenido).trim();
  if (!intro) errores.push('La intro es obligatoria.');
  else if (intro.length > MAX_INTRO) {
    errores.push(`La intro no debe superar ${MAX_INTRO} caracteres (tiene ${intro.length}).`);
  }

  if (!cadena(entrada.credito).trim()) {
    errores.push('El crédito de la foto es obligatorio.');
  }

  if (!Array.isArray(entrada.categorias) || entrada.categorias.length === 0) {
    errores.push('Las reglas deben incluir al menos una categoría.');
    return errores; // sin categorías no tiene sentido seguir
  }

  const idsVistos = new Set();
  for (const categoria of entrada.categorias) {
    const id = cadena(categoria?.id);
    if (!etiquetaPorId.has(id)) {
      errores.push(
        id ? `Categoría desconocida: "${id}".` : 'Hay una categoría sin id.'
      );
      if (!idsVistos.has(id)) idsVistos.add(id);
      continue;
    }
    if (idsVistos.has(id)) {
      errores.push(`La categoría "${id}" está repetida.`);
      continue;
    }
    idsVistos.add(id);

    if (!Array.isArray(categoria.normas) || categoria.normas.length === 0) {
      errores.push(`La categoría "${id}" debe tener al menos una norma.`);
      continue;
    }

    for (const norma of categoria.normas) {
      const texto = cadena(norma?.texto);
      if (!texto.trim()) {
        errores.push(`Una norma de "${id}" tiene el texto vacío.`);
        continue;
      }
      if (texto.length > MAX_NORMA) {
        errores.push(
          `Una norma de "${id}" supera ${MAX_NORMA} caracteres (tiene ${texto.length}).`
        );
      }
      if (!CARACTERES.includes(norma?.caracter)) {
        errores.push(
          `Una norma de "${id}" tiene un carácter fuera de la lista (${CARACTERES.join(' / ')}).`
        );
      }
    }
  }

  // cada categoría canónica debe estar presente una vez
  for (const { id } of CATEGORIAS) {
    if (!idsVistos.has(id)) {
      errores.push(`Falta la categoría "${id}".`);
    }
  }

  // normas duplicadas en toda la entrada, sin distinguir mayúsculas ni extremos
  const unicos = new Set();
  const repetidos = new Set();
  for (const norma of entrada.categorias.flatMap((c) => (Array.isArray(c?.normas) ? c.normas : []))) {
    const clave = claveTexto(norma?.texto);
    if (!clave) continue;
    if (unicos.has(clave)) {
      if (!repetidos.has(clave)) repetidos.add(clave);
    } else {
      unicos.add(clave);
    }
  }
  for (const repetido of repetidos) {
    errores.push(`La norma "${repetido.slice(0, 40)}" está repetida.`);
  }

  // ninguna norma puede reproducirse en la intro
  const introClave = claveTexto(intro);
  if (introClave) {
    for (const norma of entrada.categorias.flatMap((c) => Array.isArray(c?.normas) ? c.normas : [])) {
      const clave = claveTexto(norma?.texto);
      if (clave && introClave.includes(clave)) {
        errores.push(
          'La intro no debe reproducir el texto de una norma.'
        );
        break;
      }
    }
  }

  return errores;
}

/** Etiqueta en mayúscula inicial para mostrar; cadena vacía si el carácter es inválido. */
export function etiquetaCaracter(caracter) {
  switch (caracter) {
    case 'obligatoria': return 'Obligatoria';
    case 'recomendada': return 'Recomendada';
    default: return '';
  }
}
