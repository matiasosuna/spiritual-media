import test from 'node:test';
import assert from 'node:assert/strict';
import { siguiente, seguirCadena, anotarPractica, buscarDuplicadoIG, assetTikTok } from './publicar.mjs';

const ahora = Date.parse('2026-11-02T14:00:00Z');
const it = (id, cuando, extra = {}) => ({ id, cuando, archivo: `${id}.mp4`, instagram: { caption: id }, youtube: { titulo: id }, tiktok: {}, ...extra });

test('siguiente: publica el vencido más viejo', () => {
  const cal = { separacion_minima_horas: 5, items: [it('b', '2026-11-02T12:00:00Z'), it('a', '2026-11-02T09:00:00Z')] };
  assert.equal(siguiente(cal, 'instagram', ahora).item.id, 'a');
});
test('siguiente: lo futuro espera', () => {
  const cal = { items: [it('a', '2026-11-03T09:00:00Z')] };
  assert.equal(siguiente(cal, 'instagram', ahora).item, null);
});
test('siguiente: respeta la separación de 5 h (2 por día, sin ráfagas)', () => {
  const a = it('a', '2026-11-02T09:00:00Z'); a.instagram.publicado = { fecha: '2026-11-02T12:00:00Z' };
  const cal = { separacion_minima_horas: 5, items: [a, it('b', '2026-11-02T13:00:00Z')] };
  assert.equal(siguiente(cal, 'instagram', ahora).item, null);
  assert.equal(siguiente(cal, 'instagram', Date.parse('2026-11-02T17:01:00Z')).item.id, 'b');
});
test('cadena: se corta en pausa o sin pendientes', () => {
  assert.equal(seguirCadena({ pausado: true, items: [it('a', '2026-11-02T09:00:00Z')] }), false);
  assert.equal(seguirCadena({ items: [] }), false);
  assert.equal(seguirCadena({ items: [it('a', '2026-11-02T09:00:00Z')] }), true);
});
test('journal: el primer reel de la práctica la desbloquea, los siguientes no la pisan', () => {
  const pub = {};
  assert.equal(anotarPractica(pub, { practica: 'laqi' }, { fecha: '2026-11-02T12:00:00Z', permalink: 'https://ig/1' }), true);
  assert.deepEqual(pub.laqi, { desde: '2026-11-02', video: 'https://ig/1' });
  assert.equal(anotarPractica(pub, { practica: 'laqi' }, { fecha: '2026-11-05T12:00:00Z', permalink: 'https://ig/2' }), false);
  assert.equal(anotarPractica(pub, {}, { fecha: '2026-11-05T12:00:00Z' }), false);
});
test('duplicados: compara la primera línea del caption', () => {
  assert.equal(buscarDuplicadoIG([{ id: '1', caption: 'Hola\nresto' }], 'Hola\notro').id, '1');
});
test('tiktok: usa tiktok-<id>.mp4 salvo que el ítem diga otro archivo', () => {
  assert.equal(assetTikTok({ id: 'x', tiktok: {} }), 'tiktok-x.mp4');
  assert.equal(assetTikTok({ id: 'x', tiktok: { archivo: 'x.mp4' } }), 'x.mp4');
});
