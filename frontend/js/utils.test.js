const { formatarCpf, formatarData, validarPessoa } = require('./utils');

describe('formatarCpf', () => {
  test('formata 11 dígitos no padrão 000.000.000-00', () => {
    expect(formatarCpf('12345678901')).toBe('123.456.789-01');
  });

  test('ignora caracteres que não são números', () => {
    expect(formatarCpf('123.456.789-01')).toBe('123.456.789-01');
  });

  test('formata parcialmente enquanto a pessoa digita', () => {
    expect(formatarCpf('1234')).toBe('123.4');
  });
});

describe('formatarData', () => {
  test('converte AAAA-MM-DD para DD/MM/AAAA', () => {
    expect(formatarData('2000-05-20')).toBe('20/05/2000');
  });
});

describe('validarPessoa', () => {
  const valida = {
    cpf: '123.456.789-01',
    nome: 'Maria Silva',
    dataNascimento: '2000-05-20',
  };

  test('retorna null quando os dados são válidos', () => {
    expect(validarPessoa(valida)).toBeNull();
  });

  test('rejeita CPF com menos de 11 dígitos', () => {
    expect(validarPessoa({ ...valida, cpf: '123' })).toBe(
      'CPF deve ter 11 dígitos.',
    );
  });

  test('rejeita nome vazio', () => {
    expect(validarPessoa({ ...valida, nome: '  ' })).toBe('Informe o nome.');
  });

  test('rejeita data de nascimento vazia', () => {
    expect(validarPessoa({ ...valida, dataNascimento: '' })).toBe(
      'Informe a data de nascimento.',
    );
  });

  test('rejeita data de nascimento no futuro', () => {
    expect(validarPessoa({ ...valida, dataNascimento: '2999-01-01' })).toBe(
      'A data de nascimento não pode ser no futuro.',
    );
  });
});
