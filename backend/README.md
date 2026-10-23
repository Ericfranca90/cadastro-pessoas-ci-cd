# Backend do cadastro de pessoas

API em JavaScript com Express e armazenamento em arquivo JSON local. A proposta técnica documentada no PR #4 foi usada como referência e pode ser ajustada por Eric durante a integração.

## Executar

Na raiz do projeto, com Node.js 24 ou mais recente:

```powershell
npm ci
npm start
```

A API ficará disponível em `http://localhost:3000/pessoas`. O arquivo de dados padrão é `backend/data/pessoas.json`; ele é criado quando o primeiro cadastro é salvo e não é enviado ao Git. Para mudar a porta ou o arquivo nesta sessão do PowerShell:

```powershell
$env:PORT = '3001'
$env:ARQUIVO_DADOS = 'C:\caminho\para\pessoas.json'
npm start
```

O caminho acima é apenas um exemplo: escolha um caminho válido no seu computador. Não use dados pessoais reais nos testes.

## Rotas

| Método | Caminho         | Resultado                                                                           |
| ------ | --------------- | ----------------------------------------------------------------------------------- |
| GET    | `/pessoas`      | `200` e array de pessoas, com idade calculada.                                      |
| POST   | `/pessoas`      | `201` e pessoa criada; recebe `cpf`, `nome` e `dataNascimento`.                     |
| PUT    | `/pessoas/:cpf` | `200` e pessoa atualizada; recebe `nome` e `dataNascimento`; o CPF da URL não muda. |
| DELETE | `/pessoas/:cpf` | `204` sem corpo ao excluir.                                                         |

Os erros usam `{ "erro": "mensagem" }` e os códigos `400`, `404`, `409` ou `500`. CPF é uma string de 11 dígitos, sem validação dos dígitos verificadores. A idade usa a data civil de `America/Sao_Paulo` e é calculada ao responder, nunca gravada no JSON.

## Testar

Na raiz do projeto:

```powershell
npm test -- --runInBand
npm run lint
```

Os testes HTTP usam arquivos temporários separados dos dados locais. O frontend já foi desenvolvido; integrá-lo à API é a próxima etapa de Eric. Docker e GitHub Actions serão tratados em etapas posteriores.
