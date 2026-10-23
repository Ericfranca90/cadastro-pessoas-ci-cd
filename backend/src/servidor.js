const path = require('node:path');
const { criarApp } = require('./app');
const { dataCivilSaoPaulo } = require('./dataCivilSaoPaulo');

function iniciarServidor({
  porta = Number(process.env.PORT ?? 3000),
  arquivoDados = process.env.ARQUIVO_DADOS ??
    path.join(__dirname, '..', 'data', 'pessoas.json'),
  obterDataReferencia = dataCivilSaoPaulo,
} = {}) {
  return criarApp({ arquivoDados, obterDataReferencia }).listen(porta);
}

if (require.main === module) {
  const servidor = iniciarServidor();
  servidor.on('listening', () => {
    process.stdout.write(
      `API disponível na porta ${servidor.address().port}\n`,
    );
  });
}

module.exports = { iniciarServidor };
