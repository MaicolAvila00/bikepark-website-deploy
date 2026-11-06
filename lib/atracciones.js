/**
 * Lógica pura de las fichas de atracciones: escala de dificultad, orden,
 * normalización de nombres, detección de duplicados y validación de contenido.
 * No toca `fs`, `Date` ni `process`: toda dependencia externa llega por parámetro
 * (por ejemplo, la existencia de cada imagen se consulta con `existeImagen`).
 */

/**
 * Escala canónica de dificultad: los 5 niveles que ya usa la leyenda de
 * `app/atracciones/page.js`. El orden es el de menor a mayor dificultad.
 * @type {Array<{valor: string, etiqueta: string, descriptor: string}>}
 */
export const NIVELES = [
  { valor: 'verde', etiqueta: 'Verde', descriptor: 'Principiantes' },
  { valor: 'azul', etiqueta: 'Azul', descriptor: 'Intermedio' },
  { valor: 'rojo', etiqueta: 'Rojo', descriptor: 'Avanzado' },
  { valor: 'negro', etiqueta: 'Negro', descriptor: 'Experto' },
  { valor: 'doble_negro', etiqueta: 'Doble negro', descriptor: 'Profesional' },
];

/**
 * Posición del nivel en la escala canónica; -1 si el valor no es válido.
 * @param {string} valor Valor de dificultad (por ejemplo, 'doble_negro').
 * @returns {number}
 */
export function indiceNivel(valor) {
  return NIVELES.findIndex((nivel) => nivel.valor === valor);
}

/**
 * true solo con comparación exacta contra la escala (sensible a mayúsculas).
 * @param {string} valor
 * @returns {boolean}
 */
export function esNivelValido(valor) {
  return indiceNivel(valor) !== -1;
}

/**
 * Etiqueta legible del nivel ('Doble negro'). Cadena vacía si no es válido.
 * @param {string} valor
 * @returns {string}
 */
export function etiquetaNivel(valor) {
  const nivel = NIVELES.find((item) => item.valor === valor);
  return nivel ? nivel.etiqueta : '';
}

/**
 * Clase CSS del distintivo: 'badge-' + el valor con guiones bajos como guiones.
 * Cadena vacía si el valor no es válido.
 * @param {string} valor
 * @returns {string}
 */
export function claseNivel(valor) {
  if (!esNivelValido(valor)) {
    return '';
  }
  return 'badge-' + valor.replace(/_/g, '-');
}

/**
 * Niveles de una atracción en orden ascendente. Devuelve `[dificultad]` cuando
 * la ficha tiene un solo nivel, o `[dificultad, dificultad_max]` cuando declara
 * un rango. Los valores fuera de la escala se descartan: la validación los
 * reporta por separado.
 * @param {{dificultad?: string, dificultad_max?: string}} atraccion
 * @returns {string[]}
 */
export function nivelesDeAtraccion(atraccion) {
  if (atraccion === null || typeof atraccion !== 'object') {
    return [];
  }
  const niveles = [];
  if (esNivelValido(atraccion.dificultad)) {
    niveles.push(atraccion.dificultad);
  }
  if (esNivelValido(atraccion.dificultad_max)) {
    niveles.push(atraccion.dificultad_max);
  }
  return niveles;
}

/**
 * true solo si la descripción es una cadena no vacía después de recortar.
 * @param {{descripcion?: string}} atraccion
 * @returns {boolean}
 */
export function tieneDescripcion(atraccion) {
  return (
    atraccion !== null &&
    typeof atraccion === 'object' &&
    typeof atraccion.descripcion === 'string' &&
    atraccion.descripcion.trim() !== ''
  );
}

/**
 * Devuelve un arreglo NUEVO ordenado por índice de nivel ascendente, estable
 * por la posición original (el índice desempata explícitamente). Un nivel
 * inválido va al final. No muta la entrada; si no es arreglo, devuelve [].
 * @param {Array<{dificultad?: string}>} lista
 * @returns {Array}
 */
export function ordenarAtracciones(lista) {
  if (!Array.isArray(lista)) {
    return [];
  }
  const posicion = (dificultad) => {
    const indice = indiceNivel(dificultad);
    return indice === -1 ? NIVELES.length : indice;
  };
  return lista
    .map((atraccion, indice) => ({ atraccion, indice }))
    .sort((a, b) => {
      const nivelA = posicion(a.atraccion.dificultad);
      const nivelB = posicion(b.atraccion.dificultad);
      if (nivelA !== nivelB) {
        return nivelA - nivelB;
      }
      return a.indice - b.indice;
    })
    .map((item) => item.atraccion);
}

/**
 * Minúsculas, sin diacríticos (NFD + eliminación de combinantes), espacios
 * internos colapsados a uno y extremos recortados, sin perder palabras.
 * Si no es cadena, devuelve ''.
 * @param {string} nombre
 * @returns {string}
 */
