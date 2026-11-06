/**
 * Pruebas de la lógica pura de lib/atracciones.js y del contenido real de
 * data/atracciones.json. Solo módulos de Node: node:test, node:assert y
 * node:fs (la lectura de disco ocurre únicamente aquí, nunca en /lib).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  NIVELES,
  indiceNivel,
  esNivelValido,
  etiquetaNivel,
  claseNivel,
  nivelesDeAtraccion,
  tieneDescripcion,
  ordenarAtracciones,
  normalizarNombre,
  buscarDuplicados,
  validarAtracciones,
  ATRACCIONES_REFERENCIADAS
} from '../lib/atracciones.js';

/** Atracción válida de base, para construir variantes de prueba. */
const base = {
  id: 'prueba',
  nombre: 'Prueba',
  dificultad: 'verde',
  descripcion: '',
  imagen: '',
  credito: 'Captura: comunidad Nacho Bike Park'
};

test('1. NIVELES tiene 5 elementos en orden verde → doble_negro', () => {
  assert.equal(NIVELES.length, 5);
  assert.deepEqual(
    NIVELES.map((nivel) => nivel.valor),
    ['verde', 'azul', 'rojo', 'negro', 'doble_negro']
  );
  assert.deepEqual(
    NIVELES.map((nivel) => nivel.etiqueta),
    ['Verde', 'Azul', 'Rojo', 'Negro', 'Doble negro']
  );
  assert.deepEqual(
    NIVELES.map((nivel) => nivel.descriptor),
    ['Principiantes', 'Intermedio', 'Avanzado', 'Experto', 'Profesional']
  );
});

test('2. ordenarAtracciones devuelve verde, azul, rojo, negro, doble_negro', () => {
  const lista = [
    { id: 'doble', dificultad: 'doble_negro' },
    { id: 'negro', dificultad: 'negro' },
    { id: 'rojo', dificultad: 'rojo' },
    { id: 'azul', dificultad: 'azul' },
    { id: 'verde', dificultad: 'verde' }
  ];
  assert.deepEqual(
    ordenarAtracciones(lista).map((atraccion) => atraccion.id),
    ['verde', 'azul', 'rojo', 'negro', 'doble']
  );
});

test('3. a igual dificultad se respeta el orden de entrada', () => {
  const lista = [
    { id: 'a', dificultad: 'negro' },
    { id: 'b', dificultad: 'azul' },
    { id: 'c', dificultad: 'negro' },
    { id: 'd', dificultad: 'negro' }
  ];
  const ordenados = ordenarAtracciones(lista).map((atraccion) => atraccion.id);
  assert.deepEqual(ordenados, ['b', 'a', 'c', 'd']);
});

test('4. ordenarAtracciones no muta la entrada', () => {
  const lista = [
    { id: 'una', dificultad: 'negro' },
    { id: 'dos', dificultad: 'verde' }
  ];
  const copiaAntes = structuredClone(lista);
  ordenarAtracciones(lista);
  assert.deepEqual(lista, copiaAntes);
});

test('5. lista vacía devuelve lista vacía y de un elemento devuelve ese elemento', () => {
  assert.deepEqual(ordenarAtracciones([]), []);
  const una = [{ id: 'sola', dificultad: 'rojo' }];
  const resultado = ordenarAtracciones(una);
  assert.equal(resultado.length, 1);
  assert.deepEqual(resultado[0], { id: 'sola', dificultad: 'rojo' });
  assert.notEqual(resultado, una);
});

test('6. esNivelValido acepta los 5 y rechaza "Doble negro", "ROJO", "rojo " y ""', () => {
  for (const nivel of NIVELES) {
    assert.equal(esNivelValido(nivel.valor), true, nivel.valor);
  }
  assert.equal(esNivelValido('Doble negro'), false);
  assert.equal(esNivelValido('ROJO'), false);
  assert.equal(esNivelValido('rojo '), false);
  assert.equal(esNivelValido(''), false);
  assert.equal(indiceNivel('doble_negro'), 4);
  assert.equal(indiceNivel('inexistente'), -1);
});

