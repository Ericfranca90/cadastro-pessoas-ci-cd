const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const request = require('supertest');
const { criarApp } = require('../../src/app');

describe('POST /pessoas', () => {
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

  test('cadastra a pessoa, calcula a idade e persiste os dados sem a idade', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).post('/pessoas').send({
      cpf: '01234567890',
      nome: '  Ana Souza  ',
      dataNascimento: '2000-05-20',
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual({
      cpf: '01234567890',
      nome: 'Ana Souza',
      dataNascimento: '2000-05-20',
      idade: 26,
    });

    const cadastros = JSON.parse(fs.readFileSync(arquivoDados, 'utf8'));
    expect(cadastros).toEqual([
      {
        cpf: '01234567890',
        nome: 'Ana Souza',
        dataNascimento: '2000-05-20',
      },
    ]);
  });

  test('rejeita CPF já cadastrado sem criar outro registro', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    const pessoa = {
      cpf: '00000000002',
      nome: 'Pessoa Fictícia',
      dataNascimento: '1999-01-01',
    };

    const primeiraResposta = await request(app).post('/pessoas').send(pessoa);
    const segundaResposta = await request(app).post('/pessoas').send(pessoa);

    expect(primeiraResposta.status).toBe(201);
    expect(segundaResposta.status).toBe(409);
    expect(segundaResposta.body).toEqual({ erro: 'CPF já cadastrado.' });
    expect(JSON.parse(fs.readFileSync(arquivoDados, 'utf8'))).toEqual([pessoa]);
  });

  test.each([
    [
      'CPF curto',
      { cpf: '123', nome: 'Pessoa Fictícia', dataNascimento: '2000-05-20' },
      'CPF deve ter 11 dígitos.',
    ],
    [
      'nome vazio',
      { cpf: '00000000003', nome: '   ', dataNascimento: '2000-05-20' },
      'Informe o nome.',
    ],
    [
      'data inexistente',
      {
        cpf: '00000000003',
        nome: 'Pessoa Fictícia',
        dataNascimento: '2026-02-30',
      },
      'Data de nascimento inválida.',
    ],
    [
      'data futura',
      {
        cpf: '00000000003',
        nome: 'Pessoa Fictícia',
        dataNascimento: '2026-10-21',
      },
      'A data de nascimento não pode ser no futuro.',
    ],
    ['corpo ausente', undefined, 'CPF deve ter 11 dígitos.'],
    ['corpo em array', [], 'CPF deve ter 11 dígitos.'],
  ])('responde 400 para %s', async (descricao, corpo, mensagem) => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    const pedido = request(app).post('/pessoas');
    const resposta =
      corpo === undefined ? await pedido : await pedido.send(corpo);

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: mensagem });
    expect(fs.existsSync(arquivoDados)).toBe(false);
  });

  test('ignora campos extras recebidos no cadastro', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    const resposta = await request(app).post('/pessoas').send({
      cpf: '00000000004',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
      idade: 99,
      campoExtra: 'não deve ser salvo',
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual({
      cpf: '00000000004',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
      idade: 26,
    });
    expect(JSON.parse(fs.readFileSync(arquivoDados, 'utf8'))).toEqual([
      {
        cpf: '00000000004',
        nome: 'Pessoa Fictícia',
        dataNascimento: '2000-05-20',
      },
    ]);
  });

  test('responde JSON 400 para corpo JSON malformado', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app)
      .post('/pessoas')
      .set('Content-Type', 'application/json')
      .send('{"cpf":');

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'JSON inválido.' });
    expect(fs.existsSync(arquivoDados)).toBe(false);
  });

  test.each(['null', '"texto"', '42'])(
    'responde 400 para corpo JSON que não é objeto: %s',
    async (corpo) => {
      const app = criarApp({
        arquivoDados,
        obterDataReferencia: () => '2026-10-20',
      });

      const resposta = await request(app)
        .post('/pessoas')
        .set('Content-Type', 'application/json')
        .send(corpo);

      expect(resposta.status).toBe(400);
      expect(resposta.body).toHaveProperty('erro');
      expect(fs.existsSync(arquivoDados)).toBe(false);
    },
  );

  test('não sobrescreve arquivo corrompido e responde erro interno genérico', async () => {
    const app = criarApp({
      arquivoDados,
      obterDataReferencia: () => '2026-10-20',
    });
    fs.writeFileSync(arquivoDados, '{invalido', 'utf8');

    const resposta = await request(app).post('/pessoas').send({
      cpf: '00000000005',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    });

    expect(resposta.status).toBe(500);
    expect(resposta.body).toEqual({ erro: 'Erro interno do servidor.' });
    expect(fs.readFileSync(arquivoDados, 'utf8')).toBe('{invalido');
  });

  test('responde 500 para falha de acesso ao armazenamento', async () => {
    const app = criarApp({
      arquivoDados: diretorioTeste,
      obterDataReferencia: () => '2026-10-20',
    });

    const resposta = await request(app).post('/pessoas').send({
      cpf: '00000000013',
      nome: 'Pessoa Fictícia',
      dataNascimento: '2000-05-20',
    });

    expect(resposta.status).toBe(500);
    expect(resposta.body).toEqual({ erro: 'Erro interno do servidor.' });
  });
});
