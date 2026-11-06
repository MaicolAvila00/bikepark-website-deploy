/**
 * validar-datos.js — Validación de los JSON de /data (Node puro, sin dependencias).
 *
 * Se ejecuta con: npm run validate:data
 *
 * Valida 5 JSON: eventos.json, informativa.json, atracciones.json, novedades.json
 * y navegacion.json. Las reglas de contenido de las atracciones y de la entrada
 * "rules" de informativa viven en /lib (lib/atracciones.js y lib/reglas.js);
 * aquí solo se inyecta la comprobación del sistema de archivos.
 *
 * Falla con process.exit(1) y mensajes claros si:
 *   - un archivo no parsea como JSON (o su raíz no es un arreglo);
 *   - falta un campo obligatorio del schema documentado en AGENTS.md;
 *   - hay ids duplicados dentro de un mismo archivo;
 *   - una fecha no cumple AAAA-MM-DD o no es una fecha real;
 *   - un href interno no empieza con "/";
 *   - una atracción incumple las reglas de contenido de /lib (escala de
 *     dificultad, longitudes, crédito, duplicados, referencias, imagen inexistente);
 *   - la entrada "rules" incumple las reglas por categorías de /lib (lib/reglas.js).
 */

const fs = require('fs');
const path = require('path');
/* Las reglas de contenido de las atracciones viven en /lib; aquí solo se inyecta
   la comprobación del sistema de archivos (require() de un módulo ESM, Node 22.14). */
const { validarAtracciones, ATRACCIONES_REFERENCIADAS } = require('../lib/atracciones.js');
/* Reglas por categorías de la entrada "rules": misma inyección, validación pura en /lib. */
const { validarReglas } = require('../lib/reglas.js');

const DATA_DIR = path.join(__dirname, '..', 'data');

/* Schema de cada archivo (campos obligatorios documentados en AGENTS.md §4).
   `credito` solo es obligatorio en atracciones.json; en eventos e informativa es
   opcional y por eso no aparece en su `campos`. `enlace` admite una cadena vacía.
   `opcionales` no se exige: solo se informa en el resumen de validación. */
const SCHEMAS = {
  'eventos.json': {
    campos: ['id', 'titulo', 'fecha_inicio', 'fecha_fin', 'hora', 'lugar', 'descripcion', 'imagen', 'enlace'],
    fechas: ['fecha_inicio', 'fecha_fin'],
  },
  'informativa.json': {
    campos: ['id', 'tipo', 'titulo', 'contenido', 'imagen', 'enlace'],
    camposNoTextuales: ['categorias'], // estructura, no texto; la valida validarReglas
    fechas: [],
  },
  'atracciones.json': {
    campos: ['id', 'nombre', 'dificultad', 'descripcion', 'imagen', 'credito'],
    opcionales: ['dificultad_max'],
    fechas: [],
  },
  'novedades.json': {
    campos: ['id', 'badge', 'fecha', 'mensaje'],
    fechas: ['fecha'],
  },
  'navegacion.json': {
    campos: ['href', 'label'],
    fechas: [],
  },
};

let huboErrores = false;

/** Valida que una cadena sea una fecha real en formato AAAA-MM-DD. */
function esFechaValida(valor) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  if (!m) return false;
  const fecha = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return (
    fecha.getFullYear() === Number(m[1]) &&
    fecha.getMonth() === Number(m[2]) - 1 &&
    fecha.getDate() === Number(m[3])
  );
}