test('7. etiquetaNivel y claseNivel producen "Doble negro" y "badge-doble-negro"', () => {
  assert.equal(etiquetaNivel('doble_negro'), 'Doble negro');
  assert.equal(etiquetaNivel('verde'), 'Verde');
  assert.equal(etiquetaNivel('inexistente'), '');
  assert.equal(claseNivel('doble_negro'), 'badge-doble-negro');
  assert.equal(claseNivel('verde'), 'badge-verde');
  assert.equal(claseNivel('ROJO'), '');
});

test('8. tieneDescripcion: "" y "   " son falsos; con texto es verdadero', () => {
  assert.equal(tieneDescripcion({ descripcion: '' }), false);
  assert.equal(tieneDescripcion({ descripcion: '   ' }), false);
  assert.equal(
    tieneDescripcion({
      descripcion: 'Descripción aprobada de esta atracción con texto suficiente.'
    }),
    true
  );
});

test('9. normalizarNombre quita tildes, mayúsculas, espacios dobles y extremos sin perder palabras', () => {
  assert.equal(normalizarNombre('Línea de dirt jump'), 'linea de dirt jump');
  assert.equal(normalizarNombre('  Zona   de  vuelos  '), 'zona de vuelos');
  assert.equal(normalizarNombre('CLÁSICA'), 'clasica');
  assert.equal(normalizarNombre('Kraken'), 'kraken');
  assert.equal(normalizarNombre(42), '');
  assert.equal(normalizarNombre(undefined), '');
});

test('10. buscarDuplicados detecta exacto, con tilde y con espacios dobles, y no da falsos positivos', () => {
  const lista = [
    { nombre: 'Kraken' },
    { nombre: 'KRÁKEN' },
    { nombre: 'Zona de vuelos' },
    { nombre: 'Zona   de vuelos' },
    { nombre: 'Clásica' }
  ];
  assert.deepEqual(buscarDuplicados(lista), ['kraken', 'zona de vuelos']);
  assert.deepEqual(
    buscarDuplicados([{ nombre: 'Patos' }, { nombre: 'Clásica' }]),
    []
  );
});

test('11. validarAtracciones con campos ausentes devuelve error', () => {
  const errores = validarAtracciones([{}]);
  assert.ok(errores.length > 0);
  assert.ok(errores.some((mensaje) => mensaje.includes('id')));
  assert.ok(errores.some((mensaje) => mensaje.includes('nombre')));
  assert.ok(errores.some((mensaje) => mensaje.includes('dificultad')));
  assert.ok(errores.some((mensaje) => mensaje.includes('crédito')));
  assert.deepEqual(validarAtracciones('no es una lista'), [
    'El contenido de atracciones debe ser una lista de registros.'
  ]);
});

test('12. nombre de 31 caracteres devuelve error', () => {
  const errores = validarAtracciones([
    { ...base, nombre: 'a'.repeat(31) }
  ]);
  assert.ok(errores.some((mensaje) => mensaje.includes('entre 2 y 30 caracteres')));
  assert.deepEqual(
    validarAtracciones([{ ...base, nombre: 'a'.repeat(30) }]),
    []
  );
});

test('13. descripción de 59 y de 221 caracteres devuelve error; la vacía no', () => {
  const corta = validarAtracciones([
    { ...base, descripcion: 'a'.repeat(59), dificultad: 'verde', credito: 'Crédito: prueba' }
  ]);
  assert.ok(corta.some((mensaje) => mensaje.includes('entre 60 y 220 caracteres')));
  const larga = validarAtracciones([{ ...base, descripcion: 'a'.repeat(221) }]);
  assert.ok(larga.some((mensaje) => mensaje.includes('entre 60 y 220 caracteres')));
  assert.deepEqual(
    validarAtracciones([{ ...base, descripcion: 'a'.repeat(60) }]),
    []
  );
  assert.deepEqual(
    validarAtracciones([{ ...base, descripcion: 'a'.repeat(220) }]),
    []
  );
  assert.deepEqual(validarAtracciones([{ ...base, descripcion: '' }]), []);
});

