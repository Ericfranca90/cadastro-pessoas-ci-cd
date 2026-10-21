const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { lerPessoas, salvarPessoas } = require('../../src/armazenamentoPessoas');

describe('armazenamento em JSON', () => {
  let diretorioTeste;
  let pastaDados;
  let arquivoDados;

  beforeEach(() => {
    diretorioTeste = fs.mkdtempSync(
      path.join(os.tmpdir(), 'cadastro-pessoas-teste-'),
    );
    pastaDados = path.join(diretorioTeste, 'dados');
    arquivoDados = path.join(pastaDados, 'pessoas.json');
  });

  afterEach(() => {
    if (fs.existsSync(arquivoDados)) {
      fs.unlinkSync(arquivoDados);
    }
    if (fs.existsSync(pastaDados)) {
      fs.rmdirSync(pastaDados);
    }
    fs.rmdirSync(diretorioTeste);
  });

  test('cria a pasta de dados quando necessário', () => {
    const pessoas = [
      {
        cpf: '00000000011',
        nome: 'Pessoa Fictícia',
        dataNascimento: '2000-05-20',
      },
    ];

    salvarPessoas(arquivoDados, pessoas);

    expect(lerPessoas(arquivoDados)).toEqual(pessoas);
  });
});
