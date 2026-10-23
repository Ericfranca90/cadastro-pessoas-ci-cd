# Frontend

Interface do cadastro de pessoas (CPF, nome, data de nascimento e idade), desenvolvida em HTML, CSS e JavaScript puro, sem framework.

## Estrutura

```text
index.html        Página com o formulário e a tabela de pessoas
css/style.css     Estilos com identidade visual azul
js/utils.js       Formatação de CPF e data, validação do formulário
js/api.js         Chamadas à API (listar, cadastrar, editar e excluir)
js/app.js         Liga a tela às funções de utils e api
js/*.test.js      Testes unitários e de integração do frontend (Jest + jsdom)
```

## Contrato da API consumido

| Ação      | Rota                   | Corpo                           |
| --------- | ---------------------- | ------------------------------- |
| Listar    | `GET /pessoas`         | -                               |
| Cadastrar | `POST /pessoas`        | `cpf`, `nome`, `dataNascimento` |
| Editar    | `PUT /pessoas/:cpf`    | `nome`, `dataNascimento`        |
| Excluir   | `DELETE /pessoas/:cpf` | -                               |

A data de nascimento usa o formato `AAAA-MM-DD`. A idade é calculada pelo backend e exibida na tabela. Erros da API devem vir no formato `{ "erro": "mensagem" }`.

## Como rodar os testes

```powershell
cd frontend
npm install
npm test
```

## Como abrir a interface

Com o backend rodando e servindo a pasta `frontend`, acesse a página pelo navegador. Abrindo o `index.html` direto, a tela carrega, mas as chamadas à API falham.

## Desenvolvimento

O frontend foi feito com TDD (Red, Green e Refactor): cada arquivo de código tem um arquivo de teste escrito antes da implementação.
