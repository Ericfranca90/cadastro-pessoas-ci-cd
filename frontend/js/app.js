const { api, utils } =
  typeof module !== 'undefined'
    ? { api: require('./api'), utils: require('./utils') }
    : { api: window, utils: window };

let cpfEmEdicao = null;

function obterElemento(id) {
  return document.getElementById(id);
}

function mostrarMensagem(texto, tipo = '') {
  const mensagem = obterElemento('mensagem');
  mensagem.textContent = texto;
  mensagem.className = tipo ? `mensagem ${tipo}` : 'mensagem';
}

function limparMensagem() {
  mostrarMensagem('');
}

function lerFormulario() {
  return {
    cpf: obterElemento('cpf').value.replace(/\D/g, ''),
    nome: obterElemento('nome').value.trim(),
    dataNascimento: obterElemento('dataNascimento').value,
  };
}

function criarCelula(texto) {
  const celula = document.createElement('td');
  celula.textContent = texto;
  return celula;
}

function criarBotao(texto, classe, aoClicar) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.textContent = texto;
  botao.className = classe;
  botao.addEventListener('click', aoClicar);
  return botao;
}

function renderizarLista(pessoas) {
  const corpo = obterElemento('lista-pessoas');
  corpo.innerHTML = '';

  pessoas.forEach((pessoa) => {
    const linha = document.createElement('tr');
    linha.appendChild(criarCelula(utils.formatarCpf(pessoa.cpf)));
    linha.appendChild(criarCelula(pessoa.nome));
    linha.appendChild(criarCelula(utils.formatarData(pessoa.dataNascimento)));
    linha.appendChild(criarCelula(String(pessoa.idade)));

    const acoes = document.createElement('td');
    acoes.appendChild(
      criarBotao('Editar', 'btn-editar', () => entrarModoEdicao(pessoa)),
    );
    acoes.appendChild(
      criarBotao('Excluir', 'btn-excluir', () => tratarExclusao(pessoa)),
    );
    linha.appendChild(acoes);

    corpo.appendChild(linha);
  });

  obterElemento('vazio').hidden = pessoas.length > 0;
}

async function carregarPessoas() {
  try {
    renderizarLista(await api.listarPessoas());
  } catch {
    mostrarMensagem('Não foi possível carregar as pessoas.', 'erro');
  }
}

function entrarModoEdicao(pessoa) {
  cpfEmEdicao = pessoa.cpf;
  obterElemento('cpf').value = utils.formatarCpf(pessoa.cpf);
  obterElemento('cpf').disabled = true;
  obterElemento('nome').value = pessoa.nome;
  obterElemento('dataNascimento').value = pessoa.dataNascimento;
  obterElemento('titulo-form').textContent = 'Editar pessoa';
  obterElemento('btn-cancelar').hidden = false;
  limparMensagem();
}

function sairDoModoEdicao() {
  cpfEmEdicao = null;
  obterElemento('form-pessoa').reset();
  obterElemento('cpf').disabled = false;
  obterElemento('titulo-form').textContent = 'Nova pessoa';
  obterElemento('btn-cancelar').hidden = true;
}

async function salvarPessoa(pessoa) {
  if (cpfEmEdicao) {
    await api.atualizarPessoa(cpfEmEdicao, {
      nome: pessoa.nome,
      dataNascimento: pessoa.dataNascimento,
    });
    return 'Pessoa atualizada com sucesso.';
  }
  await api.cadastrarPessoa(pessoa);
  return 'Pessoa cadastrada com sucesso.';
}

async function tratarEnvio(evento) {
  evento.preventDefault();
  const pessoa = lerFormulario();

  const erroValidacao = utils.validarPessoa(pessoa);
  if (erroValidacao) {
    mostrarMensagem(erroValidacao, 'erro');
    return;
  }

  try {
    const sucesso = await salvarPessoa(pessoa);
    sairDoModoEdicao();
    mostrarMensagem(sucesso, 'sucesso');
    await carregarPessoas();
  } catch (erro) {
    mostrarMensagem(erro.message, 'erro');
  }
}

async function tratarExclusao(pessoa) {
  if (!window.confirm(`Excluir ${pessoa.nome}?`)) return;

  try {
    await api.excluirPessoa(pessoa.cpf);
    await carregarPessoas();
  } catch (erro) {
    mostrarMensagem(erro.message, 'erro');
  }
}

function iniciar() {
  cpfEmEdicao = null;

  const campoCpf = obterElemento('cpf');
  campoCpf.addEventListener('input', () => {
    campoCpf.value = utils.formatarCpf(campoCpf.value);
  });
  obterElemento('form-pessoa').addEventListener('submit', tratarEnvio);
  obterElemento('btn-cancelar').addEventListener('click', () => {
    sairDoModoEdicao();
    limparMensagem();
  });

  return carregarPessoas();
}

if (typeof module !== 'undefined') {
  module.exports = { renderizarLista, carregarPessoas, iniciar };
} else {
  document.addEventListener('DOMContentLoaded', iniciar);
}
