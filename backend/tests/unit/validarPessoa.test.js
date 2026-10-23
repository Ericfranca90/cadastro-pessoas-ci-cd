const { validarPessoa } = require('../../src/validarPessoa');

describe('validarPessoa', () => {
  const dataReferencia = '2026-10-20';

  function pessoaValida() {
    return {
      cpf: '01234567890',
      nome: 'Ana Souza',
      dataNascimento: '2000-05-20',
    };
  }

  test('retorna null para um cadastro válido', () => {
    expect(validarPessoa(pessoaValida(), dataReferencia)).toBeNull();
  });

  test('rejeita CPF com menos de 11 dígitos', () => {
    const dados = { ...pessoaValida(), cpf: '0123456789' };
    expect(validarPessoa(dados, dataReferencia)).toBe(
      'CPF deve ter 11 dígitos.',
    );
  });

  test('rejeita CPF com 11 caracteres contendo letra', () => {
    const dados = { ...pessoaValida(), cpf: '0123456789A' };
    expect(validarPessoa(dados, dataReferencia)).toBe(
      'CPF deve ter 11 dígitos.',
    );
  });

  test('rejeita nome contendo somente espaços', () => {
    const dados = { ...pessoaValida(), nome: '   ' };
    expect(validarPessoa(dados, dataReferencia)).toBe('Informe o nome.');
  });

  test('rejeita data de nascimento vazia', () => {
    const dados = { ...pessoaValida(), dataNascimento: '' };
    expect(validarPessoa(dados, dataReferencia)).toBe(
      'Informe a data de nascimento.',
    );
  });

  test('rejeita data de nascimento inexistente', () => {
    const dados = { ...pessoaValida(), dataNascimento: '2026-02-30' };
    expect(validarPessoa(dados, dataReferencia)).toBe(
      'Data de nascimento inválida.',
    );
  });

  test('rejeita nascimento posterior à data de referência', () => {
    const dados = { ...pessoaValida(), dataNascimento: '2026-10-21' };
    expect(validarPessoa(dados, dataReferencia)).toBe(
      'A data de nascimento não pode ser no futuro.',
    );
  });
});
