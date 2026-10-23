function dataCalendarioValida(valor) {
  if (typeof valor !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return false;
  }

  const data = new Date(`${valor}T00:00:00.000Z`);
  return (
    !Number.isNaN(data.getTime()) && data.toISOString().slice(0, 10) === valor
  );
}

function validarPessoa(dados, dataReferencia) {
  if (typeof dados.cpf !== 'string' || !/^\d{11}$/.test(dados.cpf)) {
    return 'CPF deve ter 11 dígitos.';
  }

  if (typeof dados.nome !== 'string' || !dados.nome.trim()) {
    return 'Informe o nome.';
  }

  if (!dados.dataNascimento) {
    return 'Informe a data de nascimento.';
  }

  const nascimento = dados.dataNascimento;
  if (!dataCalendarioValida(nascimento)) {
    return 'Data de nascimento inválida.';
  }

  if (nascimento > dataReferencia) {
    return 'A data de nascimento não pode ser no futuro.';
  }

  return null;
}

module.exports = { validarPessoa };
