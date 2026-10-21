const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const request = require('supertest');
const { iniciarServidor } = require('../../src/servidor');

test('inicia a API em uma porta disponível sem exigir arquivo prévio', async () => {
  const diretorioTeste = fs.mkdtempSync(
    path.join(os.tmpdir(), 'cadastro-pessoas-teste-'),
  );
  const arquivoDados = path.join(diretorioTeste, 'pessoas.json');
  let servidor;

  try {
    servidor = iniciarServidor({
      porta: 0,
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    await once(servidor, 'listening');

    const resposta = await request(servidor).get('/pessoas');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([]);
  } finally {
    if (servidor?.listening) {
      await new Promise((resolve, reject) => {
        servidor.close((erro) => (erro ? reject(erro) : resolve()));
      });
    }
    fs.rmdirSync(diretorioTeste);
  }
});
