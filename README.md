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

As ferramentas locais, suas versões e seus comandos estão descritos em [`docs/ferramentas.md`](docs/ferramentas.md). O workflow está descrito em [`docs/integracao-continua.md`](docs/integracao-continua.md), e a imagem Docker em [`docs/docker.md`](docs/docker.md). O escopo não inclui login, autenticação nem validação matemática completa dos dígitos do CPF.

## Organização do projeto

```text
backend/          Backend e testes do backend
frontend/         Frontend desenvolvido pelo colega
docs/evidencias/  Orientações para registrar as evidências do trabalho
```

Esta organização é uma decisão da dupla, não uma exigência expressa do professor.

## Etapas previstas

1. Preparação do ambiente e do repositório — concluída.
2. Configuração das ferramentas de análise, formatação e testes — publicada no PR #1.
3. Definição e documentação do contrato da API — proposta técnica no PR #4, usada como referência e ajustável na integração.
4. Desenvolvimento do backend com TDD — publicado no PR #7.
5. Armazenamento dos cadastros em arquivo JSON — publicado no PR #7.
6. Testes de integração da API — publicados no PR #7.
7. Integração com o frontend — publicada no PR #8.
8. Criação e verificação da imagem Docker — validada localmente na branch `criar-imagem-docker`; ainda não integrada.
9. Configuração e verificação do workflow no GitHub Actions — publicada no PR #10; execução no PR aprovada, ainda não integrada à `main`.
10. Revisão da entrega e montagem do PDF — relatório acumulado em andamento.

## Situação atual

A estrutura inicial foi publicada no GitHub. Jest, ESLint e Prettier estão na branch `configurar-ferramentas`. O frontend já foi desenvolvido; a proposta de contrato está em um PR separado. O backend com CRUD, armazenamento JSON e testes foi desenvolvido com TDD e publicado no PR #7. A integração com o frontend está no PR #8. A padronização da formatação está no PR #9. O workflow de integração contínua está no PR #10, com verificações aprovadas no pull request; seu funcionamento na `main` dependerá da integração futura. A imagem Docker foi construída e validada localmente na branch `criar-imagem-docker`, sem publicação em registro.

## Confirmações do professor

- A imagem solicitada é uma imagem Docker.
- O projeto deve utilizar GitHub Actions.
