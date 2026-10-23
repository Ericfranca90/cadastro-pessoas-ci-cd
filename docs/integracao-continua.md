# Integração contínua

O workflow [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) usa Node.js 24 em um runner Ubuntu. Ele instala as dependências da raiz e do frontend com `npm ci` e executa, em passos separados, Prettier, ESLint, 46 testes do backend e 24 testes do frontend.

O gatilho `pull_request` não restringe a branch de destino; `push` executará o mesmo workflow na `main` quando o projeto for integrado. O checkout padrão de um PR pode testar um merge simulado pelo GitHub, sem mesclar o PR de verdade.

Para consultar os resultados, abra a aba **Actions** do repositório, selecione **Verificações do projeto**, escolha uma execução e abra o job **Verificar formatação, análise estática e testes**. Cada passo pode ser expandido para mostrar seu log.

No [PR #10](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/pull/10), a [primeira execução](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/actions/runs/39877137334) falhou no `npm ci` da raiz porque o lockfile não continha duas entradas indiretas exigidas no Linux. O `package-lock.json` foi completado com versões e hashes já presentes no próprio arquivo, sem alterar `package.json` ou as versões declaradas. A [segunda execução](https://github.com/Ericfranca90/cadastro-pessoas-ci-cd/actions/runs/39877456631) passou com Node.js 24.21.0 e npm 11.19.0. Isso valida o PR, não uma execução na `main`.
