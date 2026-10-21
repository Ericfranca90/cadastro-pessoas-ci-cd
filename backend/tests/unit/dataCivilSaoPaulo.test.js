const { dataCivilSaoPaulo } = require('../../src/dataCivilSaoPaulo');

describe('data civil em São Paulo', () => {
  test('mantém o dia anterior quando ainda não virou a data local', () => {
    expect(dataCivilSaoPaulo(new Date('2026-10-21T01:30:00Z'))).toBe(
      '2026-10-20',
    );
  });

  test('avança o dia após a meia-noite local', () => {
    expect(dataCivilSaoPaulo(new Date('2026-10-21T04:00:00Z'))).toBe(
      '2026-10-21',
    );
  });
});
