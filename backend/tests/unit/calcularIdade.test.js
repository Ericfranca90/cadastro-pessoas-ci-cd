const { calcularIdade } = require('../../src/calcularIdade');

describe('calcularIdade', () => {
  const dataReferencia = '2026-10-20';

  test('retorna 26 quando o aniversário já ocorreu', () => {
    expect(calcularIdade('2000-05-20', dataReferencia)).toBe(26);
  });

  test('retorna 25 quando o aniversário ainda não ocorreu', () => {
    expect(calcularIdade('2000-12-10', dataReferencia)).toBe(25);
  });

  test('retorna 26 no dia do aniversário', () => {
    expect(calcularIdade('2000-10-20', dataReferencia)).toBe(26);
  });
});