test('14. crédito vacío devuelve error', () => {
  const errores = validarAtracciones([{ ...base, credito: '' }]);
  assert.ok(errores.some((mensaje) => mensaje.includes('crédito de la foto es obligatorio')));
  assert.ok(
    validarAtracciones([{ ...base, credito: '   ' }]).some((mensaje) =>
      mensaje.includes('crédito de la foto es obligatorio')
    )
  );
});

test('15. dificultad fuera de escala devuelve error', () => {
  const errores = validarAtracciones([{ ...base, dificultad: 'platino' }]);
  assert.ok(errores.some((mensaje) => mensaje.includes('fuera de la escala')));
  assert.ok(
    validarAtracciones([{ ...base, dificultad: undefined }]).some((mensaje) =>
      mensaje.includes('fuera de la escala')
    )
  );
});

test('16. existeImagen que devuelve falso produce error', () => {
  const errores = validarAtracciones([{ ...base, imagen: '/images/no-existe.jpg' }], {
    existeImagen: () => false
  });
  assert.ok(errores.some((mensaje) => mensaje.includes('/images/no-existe.jpg')));
  assert.deepEqual(
    validarAtracciones(
      [{ ...base, imagen: '/images/foto.jpg' }],
      { existeImagen: (ruta) => ruta === '/images/foto.jpg' }
    ),
    []
  );
});

test('17. una referencia de otra página inexistente produce error', () => {
  const lista = [
    { ...base, nombre: 'Patos' },
    { ...base, id: 'clasica', nombre: 'Clásica', dificultad: 'azul' },
    { ...base, id: 'kraken', nombre: 'Kraken', dificultad: 'negro' }
  ];
  const errores = validarAtracciones(lista, {
    referenciadas: ATRACCIONES_REFERENCIADAS.concat(['Pump track'])
  });
  assert.ok(errores.some((mensaje) => mensaje.includes('Pump track')));
  assert.deepEqual(
    validarAtracciones(lista, { referenciadas: ATRACCIONES_REFERENCIADAS }),
    []
  );
});

test('18. el JSON real data/atracciones.json pasa la validación: 5 registros y sin duplicados', () => {
  const ruta = new URL('../data/atracciones.json', import.meta.url);
  const lista = JSON.parse(readFileSync(ruta, 'utf8'));
  assert.equal(lista.length, 5);
  assert.deepEqual(
    validarAtracciones(lista, { existeImagen: () => true }),
    [],
    'El real debe pasar con existeImagen simulado a verdadero'
  );
  assert.deepEqual(buscarDuplicados(lista), []);
  assert.deepEqual(
    validarAtracciones(lista, { referenciadas: ATRACCIONES_REFERENCIADAS }),
    [],
    'Las 5 atracciones reales cubren los nombres que la portada menciona'
  );
  assert.ok(
    validarAtracciones(lista, { referenciadas: ['Pump track'] }).some((mensaje) =>
      mensaje.includes('Pump track')
    )
  );
});

test('19. la validación y el orden no consultan el reloj ni el sistema de datos global', () => {
  const originalDate = globalThis.Date;
  globalThis.Date = function relojProhibido() {
    throw new Error('no se debe consultar Date');
  };
  try {
    const lista = [
      { ...base },
      { ...base, id: 'otra', nombre: 'Otra', dificultad: 'negro' }
    ];
    const ordenadas = ordenarAtracciones(lista).map((atraccion) => atraccion.id);
    assert.deepEqual(ordenadas, ['prueba', 'otra']);
    assert.deepEqual(validarAtracciones(lista, { existeImagen: () => true }), []);
  } finally {
    globalThis.Date = originalDate;
  }
});

test('20. un nombre de un solo carácter devuelve error', () => {
  const errores = validarAtracciones([{ ...base, nombre: 'A' }]);
  assert.ok(errores.some((mensaje) => mensaje.includes('entre 2 y 30 caracteres')));
});

