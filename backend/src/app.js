const express = require('express');
const { validarPessoa } = require('./validarPessoa');
const { lerPessoas, salvarPessoas } = require('./armazenamentoPessoas');
const { normalizarPessoa, pessoaComIdade } = require('./pessoa');

function criarApp({ arquivoDados, obterDataReferencia }) {
  const app = express();

  app.use(express.json());

  app.get('/pessoas', (requisicao, resposta) => {
    const dataReferencia = obterDataReferencia();
    const pessoas = lerPessoas(arquivoDados).map((pessoa) =>
      pessoaComIdade(pessoa, dataReferencia),
    );

    return resposta.status(200).json(pessoas);
  });

  app.post('/pessoas', (requisicao, resposta) => {
    const pessoa = normalizarPessoa(requisicao.body);
    const dataReferencia = obterDataReferencia();
    const erro = validarPessoa(pessoa, dataReferencia);

    if (erro) {
      return resposta.status(400).json({ erro });
    }

    const pessoas = lerPessoas(arquivoDados);
    if (pessoas.some((cadastro) => cadastro.cpf === pessoa.cpf)) {
      return resposta.status(409).json({ erro: 'CPF já cadastrado.' });
    }

    pessoas.push(pessoa);
    salvarPessoas(arquivoDados, pessoas);

    return resposta.status(201).json(pessoaComIdade(pessoa, dataReferencia));
  });

  app.put('/pessoas/:cpf', (requisicao, resposta) => {
    const pessoa = normalizarPessoa(requisicao.body, requisicao.params.cpf);
    const dataReferencia = obterDataReferencia();
    const erro = validarPessoa(pessoa, dataReferencia);

    if (erro) {
      return resposta.status(400).json({ erro });
    }

    const pessoas = lerPessoas(arquivoDados);
    const indice = pessoas.findIndex((cadastro) => cadastro.cpf === pessoa.cpf);
    if (indice === -1) {
      return resposta.status(404).json({ erro: 'Pessoa não encontrada.' });
    }

    pessoas[indice] = pessoa;
    salvarPessoas(arquivoDados, pessoas);

    return resposta.status(200).json(pessoaComIdade(pessoa, dataReferencia));
  });

  app.delete('/pessoas/:cpf', (requisicao, resposta) => {
    const cpf = requisicao.params.cpf;
    if (!/^\d{11}$/.test(cpf)) {
      return resposta.status(400).json({ erro: 'CPF deve ter 11 dígitos.' });
    }

    const pessoas = lerPessoas(arquivoDados);
    const indice = pessoas.findIndex((cadastro) => cadastro.cpf === cpf);
    if (indice === -1) {
      return resposta.status(404).json({ erro: 'Pessoa não encontrada.' });
    }

    pessoas.splice(indice, 1);
    salvarPessoas(arquivoDados, pessoas);
    return resposta.status(204).end();
  });

  app.use((requisicao, resposta) => {
    return resposta.status(404).json({ erro: 'Rota não encontrada.' });
  });

  app.use((erro, requisicao, resposta, proximo) => {
    if (resposta.headersSent) {
      return proximo(erro);
    }

    if (erro.type === 'entity.parse.failed') {
      return resposta.status(400).json({ erro: 'JSON inválido.' });
    }

    return resposta.status(500).json({ erro: 'Erro interno do servidor.' });
  });

  return app;
}

module.exports = { criarApp };
