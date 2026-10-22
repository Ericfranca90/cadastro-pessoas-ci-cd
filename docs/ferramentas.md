# Ferramentas de desenvolvimento

As ferramentas desta etapa ficam instaladas localmente na raiz do projeto. O backend e as configurações usam CommonJS para manter a estrutura inicial simples. O frontend poderá usar módulos JavaScript sem receber automaticamente as variáveis globais do Node.js.

## Versões e compatibilidade

| Pacote     |  Versão | Requisito informado pelo pacote         | Finalidade                                      |
| ---------- | ------: | --------------------------------------- | ----------------------------------------------- |
| Jest       |  30.5.2 | Node.js 18.14, 20, 22 ou 24 ou superior | Executar os futuros testes do backend           |
| ESLint     | 10.13.0 | Node.js 20.19, 22.13 ou 24 ou superior  | Analisar estaticamente os arquivos JavaScript   |
| Prettier   |  3.9.10 | Node.js 14 ou superior                  | Manter a formatação consistente                 |
| @eslint/js |  10.0.1 | Node.js 20.19, 22.13 ou 24 ou superior  | Fornecer as regras recomendadas do ESLint       |
| globals    | 17.13.0 | Node.js 18 ou superior                  | Declarar os ambientes Node.js, Jest e navegador |

Esses requisitos são compatíveis com o Node.js 24.11.1 utilizado no projeto. As versões diretas são fixadas no `package.json` e no `package-lock.json`.

O pacote `eslint-config-prettier` não foi incluído porque esta configuração não habilita regras estilísticas do ESLint que entrem em conflito com o Prettier.

## Instalação

Para reproduzir exatamente as dependências registradas no arquivo de lock:

```bash
npm ci
```

## Comandos

```bash
npm test
npm run lint
npm run format
npm run format:check
```

O Jest procura futuros arquivos `*.test.js` e `*.spec.js` dentro de `backend`. Como as funcionalidades ainda não foram iniciadas, não há testes nesta etapa. Os primeiros testes serão escritos antes da implementação, seguindo o ciclo TDD.

## Verificações da etapa 2

- `npm ls --depth=0`: confirmou somente as cinco dependências diretas registradas.
- `npm ci`: reproduziu a instalação a partir do `package-lock.json`.
- `npm run lint`: terminou sem erros.
- `npm run format:check`: confirmou que os arquivos analisados seguem o padrão do Prettier.
- `jest --showConfig`: confirmou o ambiente Node.js, a raiz `backend` e a descoberta de arquivos `*.test.js` e `*.spec.js`.
- `jest --listTests`: não encontrou testes, conforme esperado antes do início do TDD.
- `npm test`: retornou código 1 com a mensagem `No tests found`, pois ainda não existem testes. A opção `--passWithNoTests` não foi utilizada.

O relatório completo do `npm audit` indicou 19 ocorrências moderadas na árvore das dependências de desenvolvimento do Jest. A verificação `npm audit --omit=dev` não encontrou vulnerabilidades em dependências de produção. Nenhuma correção automática foi aplicada porque o projeto ainda não possui dependências de produção e a solução sugerida pelo npm alteraria a versão principal do Jest.

## Política de finais de linha

O arquivo `.gitattributes` define LF para arquivos de texto do projeto, em acordo com `endOfLine: "lf"` do Prettier. Imagens e PDFs são tratados como binários, sem conversão de finais de linha. Essa regra pertence ao repositório e não exige alterar a configuração global do Git de cada participante.