export function normalizarNombre(nombre) {
  if (typeof nombre !== 'string') {
    return '';
  }
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Nombres normalizados que aparecen más de una vez, sin repetir cada uno
 * y en orden de primera aparición. Los nombres ausentes o vacíos se ignoran
 * (ya producen su propio error de validación).
 * @param {Array<{nombre?: string}>} lista
 * @returns {string[]}
 */
export function buscarDuplicados(lista) {
  if (!Array.isArray(lista)) {
    return [];
  }
  const vistos = new Set();
  const duplicados = new Set();
  for (const atraccion of lista) {
    const nombre = normalizarNombre(atraccion ? atraccion.nombre : undefined);
    if (nombre === '') {
      continue;
    }
    if (vistos.has(nombre)) {
      duplicados.add(nombre);
    } else {
      vistos.add(nombre);
    }
  }
  return [...duplicados];
}

/**
 * Valida el contenido de las atracciones y devuelve mensajes de error en
 * español; el arreglo queda vacío si todo es válido. No usa `fs`: la
 * existencia de cada imagen se consulta con la función `existeImagen`.
 * @param {Array} lista Atracciones a validar.
 * @param {{existeImagen?: (ruta: string) => boolean, referenciadas?: string[]}} opciones
 *   - `existeImagen`: función que dice si la ruta existe en disco (por defecto, siempre verdadera).
 *   - `referenciadas`: nombres que otras páginas mencionan; deben existir.
 * @returns {string[]}
 */
export function validarAtracciones(lista, opciones = {}) {
  const { existeImagen = () => true, referenciadas = [] } = opciones || {};
  if (!Array.isArray(lista)) {
    return ['El contenido de atracciones debe ser una lista de registros.'];
  }

  const errores = [];
  const idsVistos = new Set();

  lista.forEach((atraccion, indice) => {
    const registro =
      atraccion && typeof atraccion === 'object' ? atraccion : {};
    const quien =
      typeof registro.id === 'string' && registro.id.trim() !== ''
        ? 'la atracción "' + registro.id + '"'
        : 'la atracción en la posición ' + (indice + 1);

    // id no vacío y único
    if (typeof registro.id !== 'string' || registro.id.trim() === '') {
      errores.push(quien + ': falta el id de la atracción.');
    } else if (idsVistos.has(registro.id)) {
      errores.push(
        'El id "' + registro.id + '" está repetido: cada atracción necesita un id único.'
      );
    } else {
      idsVistos.add(registro.id);
    }

    // nombre entre 2 y 30 caracteres
    if (
      typeof registro.nombre !== 'string' ||
      registro.nombre.length < 2 ||
      registro.nombre.length > 30
    ) {
      errores.push(quien + ': el nombre debe tener entre 2 y 30 caracteres.');
    }

    // dificultad dentro de la escala
    if (!esNivelValido(registro.dificultad)) {
      errores.push(
        quien +
          ': la dificultad "' +
          (registro.dificultad === undefined ? '' : registro.dificultad) +
          '" está fuera de la escala (verde, azul, rojo, negro, doble_negro).'
      );
    }

    // dificultad_max es opcional; si existe, amplía el rango hacia arriba
    if (registro.dificultad_max !== undefined) {
      if (!esNivelValido(registro.dificultad_max)) {
        errores.push(
          quien +
            ': la dificultad máxima "' +
            String(registro.dificultad_max) +
            '" está fuera de la escala (verde, azul, rojo, negro, doble_negro).'
        );
      } else if (
        esNivelValido(registro.dificultad) &&
        indiceNivel(registro.dificultad_max) <= indiceNivel(registro.dificultad)
      ) {
        errores.push(
          quien +
            ': la dificultad máxima "' +
            registro.dificultad_max +
            '" debe ser mayor que la dificultad "' +
            registro.dificultad +
            '"; si la atracción tiene un solo nivel, se omite dificultad_max.'
        );
      }
    }

    // crédito obligatorio
    if (typeof registro.credito !== 'string' || registro.credito.trim() === '') {
      errores.push(quien + ': el crédito de la foto es obligatorio.');
    }

    // si la descripción no está vacía, entre 60 y 220 caracteres
    if (
      typeof registro.descripcion === 'string' &&
      registro.descripcion.trim() !== '' &&
      (registro.descripcion.length < 60 || registro.descripcion.length > 220)
    ) {
      errores.push(
        quien +
          ': la descripción debe tener entre 60 y 220 caracteres (tiene ' +
          registro.descripcion.length +
          ').'
      );
    }

    // si la imagen no está vacía, debe existir en disco
    if (
      typeof registro.imagen === 'string' &&
      registro.imagen !== '' &&
      !existeImagen(registro.imagen)
    ) {
      errores.push(
        quien + ': la imagen "' + registro.imagen + '" no existe en el disco.'
      );
    }
  });

  // nombres duplicados (aunque cambien tildes, mayúsculas o espacios)
  for (const nombre of buscarDuplicados(lista)) {
    errores.push(
      'La atracción "' +
        nombre +
        '" aparece más de una vez: ningún nombre puede repetirse.'
    );
  }

  // lo que otras páginas mencionan debe existir
  const nombresNormalizados = new Set(
    lista
      .map((atraccion) =>
        normalizarNombre(
          atraccion && typeof atraccion === 'object' ? atraccion.nombre : undefined
        )
      )
      .filter((nombre) => nombre !== '')
  );
  for (const nombre of referenciadas) {
    if (!nombresNormalizados.has(normalizarNombre(nombre))) {
      errores.push(
        'Otra página menciona la atracción "' + nombre + '" y no existe en la lista.'
      );
    }
  }

  return errores;
}

/**
 * Nombres que la portada (app/page.js) menciona por su nombre.
 * MANTENIMIENTO MANUAL: esta lista es la que la portada nombra; si la portada
 * cambia las atracciones que menciona, hay que actualizarla a mano.
 * @type {string[]}
 */
export const ATRACCIONES_REFERENCIADAS = ['Clásica', 'Patos', 'Kraken'];
