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

As imagens 11 a 15 documentam a proposta de contrato da API, originalmente na
branch `definir-contrato-api`. Foram preservadas no relatório acumulado e,
naquela etapa, não foram copiadas para a branch do backend.

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

Ao fim da Etapa 5, esse ciclo testava sete cenários de entrada, não todas as
entradas possíveis. O CRUD ainda não havia sido verificado. O contrato da API
permanece uma proposta técnica.

## Etapa 6 - CRUD, API e armazenamento JSON

- `38-red-post-teste.png`: teste de integração escrito antes do cadastro.
- `39-red-post-falha.png`: POST retornando 404 no RED, quando se esperava 201.
- `40-testes-anteriores-passando.png`: dez testes anteriores preservados.
- `41-green-post-cadastro.png`: implementação da rota de cadastro.
- `42-green-post-json.png`: armazenamento do cadastro em arquivo JSON, sem idade persistida.
- `43-green-post-testes.png`: primeiro ciclo do POST aprovado com onze testes.
- `44-testes-completos-backend.png`: 43 testes do backend aprovados.
- `45-eslint-backend.png`: execução da análise estática sem erros.
- `46-prettier-backend.png`: formatação dos arquivos deste bloco aprovada.
- `47-formatacao-geral-pendente.png`: cinco arquivos anteriores ainda apontados pela verificação geral.
- `48b-branch-commit-backend.png`: branch `backend-crud-api` e commit do código.
- `49-pr-backend-aberto.png`: PR #7 aberto contra `backend-validacoes`.
- `50-arquivos-pr-backend.png`: comparação do PR com os 18 arquivos deste bloco.

A captura `48b` mostra o comando correto e foi a escolhida para o relatório.
A verificação geral de formatação continua pendente; a verificação dos arquivos
deste bloco passou.

## Etapa 7 - integração frontend/backend

- `51-branches-integracao.png`: referências conferidas antes da integração.
- `52-red-integracao-teste.png`: teste escrito antes de servir a interface.
- `53-red-integracao-404-parte1.png` e `53-red-integracao-404-parte2.png`: duas falhas esperadas por HTTP 404; a API continuou passando.
- `54-green-integracao-codigo.png` e `55-green-integracao-testes.png`: Express servindo o frontend e os três testes novos aprovados.
- `56-integracao-lista-vazia.png` a `61-integracao-exclusao.png`: fluxo real no navegador com JSON de teste isolado - lista vazia, cadastro, CPF duplicado, edição, persistência e exclusão.
- `62-testes-integracao.png`: 46 testes do backend e 24 do frontend aprovados.
- `63-qualidade-integracao.png`: ESLint e Prettier dos arquivos deste ciclo aprovados.
- `64-commit-integracao.png`: branch e commit que uniu backend e frontend.
- `65-pr-integracao.png`: PR #8 aberto, com base em `backend-crud-api`.
- `66-autoria-integracao.png`: commits da Heloisa e de Eric preservados no histórico.

O relatório acumulado está em `output/pdf/relatorio-evidencias-etapas-1-a-7-integracao.pdf`.
Ele reúne as evidências anteriores do backend, o relatório do frontend e esta
etapa de integração. A formatação geral do projeto ainda está pendente; não foi
apresentada como aprovada. Os prints antigos `48-branch-commit-backend-parte1.png`
e `48-branch-commit-backend-parte2.png` não integram o relatório.

## Etapa 8 - padronização da formatação e dos finais de linha

- `67-diagnostico-formatacao.png`: checagem geral antes da manutenção, com 15 arquivos apontados.
- `67b-diagnostico-finais-linha.png`: origem de `core.autocrlf`, exemplos LF/CRLF e oito avisos que persistiram ao permitir CRLF apenas no diagnóstico.
- `68-formatacao-geral-passando.png`: checagem geral do Prettier aprovada após a padronização.
- `69-eslint-e-testes-backend.png`: ESLint aprovado e 46 testes do backend passando.
- `70-testes-frontend.png`: 24 testes do frontend passando.
- `71b-politica-finais-de-linha.png`: política de LF e arquivos de texto conferidos no Git.
- `72-branch-commit-formatacao.png`: branch, commit e resumo das alterações desta manutenção.
- `73-pr-formatacao-aberto.png`: PR #9 aberto contra `integrar-frontend-backend`, dependente do PR #8.

Dos 15 avisos iniciais, sete eram apenas diferenças de LF/CRLF e oito também
envolviam formatação. A política versionada usa LF para texto e trata imagens e
PDFs como binários. A checagem geral passou também em um checkout isolado do
commit, após `npm ci` pelo lockfile. Não houve alteração funcional nem merge de PRs.

O relatório acumulado desta etapa está em
`output/pdf/relatorio-evidencias-etapas-1-a-8-formatacao.pdf`. Ele preserva as 91
páginas anteriores. As capturas antigas `48-branch-commit-backend-parte1.png`,
`48-branch-commit-backend-parte2.png` e `71-politica-finais-de-linha.png` não
integram este relatório; as versões escolhidas são `48b` e `71b`.

