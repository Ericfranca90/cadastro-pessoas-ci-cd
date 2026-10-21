const path = require('node:path');
const os = require('node:os');
const request = require('supertest');
const { criarApp } = require('../../src/app');

test('responde erro JSON para caminho não previsto', async () => {
  const app = criarApp({
    arquivoDados: path.join(os.tmpdir(), 'arquivo-nao-usado-neste-teste.json'),
    obterDataReferencia: () => '2026-10-20',
  });

  const resposta = await request(app).get('/rota-inexistente');

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ erro: 'Rota não encontrada.' });
});
