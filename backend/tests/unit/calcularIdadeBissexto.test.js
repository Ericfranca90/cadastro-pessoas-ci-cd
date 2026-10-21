const { calcularIdade } = require('../../src/calcularIdade');

describe('aniversário em 29 de fevereiro', () => {
  test('ainda não ocorreu em 28 de fevereiro de um ano não bissexto', () => {
    expect(calcularIdade('2020-02-29', '2021-02-28')).toBe(0);
  });

  test('ocorre em 1º de março de um ano não bissexto', () => {
    expect(calcularIdade('2020-02-29', '2021-03-01')).toBe(1);
  });
});
