/**
 * Pruebas de la lógica pura de lib/reglas.js y del contenido real de
 * data/informativa.json (entrada "rules"). La lectura de disco vive solo aquí.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  CATEGORIAS,
  CARACTERES,
  MAX_NORMA,
  MAX_INTRO,
  normalizarReglas,
  validarReglas,
  etiquetaCaracter
} from '../lib/reglas.js';

/** Entrada válida de base con las 3 categorías canónicas, para variantes de prueba. */
const base = {
  contenido: 'Reglas de la comunidad Nacho Bike Park en el cerro.',
  credito: 'Captura: comunidad Nacho Bike Park',
  categorias: CATEGORIAS.map((c, i) => ({
    id: c.id,
    titulo: c.titulo,
    normas: [{ texto: `Norma de prueba ${i + 1} de ${c.titulo.toLowerCase()}.`, caracter: 'obligatoria' }]
  }))
};

/** Variante de base que reemplaza de una vez una sola categoría completa. */
const conCategoria = (id, categoria) => ({
  ...base,
  categorias: base.categorias.map((c) => (c.id === id ? categoria : c))
});

test('RF-1: normalizarReglas ordena las categorías canónicas', () => {
  const entrada = {
    contenido: 'Intro de prueba.',
    categorias: [
      { id: 'en-el-parque', titulo: 'En el parque', normas: [{ texto: 'Norma del parque.', caracter: 'obligatoria' }] },
      { id: 'seguridad', titulo: 'Seguridad', normas: [{ texto: 'Norma de seguridad.', caracter: 'obligatoria' }] },
      { id: 'en-la-pista', titulo: 'En la pista', normas: [{ texto: 'Norma de pista.', caracter: 'obligatoria' }] }
    ]
  };
  const salida = normalizarReglas(entrada);
  assert.deepEqual(salida.categorias.map((c) => c.id), ['seguridad', 'en-la-pista', 'en-el-parque']);
  assert.equal(salida.intro, 'Intro de prueba.');
});

test('RF-1: normalizarReglas no altera el texto ni el carácter de las normas', () => {
  const norma = { texto: '  Casco obligatorio  ', caracter: 'obligatoria' };
  const salida = normalizarReglas({
    contenido: 'Intro.',
    categorias: [{ id: 'seguridad', titulo: 'Seguridad', normas: [norma] }]
  });
  assert.deepEqual(salida.categorias[0].normas, [{ texto: '  Casco obligatorio  ', caracter: 'obligatoria' }]);
  // sin categorías extra en la entrada, la salida no inventa categorías
  assert.deepEqual(salida.categorias, salida.categorias.slice(0, 1));
  assert.deepEqual(CATEGORIAS.map((c) => c.titulo), ['Seguridad', 'En la pista', 'En el parque']);
});

test('RF-4: etiquetaCaracter devuelve Obligatoria o Recomendada', () => {
  assert.equal(etiquetaCaracter('obligatoria'), 'Obligatoria');
  assert.equal(etiquetaCaracter('recomendada'), 'Recomendada');
  assert.deepEqual(CARACTERES, ['obligatoria', 'recomendada']);
  assert.equal(etiquetaCaracter('OBLIGATORIA'), '');
  assert.equal(etiquetaCaracter(''), '');
});

test('RF-3: validarReglas rechaza una intro que reproduce una norma', () => {
  const textoNorma = 'Casco obligatorio para bajar a la pista.';
  const entrada = {
    intro: 'Recordatorio: ' + textoNorma,
    credito: 'Captura: comunidad Nacho Bike Park',
    categorias: [
      {
        id: 'seguridad',
        titulo: 'Seguridad',
        normas: [{ texto: textoNorma, caracter: 'obligatoria' }]
      }
    ]
  };
  const errores = validarReglas(entrada);
  assert.ok(errores.length > 0);
  assert.ok(errores.some((mensaje) => mensaje.includes('intro')));
});

test('RNF-1: validarReglas rechaza una norma de más de 140 caracteres', () => {
  assert.equal(MAX_NORMA, 140);
  const larga = validarReglas(
    conCategoria('seguridad', {
      id: 'seguridad',
      titulo: 'Seguridad',
      normas: [{ texto: 'a'.repeat(MAX_NORMA + 1), caracter: 'obligatoria' }]
    })
  );
  assert.ok(larga.some((mensaje) => mensaje.includes('140')));
  // en el límite exacto pasa
  const limite = validarReglas(
    conCategoria('seguridad', {
      id: 'seguridad',
      titulo: 'Seguridad',
      normas: [{ texto: 'a'.repeat(MAX_NORMA), caracter: 'obligatoria' }]
    })
  );
  assert.deepEqual(limite, []);
  assert.equal(MAX_INTRO, 220);
});

test('RF-8: validarReglas rechaza normas duplicadas', () => {
  const entrada = {
    contenido: base.contenido,
    credito: base.credito,
    categorias: [
      {
        id: 'seguridad',
        titulo: 'Seguridad',
        normas: [
          { texto: 'Casco obligatorio para bajar.', caracter: 'obligatoria' },
          { texto: 'CASCO OBLIGATORIO PARA BAJAR.', caracter: 'recomendada' }
        ]
      }
    ]
  };
  const errores = validarReglas(entrada);
  assert.ok(errores.length > 0);
  assert.ok(errores.some((mensaje) => mensaje.includes('repetida')));
});

test('CL-6: validarReglas rechaza una categoría sin normas', () => {
  const errores = validarReglas({
    contenido: base.contenido,
    credito: base.credito,
    categorias: [
      { id: 'seguridad', titulo: 'Seguridad', normas: [] }
    ]
  });
  assert.ok(errores.some((mensaje) => mensaje.toLowerCase().includes('seguridad')));
});

test('CL-7: validarReglas rechaza un carácter desconocido', () => {
  const errores = validarReglas(
    conCategoria('seguridad', {
      id: 'seguridad',
      titulo: 'Seguridad',
      normas: [{ texto: 'Casco obligatorio para bajar.', caracter: 'opcional' }]
    })
  );
  assert.ok(errores.some((mensaje) => mensaje.toLowerCase().includes('carácter') || mensaje.toLowerCase().includes('caracter')));
});

test('RF-1: validarReglas rechaza una categoría canónica ausente', () => {
  const entrada = {
    ...base,
    categorias: base.categorias.filter((c) => c.id !== 'en-el-parque')
  };
  const errores = validarReglas(entrada);
  assert.ok(errores.some((mensaje) => mensaje.includes('en-el-parque')));
});

test('RF-10: el contenido real de data/informativa.json pasa validarReglas sin errores', () => {
  const ruta = new URL('../data/informativa.json', import.meta.url);
  const lista = JSON.parse(readFileSync(ruta, 'utf8'));
  const reglas = lista.find((seccion) => seccion.id === 'rules');
  assert.ok(reglas, 'la entrada rules debe existir en informativa.json');
  assert.deepEqual(validarReglas(reglas), []);
});
