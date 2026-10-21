const { calcularIdade } = require('./calcularIdade');

function normalizarPessoa(entrada, cpf = entrada?.cpf) {
  const dados = entrada && typeof entrada === 'object' ? entrada : {};

  return {
    cpf,
    nome: typeof dados.nome === 'string' ? dados.nome.trim() : dados.nome,
    dataNascimento: dados.dataNascimento,
  };
}

function pessoaComIdade(pessoa, dataReferencia) {
  return {
    ...pessoa,
    idade: calcularIdade(pessoa.dataNascimento, dataReferencia),
  };
}

module.exports = { normalizarPessoa, pessoaComIdade };