## Etapa 9 - integração contínua com GitHub Actions

- `74-ci-gatilhos.png`: início do workflow, com gatilhos, permissão de leitura e job.
- `75-ci-etapas.png`: instalação e verificações automáticas definidas no workflow.
- `76-ci-branch-status.png`: branch e arquivo do workflow antes do primeiro commit.
- `77-ci-pr-verificacoes.png`: PR #10 aberto e check aprovado após o ajuste do lockfile.
- `78-ci-execucao-aprovada.png`: segunda execução, iniciada pelo PR, concluída com sucesso.
- `79a-ci-instalacao-e-qualidade.png` e `79b-ci-instalacao-e-qualidade.png`: instalações da raiz e do frontend com `npm ci`.
- `80-ci-testes-backend.png`: 46 testes do backend aprovados no GitHub.
- `81-ci-testes-frontend.png`: 24 testes do frontend aprovados no GitHub.
- `82-ci-commits.png`: commit inicial do workflow e commit que completou o lockfile para Linux.
- `83-ci-arquivos-alterados.png`: comparação do PR limitada ao workflow e ao lockfile antes do commit documental.
- `84-ci-formatacao.png`: verificação geral do Prettier aprovada no GitHub.
- `85-ci-analise-estatica.png`: ESLint aprovado no GitHub.

A primeira execução do PR #10 falhou no `npm ci` da raiz por duas entradas
indiretas ausentes no lockfile. Após o ajuste, a segunda execução passou em
todos os passos. Naquele momento, o workflow ainda não havia sido executado na
`main`, pois os PRs permaneciam abertos. O relatório acumulado desta etapa está em
`output/pdf/relatorio-evidencias-etapas-1-a-9-github-actions.pdf` e preserva as
100 páginas anteriores. Os três prints antigos excluídos na etapa 8 continuam
fora do relatório e deste commit.

## Etapa 10 - imagem Docker

- `86-dockerfile.png` e `87-dockerignore.png`: arquivos de empacotamento antes do build.
- `88-docker-disponibilidade.png`: cliente e serviço Docker com contêineres Linux disponíveis.
- `89-docker-build-imagem.png`: construção concluída, identificação e tamanho da imagem local.
- `90-docker-container-volume.png`: primeiro contêiner, porta local e volume nomeado.
- `91-docker-tela-inicial.png`: interface aberta com a lista vazia.
- `92-docker-cadastro-idade.png`: cadastro fictício e idade calculada.
- `93-docker-edicao.png`: nome e nascimento editados, com CPF preservado.
- `94-docker-container-recriado.png` e `95-docker-persistencia.png`: segundo contêiner e cadastro preservado no mesmo volume.
- `96-docker-exclusao.png`: pedido de confirmação, ainda antes da exclusão.
- `97-docker-exclusao-apos-atualizar.png`: lista vazia após confirmar e atualizar.
- `98-docker-console.png`: console do navegador sem erros visíveis após os fluxos.
- `99-docker-branch-commit.png`: branch e commit do código Docker.
- `100-docker-pr-aberto.png`: PR #11 aberto contra `configurar-github-actions`.
- `101-docker-ci-aprovada.png`: verificação remota do PR #11 aprovada.
- `102-docker-arquivos-alterados.png`: quatro arquivos no PR antes do commit documental.

O relatório acumulado está em
`output/pdf/relatorio-evidencias-etapas-1-a-10-docker.pdf`, com 120 páginas. As
109 páginas anteriores foram preservadas; a captura 96 não é apresentada como
prova da exclusão concluída. A imagem não foi publicada em registro e, naquela
etapa, nenhum PR havia sido mesclado. Os três prints antigos excluídos na etapa 8
permanecem fora deste relatório e deste commit.

## Fechamento da entrega

Os PRs planejados foram mesclados posteriormente, preservando os commits da
Heloisa. A [execução final da CI na `main`](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/actions/runs/39942796274)
passou no commit funcional `fbb98de`. A imagem Docker desse commit também foi
conferida localmente. Esses fatos são posteriores às capturas históricas de PRs
abertos e às simulações locais, que não devem ser interpretadas como merges reais.

- `119-prs-integrados-main.png`: visão dos PRs mesclados no GitHub.
- `120-ci-final-main.png`: execução real aprovada do GitHub Actions na `main`.

As duas capturas finais integram o
[`relatório final`](../../../output/pdf/relatorio-evidencias-final.pdf), com 122
páginas. A capa foi atualizada para indicar as etapas 1 a 10 e a situação final;
as páginas 2 a 122 mantêm as evidências e explicações históricas. As capturas
`48-branch-commit-backend-parte1.png`, `48-branch-commit-backend-parte2.png` e
`71-politica-finais-de-linha.png` permanecem fora do relatório e do
versionamento; foram usadas as versões `48b` e `71b`.
