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
- Heloisa Cardillo ([heloisa-cardillo](https://github.com/heloisa-cardillo)): frontend e testes relacionados à interface.
- O histórico de commits e pull requests preserva as contribuições de ambos. Eric realizou a integração final das partes.

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
frontend/         Frontend e testes desenvolvidos por Heloisa
docs/evidencias/  Orientações para registrar as evidências do trabalho
```

Esta organização é uma decisão da dupla, não uma exigência expressa do professor.

## Etapas realizadas

1. Preparação do ambiente, repositório compartilhado e ferramentas de testes, análise e formatação.
2. Proposta técnica do contrato da API e ciclos TDD do cálculo da idade e da validação dos dados.
3. CRUD com armazenamento em JSON, testes unitários e de integração.
4. Integração da interface com o backend e padronização da formatação e dos finais de linha.
5. GitHub Actions executado na `main` e imagem Docker construída e testada com persistência.
6. Revisão da entrega e [relatório final de evidências](output/pdf/relatorio-evidencias-final.pdf).

## Situação atual

A aplicação está integrada na `main`. Ela cadastra, lista, edita e exclui pessoas usando CPF, nome e data de nascimento. Os cadastros ficam em arquivo JSON; a idade é calculada nas respostas, sem ser gravada. O frontend de Heloisa e seus testes permanecem no histórico original.

A versão integrada no commit [`ef02ed3`](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/commit/ef02ed3884e7c7a9b7e81d39c84dcb6d90221664) passou localmente no Prettier, ESLint, 46 testes do backend e 24 do frontend. No commit funcional [`fbb98de`](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/commit/fbb98de8946db80b238f8351bdd2b49569dbe899), a [execução final do GitHub Actions na `main`](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/actions/runs/39942796274) foi concluída com sucesso. A imagem Docker foi construída a partir desse commit e testada com cadastro, edição, persistência após reinício do contêiner e exclusão. A imagem não foi publicada em um registro.

Os pull requests planejados foram mesclados preservando seus commits: ferramentas [#1](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/1), frontend [#3](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/3), proposta da API [#4](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/4), ciclos TDD e backend [#5](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/5), [#6](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/6) e [#7](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/7), integração [#8](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/8), formatação [#9](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/9), CI [#10](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/10) e Docker [#11](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/11). O [contrato da API](docs/contrato-api.md) registra uma proposta técnica elaborada antes da implementação e usada como referência, não uma aprovação formal presumida.

## Executar e verificar

Na raiz do projeto, com Node.js 24 ou superior:

```powershell
npm ci
npm start
```

Abra `http://localhost:3000` para usar a interface. Para conferir a qualidade e os testes:

```powershell
npm run format:check
npm run lint
npm test -- --runInBand
cd frontend
npm ci
npm test -- --runInBand
```

O [guia do backend](backend/README.md) documenta as rotas e o arquivo JSON; o [guia do frontend](frontend/README.md) descreve a interface. A [documentação da CI](docs/integracao-continua.md), a [documentação Docker](docs/docker.md) e o [índice das evidências](docs/evidencias/imagens/README.md) detalham as demais etapas.

## Confirmações do professor

- A imagem solicitada é uma imagem Docker.
- O projeto deve utilizar GitHub Actions.
