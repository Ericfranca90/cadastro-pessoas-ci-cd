# Imagens das evidências

Salve nesta pasta somente capturas reais do desenvolvimento, sem exibir Codex, ChatGPT, conversas, credenciais ou informações pessoais.

Use nomes numerados e descritivos, começando por:

- `01-estrutura-inicial.png`
- `02-ambiente-e-commit.png`
- `03-repositorio-github.png`
- `04-versoes-e-dependencias.png`
- `05-eslint-e-prettier.png`
- `06-jest-sem-testes.png`
- `07-branch-e-commit-etapa-2.png`
- `08-pull-request-etapa-2.png`
- `09-pull-request-frontend-heloisa.png`
- `10-commit-finalizacao-frontend.png`

As imagens 01 a 03 registram a Etapa 1. As imagens 04 a 08 registram a
configuração das ferramentas na Etapa 2.

A imagem 09 registra os commits da Heloisa no pull request do frontend.
A imagem 10 mostra os commits dela preservados e o commit de finalização do Eric.

As imagens 11 a 15 documentam a proposta de contrato da API na branch
`definir-contrato-api`. Elas permanecem nessa branch e foram preservadas no
relatório acumulado; não foram copiadas para a branch do backend.

## Etapa 4 - primeiro ciclo TDD do backend

- `16-testes-calculo-idade.png`: três testes escritos antes da implementação.
- `17-modulo-minimo-idade.png`: função ainda sem cálculo, retornando `undefined`.
- `18-red-calculo-idade-parte1.png` e `18-red-calculo-idade-parte2.png`: três falhas reais do RED.
- `19-green-codigo-calculo-idade.png` e `20-green-testes-passando.png`: implementação e três testes aprovados.
- `21-refactor-codigo-idade.png` e `22-refactor-testes-passando.png`: reorganização com resultados preservados.
- `23-verificacoes-calculo-idade.png`: testes, ESLint e Prettier dos arquivos deste ciclo.
- `24-branch-e-commit-calculo-idade.png`: branch e commit do código e dos testes.
- `25-pull-request-calculo-idade.png`: PR #5 aberto contra `configurar-ferramentas`.

A verificação geral de formatação continua pendente nesta cópia local; a imagem
23 não a apresenta como aprovada.

## Etapa 5 - segundo ciclo TDD do backend

- `26-testes-validar-pessoa.png`: sete testes escritos com referência fixa antes da implementação.
- `27-modulo-minimo-validar-pessoa.png`: função retornando `undefined`, ainda sem validações.
- `28-red-validar-pessoa-parte1.png` a `28-red-validar-pessoa-parte4.png`: falhas reais dos sete testes no RED.
- `29-testes-idade-passando.png`: os três testes anteriores continuaram passando.
- `30-green-validar-pessoa-codigo.png` e `31-green-validar-pessoa-testes.png`: validações implementadas e dez testes passando.
- `32-refactor-validar-pessoa-codigo.png` e `33-refactor-validar-pessoa-testes.png`: conferência de data extraída e resultados preservados.
- `34-verificacoes-validacoes.png`: dez testes, ESLint e Prettier dos arquivos deste ciclo.
- `35-branch-commit-validacoes.png`: branch e commit do código e dos testes.
- `36-pr-validacoes-aberto.png`: PR #6 aberto contra `backend-calculo-idade`, dependente do PR #5.
- `37-comparacao-pr-validacoes.png`: comparação com somente o módulo de validação e seus testes.

Este ciclo testa sete cenários de entrada, não todas as entradas possíveis. CPF
duplicado, CRUD e integração completa ainda não foram verificados. O contrato
da API permanece uma proposta, e a verificação geral de formatação continua
pendente.
