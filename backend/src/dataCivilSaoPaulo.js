function dataCivilSaoPaulo(instante = new Date()) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(instante);
  const campos = Object.fromEntries(
    partes.map(({ type, value }) => [type, value]),
  );

  return `${campos.year}-${campos.month}-${campos.day}`;
}

module.exports = { dataCivilSaoPaulo };
