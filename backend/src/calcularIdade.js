function calcularIdade(dataNascimento, dataReferencia) {
  const [anoNascimento, mesNascimento, diaNascimento] = dataNascimento
    .split('-')
    .map(Number);
  const [anoReferencia, mesReferencia, diaReferencia] = dataReferencia
    .split('-')
    .map(Number);

  const idade = anoReferencia - anoNascimento;
  const aniversarioAindaNaoOcorreu =
    mesReferencia < mesNascimento ||
    (mesReferencia === mesNascimento && diaReferencia < diaNascimento);

  return aniversarioAindaNaoOcorreu ? idade - 1 : idade;
}

module.exports = { calcularIdade };
