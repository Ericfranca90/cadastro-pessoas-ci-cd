# Proposta de contrato da API — registro da etapa de planejamento

Este documento registra a proposta de comunicação entre o frontend e o backend do cadastro de pessoas, elaborada antes da implementação da API. Naquela etapa, o backend, o armazenamento em JSON e a execução conjunta ainda não estavam implementados. As referências a branches, PRs e trabalho futuro abaixo retratam aquele momento, não o estado atual do projeto.

O desenvolvimento posterior da API e da integração foi realizado em branches próprias. Isso não transforma esta proposta em uma aprovação formal da dupla; sua compatibilidade deve ser verificada na integração final.

## Referências consultadas

- `origin/main` em `20a9d16`: primeiro frontend já mesclado, incluindo `frontend/index.html`, `frontend/js/utils.js` e seus testes.
- `origin/frontend` em `502e756` (PR #3, aberto): `frontend/README.md`, `frontend/js/api.js`, `frontend/js/app.js`, `frontend/js/utils.js`, `frontend/index.html` e os testes `api.test.js`, `app.test.js` e `utils.test.js`.

Na data desta análise, o conteúdo do PR #3 foi **consultado**, mas ainda não estava na `main` nem havia sido copiado para esta branch. Essa afirmação é um registro histórico, não uma descrição da situação atual dos PRs.

## Comportamentos já esperados pelo frontend

O frontend chama as rotas relativas `GET /pessoas`, `POST /pessoas`, `PUT /pessoas/:cpf` e `DELETE /pessoas/:cpf`. No cadastro envia `cpf`, `nome` e `dataNascimento`; na edição usa o CPF na URL e envia apenas `nome` e `dataNascimento`. Antes de enviar, retira a pontuação do CPF e os espaços das extremidades do nome.

A listagem espera um **array direto** de pessoas, sem `{ "pessoas": [...] }`. A tabela mostra `cpf`, `nome`, `dataNascimento` e a `idade` recebida do backend. Ao receber um erro, o frontend procura a mensagem em `erro`. Na exclusão, trata a resposta `204` sem ler JSON. O frontend consultado naquela etapa não dependia do corpo retornado por cadastro ou edição, embora as respostas abaixo proponham devolver a pessoa.

## Definições propostas para o backend

As requisições com corpo e as respostas com corpo usarão JSON (`Content-Type: application/json`). Todas as pessoas retornadas terão o formato:

```json
{
  "cpf": "01234567890",
  "nome": "Ana Souza",
  "dataNascimento": "2000-05-20",
  "idade": 26
}
```

| Ação                   | Entrada                                 | Resposta proposta                                                      |
| ---------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `GET /pessoas`         | Sem corpo                               | `200` e array de pessoas; sem registros, `[]`.                         |
| `POST /pessoas`        | `cpf`, `nome`, `dataNascimento` em JSON | `201` e pessoa cadastrada com `idade`.                                 |
| `PUT /pessoas/:cpf`    | `nome`, `dataNascimento` em JSON        | `200` e pessoa atualizada com `idade`. O CPF da URL permanece o mesmo. |
| `DELETE /pessoas/:cpf` | Sem corpo                               | `204`, sem corpo de resposta.                                          |

Não estão previstas outras rotas, paginação ou autenticação.

### Campos e validação

- `cpf`: string com **exatamente 11 dígitos**, inclusive zeros iniciais. Requisições, respostas e URL usam somente dígitos. Cada CPF identifica um único cadastro. Não haverá cálculo dos dígitos verificadores nem consulta externa.
- `nome`: string obrigatória; os espaços nas extremidades são removidos antes de salvar e retornar. O resultado não pode ficar vazio.
- `dataNascimento`: string no formato `AAAA-MM-DD`, representando uma **data de calendário**, sem horário. Deve existir no calendário e não pode ser posterior à data atual adotada pelo servidor. Uma data como `2026-02-30` é inválida.
- `idade`: número inteiro calculado pelo backend a partir de `dataNascimento`. O formulário não o envia e o arquivo JSON não o guarda como valor fixo; o backend o calcula ao responder.

**Regra proposta para idade:** comparar ano, mês e dia do nascimento com a data civil atual em `America/Sao_Paulo`. Subtrair um ano se o aniversário ainda não ocorreu no ano corrente. Para quem nasceu em **29 de fevereiro**, considerar o aniversário em **1º de março** nos anos não bissextos. O fuso e o tratamento de 29 de fevereiro foram escolhas desta proposta inicial e devem ser confrontados com a implementação e os testes.

### Exemplos com data de referência fixa

As idades a seguir usam **19/10/2026 em `America/Sao_Paulo`** apenas para tornar os exemplos verificáveis. Em uso real, a idade será recalculada conforme a data atual.

Cadastro:

```http
POST /pessoas
Content-Type: application/json

{"cpf":"01234567890","nome":"  Ana Souza  ","dataNascimento":"2000-05-20"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"cpf":"01234567890","nome":"Ana Souza","dataNascimento":"2000-05-20","idade":26}
```

Listagem, incluindo o caso vazio:

```http
GET /pessoas

HTTP/1.1 200 OK
Content-Type: application/json

[{"cpf":"01234567890","nome":"Ana Souza","dataNascimento":"2000-05-20","idade":26}]
```

Sem pessoas, o corpo do `200` é `[]`.

Edição e exclusão:

```http
PUT /pessoas/01234567890
Content-Type: application/json

{"nome":"Ana Lima","dataNascimento":"2000-05-20"}

HTTP/1.1 200 OK
Content-Type: application/json

{"cpf":"01234567890","nome":"Ana Lima","dataNascimento":"2000-05-20","idade":26}
```

```http
DELETE /pessoas/01234567890

HTTP/1.1 204 No Content
```

### Erros propostos

Toda resposta de erro terá JSON no formato `{ "erro": "mensagem" }`, com `Content-Type: application/json`. Mensagens de falhas internas não revelarão detalhes técnicos.

| Código | Situação                              | Exemplo de corpo                             |
| ------ | ------------------------------------- | -------------------------------------------- |
| `400`  | Campos inválidos ou JSON malformado   | `{ "erro": "Data de nascimento inválida." }` |
| `404`  | CPF inexistente na edição ou exclusão | `{ "erro": "Pessoa não encontrada." }`       |
| `409`  | CPF já cadastrado                     | `{ "erro": "CPF já cadastrado." }`           |
| `500`  | Falha interna                         | `{ "erro": "Erro interno do servidor." }`    |

## Compatibilidade com o frontend consultado

| Expectativa do frontend                               | Definição proposta                       | Situação                                                     |
| ----------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `GET /pessoas` retorna array direto                   | `200` com array; vazio é `[]`            | Compatível.                                                  |
| Campo `dataNascimento` em `AAAA-MM-DD`                | Mesmo nome e formato                     | Compatível.                                                  |
| CPF sem pontuação identifica edição e exclusão na URL | `:cpf` contém 11 dígitos                 | Compatível.                                                  |
| Edição envia `nome` e `dataNascimento`, sem novo CPF  | CPF da URL é imutável                    | Compatível.                                                  |
| Erro é lido pelo campo `erro`                         | `{ "erro": "mensagem" }`                 | Compatível.                                                  |
| Exclusão `204` não tem JSON                           | `204` sem corpo                          | Compatível.                                                  |
| Tabela usa `idade` da listagem                        | Backend calcula e inclui `idade`         | Compatível.                                                  |
| Interface confere data futura                         | Backend também valida datas inexistentes | Validação complementar; o frontend exibirá o erro retornado. |

As rotas relativas `/pessoas` pressupõem que a página e a API estejam na **mesma origem**. A forma mais simples prevista é o backend Express servir também os arquivos estáticos de `frontend/`. Na etapa em que a proposta foi escrita, ainda não havia servidor, proxy ou CORS configurado. Abrir `index.html` diretamente como arquivo não permite usar a API dessa forma.

## Pontos da proposta a verificar na integração

1. Comparar rotas, códigos HTTP, formato das pessoas e mensagens de erro com a aplicação integrada.
2. Verificar `America/Sao_Paulo` como referência da data civil usada no cálculo da idade.
3. Verificar o tratamento de 29 de fevereiro nos anos não bissextos.
4. Verificar se o backend Express serve o frontend e a API na mesma origem.

Este documento permanece uma **proposta técnica**. A análise original comparou o código e os testes do frontend com o texto; ela não substitui os testes da aplicação integrada nem registra aprovação de outra pessoa.

## Testes previstos na proposta original

- Idade antes, no dia e depois do aniversário, inclusive 29 de fevereiro.
- CPF, nome e data inválidos; CPF duplicado.
- Cadastro e listagem vazia ou com registros.
- Edição e exclusão de CPF existente ou inexistente.
- Leitura e gravação em JSON usando arquivos de teste isolados dos dados reais.

Esta lista orientou o desenvolvimento com TDD. **Quando esta proposta foi escrita, ainda não havia testes nem comportamento do backend implementados.** O trabalho posterior deve ser consultado nas respectivas branches e evidências.
