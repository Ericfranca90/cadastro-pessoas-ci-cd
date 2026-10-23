# Imagem Docker

O `Dockerfile` usa a imagem oficial `node:24-bookworm-slim`. Ele instala apenas as
dependências de execução da raiz com `npm ci --omit=dev`, copia o backend e os
arquivos estáticos do frontend e inicia o servidor como usuário `node`. Os
cadastros ficam em `/app/data/pessoas.json`, fora do código da aplicação.

## Pré-requisitos

- Docker Desktop com o mecanismo de contêineres Linux em execução.
- Porta local `3100` livre. Se estiver ocupada, escolha outra porta local no
  lado esquerdo de `127.0.0.1:3100:3000`.

## Construir e executar

Na raiz do projeto:

```powershell
docker build -t cadastro-pessoas-ci-cd:etapa-docker .
docker volume create cadastro-pessoas-docker-validacao
docker run -d --name cadastro-pessoas-validacao-1 -p 127.0.0.1:3100:3000 -e PORT=3000 -e ARQUIVO_DADOS=/app/data/pessoas.json -v cadastro-pessoas-docker-validacao:/app/data cadastro-pessoas-ci-cd:etapa-docker
```

Acesse `http://127.0.0.1:3100`. `PORT` define a porta escutada pelo servidor
dentro do contêiner; `ARQUIVO_DADOS` aponta para o JSON no volume. Se alterar
`PORT`, ajuste também o lado direito do mapeamento de portas.

Para consultar o contêiner e seus logs:

```powershell
docker ps --filter name=cadastro-pessoas-validacao-1
docker logs cadastro-pessoas-validacao-1
```

## Recriar sem perder os dados

Após parar o primeiro contêiner, remova somente ele e execute outro da mesma
imagem com o mesmo volume:

```powershell
docker stop cadastro-pessoas-validacao-1
docker rm cadastro-pessoas-validacao-1
docker run -d --name cadastro-pessoas-validacao-2 -p 127.0.0.1:3100:3000 -e PORT=3000 -e ARQUIVO_DADOS=/app/data/pessoas.json -v cadastro-pessoas-docker-validacao:/app/data cadastro-pessoas-ci-cd:etapa-docker
```

Para parar o segundo contêiner, sem apagar o volume:

```powershell
docker stop cadastro-pessoas-validacao-2
```

## Validação local

A imagem foi construída localmente com sucesso. Dentro dela, o Node.js respondeu
como versão 24.22.1 e a aplicação executou como usuário `node` (UID 1000). O
backend e os arquivos estáticos necessários estavam presentes; testes, PDFs e
cadastros locais não foram copiados para a imagem.

Na interface servida em `http://127.0.0.1:3100`, a lista começou vazia. Um
cadastro fictício foi criado e editado; após atualizar a página, os dados e a
idade calculada permaneceram. O primeiro contêiner foi removido, e outro da
mesma imagem recebeu o mesmo volume. O cadastro editado continuou disponível.
Depois da exclusão pela interface e de nova atualização, a lista e o JSON do
volume ficaram vazios. Os logs do contêiner e o console do navegador não
mostraram erros durante essa validação.

Esses resultados são locais. A imagem não foi publicada em registro, e os
comandos acima não removem o volume nem outros recursos do Docker.
