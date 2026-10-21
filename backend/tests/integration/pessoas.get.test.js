const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const request = require('supertest');
const { criarApp } = require('../../src/app');

describe('GET /pessoas', () => {
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

  test('retorna array vazio quando não há cadastros', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).get('/pessoas');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([]);
  });

  test('lê o cadastro salvo em outra instância e calcula a idade na resposta', async () => {
    const opcoes = {
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    };
    const primeiraApp = criarApp(opcoes);
    const cadastro = await request(primeiraApp).post('/pessoas').send({
      cpf: '00000000001',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2010-12-01',
    });
    expect(cadastro.status).toBe(201);

    const segundaApp = criarApp(opcoes);
    const resposta = await request(segundaApp).get('/pessoas');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual([
      {
        cpf: '00000000001',
        nome: 'Pessoa Fictícia',
        dataNascimento: '2010-12-01',
        idade: 15,
      },
    ]);
  });

  test('recalcula a idade quando a data de referência muda', async () => {
    fs.writeFileSync(
      arquivoDados,
      JSON.stringify([
        {
          cpf: '00000000012',
          nome: 'Pessoa Fictícia',
          dataNascimento: '2000-05-20',
        },
      ]),
      'utf8',
    );
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2027-05-21',
    });

    const resposta = await request(app).get('/pessoas');

    expect(resposta.status).toBe(200);
    expect(resposta.body[0].idade).toBe(27);
    expect(
      JSON.parse(fs.readFileSync(arquivoDados, 'utf8'))[0],
    ).not.toHaveProperty('idade');
  });

  test('responde erro interno sem substituir arquivo JSON corrompido', async () => {
    fs.writeFileSync(arquivoDados, '{invalido', 'utf8');
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).get('/pessoas');

    expect(resposta.status).toBe(500);
    expect(resposta.body).toEqual({ erro: 'Erro interno do servidor.' });
    expect(fs.readFileSync(arquivoDados, 'utf8')).toBe('{invalido');
  });
});
