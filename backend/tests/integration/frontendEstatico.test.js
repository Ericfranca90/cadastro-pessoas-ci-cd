const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const request = require('supertest');
const { criarApp } = require('../../src/app');

describe('frontend servido pelo Express', () => {
  let diretorioTeste;
  let app;

  beforeEach(() => {
    diretorioTeste = fs.mkdtempSync(
      path.join(os.tmpdir(), 'cadastro-integracao-teste-'),
    );
    app = criarApp({
      arquivoDados: path.join(diretorioTeste, 'pessoas.json'),
      obterDataReferencia: () => '2026-10-22',
    });
  });

  afterEach(() => {
    fs.rmdirSync(diretorioTeste);
  });

  test('abre a página inicial com os scripts na ordem esperada', async () => {
    const resposta = await request(app).get('/');

    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toMatch(/text\/html/);
    expect(resposta.text).toContain('<title>Cadastro de Pessoas</title>');

    const posicaoUtils = resposta.text.indexOf('js/utils.js');
    const posicaoApi = resposta.text.indexOf('js/api.js');
    const posicaoApp = resposta.text.indexOf('js/app.js');
    expect(posicaoUtils).toBeGreaterThan(-1);
    expect(posicaoUtils).toBeLessThan(posicaoApi);
    expect(posicaoApi).toBeLessThan(posicaoApp);
  });

  test('serve CSS e JavaScript da interface', async () => {
    for (const [rota, tipo, conteudo] of [
      ['/css/style.css', /text\/css/, '--azul-900'],
      ['/js/utils.js', /javascript/, 'formatarCpf'],
      ['/js/api.js', /javascript/, "'/pessoas'"],
      ['/js/app.js', /javascript/, 'DOMContentLoaded'],
    ]) {
      const resposta = await request(app).get(rota);

      expect(resposta.status).toBe(200);
      expect(resposta.headers['content-type']).toMatch(tipo);
      expect(resposta.text).toContain(conteudo);
    }
  });

  test('mantém /pessoas como API JSON, inclusive sem cadastros', async () => {
    const resposta = await request(app).get('/pessoas');

    expect(resposta.status).toBe(200);
    expect(resposta.headers['content-type']).toMatch(/application\/json/);
    expect(resposta.body).toEqual([]);
  });
});