test('21. dos atracciones con la misma imagen pasan la validación', () => {
  const lista = [
    { ...base, imagen: '/images/hero-salto-zona-vuelos.jpg', nombre: 'Prueba A' },
    {
      ...base,
      id: 'otra',
      nombre: 'Prueba B',
      dificultad: 'azul',
      imagen: '/images/hero-salto-zona-vuelos.jpg'
    }
  ];
  assert.deepEqual(
    validarAtracciones(lista, { existeImagen: () => true }),
    []
  );
});

test('22. una descripción con <b> y con salto de línea cuenta como texto plano y pasa si su longitud está en rango', () => {
  const texto = '<b>Tramo</b>\n' + 'a'.repeat(70);
  assert.ok(texto.length >= 60 && texto.length <= 220);
  assert.deepEqual(validarAtracciones([{ ...base, descripcion: texto }]), []);
});

test('23. nivelesDeAtraccion: un nivel, dos niveles ascendentes, o lista vacía', () => {
  assert.deepEqual(nivelesDeAtraccion({ dificultad: 'verde' }), ['verde']);
  assert.deepEqual(
    nivelesDeAtraccion({ dificultad: 'verde', dificultad_max: 'rojo' }),
    ['verde', 'rojo']
  );
  assert.deepEqual(
    nivelesDeAtraccion({ dificultad: 'azul', dificultad_max: 'negro' }),
    ['azul', 'negro']
  );
  assert.deepEqual(
    nivelesDeAtraccion({ dificultad: 'verde', dificultad_max: 'platino' }),
    ['verde'],
    'un máximo inválido se descarta y no rompe el nivel mínimo'
  );
  assert.deepEqual(nivelesDeAtraccion({}), []);
  assert.deepEqual(nivelesDeAtraccion(null), []);
  assert.deepEqual(nivelesDeAtraccion(undefined), []);
});

test('24. validarAtracciones acepta dificultad_max mayor y rechaza igual, menor y fuera de escala', () => {
  assert.deepEqual(validarAtracciones([{ ...base, dificultad_max: 'rojo' }]), []);
  assert.deepEqual(
    validarAtracciones([{ ...base, dificultad: 'verde', dificultad_max: 'doble_negro' }]),
    []
  );
  const igual = validarAtracciones([{ ...base, dificultad: 'rojo', dificultad_max: 'rojo' }]);
  assert.ok(igual.some((mensaje) => mensaje.includes('debe ser mayor que la dificultad')));
  const menor = validarAtracciones([{ ...base, dificultad: 'rojo', dificultad_max: 'verde' }]);
  assert.ok(menor.some((mensaje) => mensaje.includes('debe ser mayor que la dificultad')));
  const fuera = validarAtracciones([{ ...base, dificultad_max: 'platino' }]);
  assert.ok(fuera.some((mensaje) => mensaje.includes('fuera de la escala')));
});

test('25. una ficha con rango se ordena por su nivel mínimo, no por el máximo', () => {
  const lista = [
    { id: 'rojo', dificultad: 'rojo' },
    { id: 'rango', dificultad: 'verde', dificultad_max: 'rojo' },
    { id: 'azul', dificultad: 'azul' }
  ];
  assert.deepEqual(
    ordenarAtracciones(lista).map((atraccion) => atraccion.id),
    ['rango', 'azul', 'rojo']
  );
});

test('26. el JSON real declara el rango verde–rojo solo en zona-de-vuelos', () => {
  const ruta = new URL('../data/atracciones.json', import.meta.url);
  const lista = JSON.parse(readFileSync(ruta, 'utf8'));
  const conRango = lista.filter((atraccion) => atraccion.dificultad_max !== undefined);
  assert.deepEqual(conRango.map((atraccion) => atraccion.id), ['zona-de-vuelos']);
  const zona = lista.find((atraccion) => atraccion.id === 'zona-de-vuelos');
  assert.deepEqual(nivelesDeAtraccion(zona), ['verde', 'rojo']);
  assert.deepEqual(validarAtracciones(lista, { existeImagen: () => true }), []);
});
