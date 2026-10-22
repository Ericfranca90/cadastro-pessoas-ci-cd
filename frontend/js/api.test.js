const { listarPessoas, cadastrarPessoa, atualizarPessoa, excluirPessoa } = require("./api");

function respostaOk(dados, status = 200) {
    return Promise.resolve({ ok: true, status, json: () => Promise.resolve(dados) });
}

beforeEach(() => {
    global.fetch = jest.fn();
});

describe("api", () => {
    test("listarPessoas faz GET em /pessoas e retorna a lista", async () => {
        const lista = [{ cpf: "12345678901", nome: "Maria", dataNascimento: "2000-05-20", idade: 26 }];
        fetch.mockReturnValue(respostaOk(lista));

        const resultado = await listarPessoas();

        expect(fetch).toHaveBeenCalledWith("/pessoas");
        expect(resultado).toEqual(lista);
    });

    test("cadastrarPessoa faz POST em /pessoas com os dados em JSON", async () => {
        const pessoa = { cpf: "12345678901", nome: "Maria", dataNascimento: "2000-05-20" };
        fetch.mockReturnValue(respostaOk(pessoa, 201));

        await cadastrarPessoa(pessoa);

        expect(fetch).toHaveBeenCalledWith("/pessoas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pessoa),
        });
    });

    test("atualizarPessoa faz PUT em /pessoas/:cpf", async () => {
        const dados = { nome: "Maria Souza", dataNascimento: "2000-05-20" };
        fetch.mockReturnValue(respostaOk(dados));

        await atualizarPessoa("12345678901", dados);

        expect(fetch).toHaveBeenCalledWith("/pessoas/12345678901", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
    });

    test("excluirPessoa faz DELETE em /pessoas/:cpf", async () => {
        fetch.mockReturnValue(respostaOk(null, 204));

        await excluirPessoa("12345678901");

        expect(fetch).toHaveBeenCalledWith("/pessoas/12345678901", { method: "DELETE" });
    });

    test("lança erro com a mensagem da API quando a resposta não é ok", async () => {
        fetch.mockReturnValue(
            Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({ erro: "CPF já cadastrado" }),
            })
        );

        await expect(cadastrarPessoa({})).rejects.toThrow("CPF já cadastrado");
    });
});