/** Valida un archivo. Devuelve la cantidad de entradas válidas (o -1 si no se pudo validar). */
function validarArchivo(nombre) {
  const ruta = path.join(DATA_DIR, nombre);
  const schema = SCHEMAS[nombre];
  let erroresDelArchivo = 0;

  const err = (mensaje) => {
    erroresDelArchivo += 1;
    console.error(`  [ERROR] ${nombre}: ${mensaje}`);
  };

  let contenido;
  let datos;

  try {
    contenido = fs.readFileSync(ruta, 'utf8');
  } catch (e) {
    err(`no se pudo leer el archivo (${e.message})`);
    return -1;
  }

  try {
    datos = JSON.parse(contenido);
  } catch (e) {
    err(`el archivo no parsea como JSON (${e.message})`);
    return -1;
  }

  if (!Array.isArray(datos)) {
    err(`la raíz debe ser un arreglo; se recibió ${typeof datos}`);
    return -1;
  }

  const idsVistos = new Set();

  datos.forEach((entrada, indice) => {
    const donde = `entrada ${indice + 1}`;

    if (entrada === null || typeof entrada !== 'object' || Array.isArray(entrada)) {
      err(`${donde}: debe ser un objeto`);
      return;
    }

    const id = typeof entrada.id === 'string' ? entrada.id : '(sin id)';

    /* id único dentro del archivo */
    if (Object.prototype.hasOwnProperty.call(entrada, 'id') && idsVistos.has(entrada.id)) {
      err(`${donde}: id duplicado "${entrada.id}"`);
    }
    idsVistos.add(entrada.id);

    /* campos obligatorios del schema */
    for (const campo of schema.campos) {
      if (!Object.prototype.hasOwnProperty.call(entrada, campo) || entrada[campo] === undefined || entrada[campo] === null) {
        err(`${donde} (${id}): falta el campo obligatorio "${campo}"`);
        continue;
      }
      if (schema.camposNoTextuales?.includes(campo)) continue; // solo presencia, sin exigir texto
      if (typeof entrada[campo] !== 'string') {
        err(`${donde} (${id}): el campo "${campo}" debe ser textual`);
      }
    }

    /* fechas reales en AAAA-MM-DD */
    for (const campo of schema.fechas) {
      const valor = entrada[campo];
      if (typeof valor !== 'string') continue; // ya se reportó arriba
      if (!esFechaValida(valor)) {
        err(`${donde} (${id}): "${campo}" no es una fecha real AAAA-MM-DD (valor: "${valor}")`);
      }
    }

    /* href interno debe empezar con "/" */
    if (Object.prototype.hasOwnProperty.call(entrada, 'href') && typeof entrada.href === 'string') {
      if (!entrada.href.startsWith('/') && !/^[a-z]+:\/\//i.test(entrada.href)) {
        err(`${donde} (${id}): el href interno debe empezar con "/" (valor: "${entrada.href}")`);
      }
    }
  });

  /* Reglas de contenido de atracciones: viven en /lib (validarAtracciones).
     Aquí solo se inyecta la comprobación de que cada imagen existe en /public. */
  if (nombre === 'atracciones.json') {
    const existeImagen = (rutaPublica) =>
      fs.existsSync(path.join(__dirname, '..', 'public', String(rutaPublica).replace(/^\/+/, '')));
    for (const mensaje of validarAtracciones(datos, {
      existeImagen,
      referenciadas: ATRACCIONES_REFERENCIADAS,
    })) {
      err(mensaje);
    }
  }

  /* Reglas por categorías: la entrada "rules" se valida con validarReglas (lib/reglas.js). */
  if (nombre === 'informativa.json') {
    for (const recorrida of datos) {
      if (recorrida?.id === 'rules') {
        for (const mensaje of validarReglas(recorrida)) {
          err(mensaje);
        }
      } else if (Object.prototype.hasOwnProperty.call(recorrida, 'categorias')) {
        err('solo la entrada "rules" admite "categorias"');
      }
    }
  }

  if (erroresDelArchivo === 0) {
    const opcionales = schema.opcionales || [];
    const detalleOpcionales = opcionales.length ? ` Opcionales: ${opcionales.join(', ')}.` : '';
    console.log(
      `  OK: ${datos.length} ${datos.length === 1 ? 'entrada' : 'entradas'}. Campos validados: ${schema.campos.join(', ')}.${detalleOpcionales}`
    );
  }

  return erroresDelArchivo === 0 ? datos.length : -1;
}

console.log('Validando los JSON de /data contra los schemas de AGENTS.md...\n');

for (const nombre of Object.keys(SCHEMAS)) {
  const resultado = validarArchivo(nombre);
  if (resultado === -1) {
    huboErrores = true;
  }
  console.log('');
}

if (huboErrores === false) {
  console.log('Todos los archivos de /data son válidos.');
} else {
  console.error('\nValidación fallida. Revisa los errores marcados con [ERROR] arriba.');
  process.exit(1);
}
