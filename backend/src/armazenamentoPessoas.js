const fs = require('node:fs');
const path = require('node:path');

function lerPessoas(arquivoDados) {
  try {
    return JSON.parse(fs.readFileSync(arquivoDados, 'utf8'));
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      return [];
    }

    throw erro;
  }
}

function salvarPessoas(arquivoDados, pessoas) {
  fs.mkdirSync(path.dirname(arquivoDados), { recursive: true });
  fs.writeFileSync(arquivoDados, JSON.stringify(pessoas, null, 2), 'utf8');
}

module.exports = { lerPessoas, salvarPessoas };
