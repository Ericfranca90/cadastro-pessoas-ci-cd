const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const request = require('supertest');
const { criarApp } = require('../../src/app');

describe('DELETE /pessoas/:cpf', () => {
  let diretorioTeste;
  let arquivoDados;

  beforeEach(() => {
    diretorioTeste = fs.mkdtempSync(
      path.join(os.tmpdir(), 'cadastro-pessoas-teste-'),
    );
    arquivoDados = path.join(diretorioTeste, 'pessoas.json');
  });

  afterEach(() => {
    if (fs.existsSync(arquivoDados)) {
      fs.unlinkSync(arquivoDados);
    }
    fs.rmdirSync(diretorioTeste);
  });

  test('remove um cadastro e responde 204 sem corpo', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    const cadastro = await request(app).post('/pessoas').send({
      cpf: '00000000009',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    });
    expect(cadastro.status).toBe(201);

    const resposta = await request(app).delete('/pessoas/00000000009');

    expect(resposta.status).toBe(204);
    expect(resposta.text).toBe('');
    expect(JSON.parse(fs.readFileSync(arquivoDados, 'utf8'))).toEqual([]);
  });

  test('responde 404 para CPF não cadastrado', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).delete('/pessoas/00000000010');

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual({ erro: 'Pessoa não encontrada.' });
    expect(fs.existsSync(arquivoDados)).toBe(false);
  });

  test('responde 400 para CPF inválido na URL', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).delete('/pessoas/abc');

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'CPF deve ter 11 dígitos.' });
  });
});
