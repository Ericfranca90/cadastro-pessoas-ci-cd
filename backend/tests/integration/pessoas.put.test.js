const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const request = require('supertest');
const { criarApp } = require('../../src/app');

describe('PUT /pessoas/:cpf', () => {
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

  test('atualiza nome e nascimento sem alterar o CPF', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    const cadastro = await request(app).post('/pessoas').send({
      cpf: '00000000006',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    });
    expect(cadastro.status).toBe(201);

    const resposta = await request(app).put('/pessoas/00000000006').send({
      cpf: '00000000099',
      nome: '  Nome Atualizado  ',
      dataNascimento: '2001-12-01',
    });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual({
      cpf: '00000000006',
      nome: 'Nome Atualizado',
      dataNascimento: '2001-12-01',
      idade: 24,
    });
    expect(JSON.parse(fs.readFileSync(arquivoDados, 'utf8'))).toEqual([
      {
        cpf: '00000000006',
        nome: 'Nome Atualizado',
        dataNascimento: '2001-12-01',
      },
    ]);
  });

  test('responde 404 para CPF não cadastrado', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).put('/pessoas/00000000007').send({
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    });

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual({ erro: 'Pessoa não encontrada.' });
    expect(fs.existsSync(arquivoDados)).toBe(false);
  });

  test('responde 400 para CPF inválido na URL', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).put('/pessoas/abc').send({
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'CPF deve ter 11 dígitos.' });
  });

  test('responde 400 para corpo ausente sem modificar o cadastro', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    const pessoa = {
      cpf: '00000000008',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    };
    const cadastro = await request(app).post('/pessoas').send(pessoa);
    expect(cadastro.status).toBe(201);

    const resposta = await request(app).put('/pessoas/00000000008');

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'Informe o nome.' });
    expect(JSON.parse(fs.readFileSync(arquivoDados, 'utf8'))).toEqual([pessoa]);
  });
});
