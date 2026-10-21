# Cadastro de Pessoas

Trabalho acadêmico da disciplina de Integração e Entrega Contínua. O objetivo é desenvolver uma aplicação JavaScript para cadastrar, consultar, editar e excluir pessoas usando os campos CPF, nome e data de nascimento. A idade será calculada pela aplicação a partir da data de nascimento.

## Exigências do professor

- Criar um CRUD em JavaScript com CPF, nome e data de nascimento.
- Calcular a idade.
- Utilizar TDD (Red, Green e Refactor).
- Utilizar controle de versionamento.
- Criar pull request.
- Aplicar análise estática e formatação.
- Criar testes unitários e de integração.
- Criar uma imagem Docker.
- Automatizar as verificações do projeto com GitHub Actions.
- Apresentar em PDF capturas reais do desenvolvimento de cada etapa.
- Contemplar frontend, backend e GitHub no fluxo de trabalho.

## Divisão da dupla

- Eric: backend, testes do backend e configurações do projeto.
- Colega: frontend e testes relacionados à interface.
- Ambos: commits, pull requests, revisões, integração entre as partes e coleta de evidências.

## Escolhas técnicas

As escolhas abaixo são opções de organização do projeto, não exigências determinadas pelo professor:

- JavaScript com Node.js e Express no backend.
- Arquivo JSON para armazenamento local dos cadastros, sem banco de dados.
- Jest para testes.
- ESLint para análise estática.
- Prettier para formatação.
- Docker para gerar a imagem da aplicação.
- GitHub Actions para executar automaticamente as verificações do projeto.

As ferramentas locais, suas versões e seus comandos estão descritos em [`docs/ferramentas.md`](docs/ferramentas.md). Docker e GitHub Actions serão configurados apenas nas etapas correspondentes. O escopo não inclui login, autenticação nem validação matemática completa dos dígitos do CPF.

## Organização do projeto

```text
backend/          Backend e testes do backend
frontend/         Frontend desenvolvido pelo colega
docs/evidencias/  Orientações para registrar as evidências do trabalho
```

Esta organização é uma decisão da dupla, não uma exigência expressa do professor.

## Etapas previstas

1. Preparação do ambiente e do repositório — concluída.
2. Configuração das ferramentas de análise, formatação e testes — concluída na branch `configurar-ferramentas`, aguardando revisão.
3. Definição e documentação do contrato da API — proposta no PR #4, ainda sem confirmação da dupla.
4. Desenvolvimento do backend com TDD — em andamento nesta branch, aguardando revisão.
5. Armazenamento dos cadastros em arquivo JSON — implementado nesta branch, aguardando revisão.
6. Testes de integração — implementados para a API nesta branch, aguardando revisão.
7. Integração com o frontend — não iniciada.
8. Criação e verificação da imagem Docker — não iniciada.
9. Configuração e verificação do workflow no GitHub Actions — não iniciada.
10. Revisão da entrega e montagem do PDF — relatório acumulado em andamento.

## Situação atual

A estrutura inicial foi publicada no GitHub. Jest, ESLint e Prettier estão na branch `configurar-ferramentas`. O frontend e a proposta de contrato estão em PRs separados. O backend com CRUD, armazenamento JSON e testes foi desenvolvido com TDD nesta branch e ainda depende de revisão. A integração com o frontend, o pipeline e a imagem Docker não foram iniciados.

## Confirmações do professor

- A imagem solicitada é uma imagem Docker.
- O projeto deve utilizar GitHub Actions.
