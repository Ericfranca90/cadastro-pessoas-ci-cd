const fs = require("fs");
const path = require("path");

jest.mock("./api");
const api = require("./api");
const { renderizarLista, carregarPessoas, iniciar } = require("./app");

const pessoa = { cpf: "12345678901", nome: "Maria Silva", dataNascimento: "2000-05-20", idade: 26 };

const aguardar = () => new Promise((resolve) => setTimeout(resolve, 0));

function preencher({ cpf, nome, dataNascimento }) {
    document.getElementById("cpf").value = cpf;
    document.getElementById("nome").value = nome;
    document.getElementById("dataNascimento").value = dataNascimento;
}

function enviarFormulario() {
    document
        .getElementById("form-pessoa")
        .dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
}

beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
    document.documentElement.innerHTML = html;

    jest.clearAllMocks();
    api.listarPessoas.mockResolvedValue([pessoa]);
    api.cadastrarPessoa.mockResolvedValue({});
    api.atualizarPessoa.mockResolvedValue({});
    api.excluirPessoa.mockResolvedValue(null);
    window.confirm = jest.fn(() => true);

    iniciar();
});

describe("renderizarLista", () => {
    test("mostra uma linha por pessoa com CPF e data formatados e a idade", () => {
        renderizarLista([pessoa]);

        const linhas = document.querySelectorAll("#lista-pessoas tr");
        expect(linhas).toHaveLength(1);
        expect(linhas[0].textContent).toContain("123.456.789-01");
        expect(linhas[0].textContent).toContain("Maria Silva");
        expect(linhas[0].textContent).toContain("20/05/2000");
        expect(linhas[0].textContent).toContain("26");
    });

    test("mostra a mensagem de lista vazia quando não há pessoas", () => {
        renderizarLista([]);
        expect(document.getElementById("vazio").hidden).toBe(false);

        renderizarLista([pessoa]);
        expect(document.getElementById("vazio").hidden).toBe(true);
    });
});

describe("carregarPessoas", () => {
    test("busca as pessoas na api e mostra na tabela", async () => {
        await carregarPessoas();

        expect(api.listarPessoas).toHaveBeenCalled();
        expect(document.querySelectorAll("#lista-pessoas tr")).toHaveLength(1);
    });
});

describe("cadastro", () => {
    test("não cadastra e mostra o erro quando os dados são inválidos", async () => {
        preencher({ cpf: "123", nome: "Maria", dataNascimento: "2000-05-20" });
        enviarFormulario();
        await aguardar();

        expect(api.cadastrarPessoa).not.toHaveBeenCalled();
        expect(document.getElementById("mensagem").textContent).toBe("CPF deve ter 11 dígitos.");
    });

    test("cadastra com o CPF só com números, recarrega a lista e limpa o formulário", async () => {
        preencher({ cpf: "123.456.789-01", nome: "Maria Silva", dataNascimento: "2000-05-20" });
        enviarFormulario();
        await aguardar();

        expect(api.cadastrarPessoa).toHaveBeenCalledWith({
            cpf: "12345678901",
            nome: "Maria Silva",
            dataNascimento: "2000-05-20",
        });
        expect(api.listarPessoas).toHaveBeenCalledTimes(2);
        expect(document.getElementById("nome").value).toBe("");
    });

    test("mostra a mensagem de erro que vem da api", async () => {
        api.cadastrarPessoa.mockRejectedValue(new Error("CPF já cadastrado"));
        preencher({ cpf: "12345678901", nome: "Maria Silva", dataNascimento: "2000-05-20" });
        enviarFormulario();
        await aguardar();

        expect(document.getElementById("mensagem").textContent).toBe("CPF já cadastrado");
    });
});

describe("edição", () => {
    test("clicar em Editar preenche o formulário e entra em modo de edição", async () => {
        await aguardar();
        document.querySelector(".btn-editar").click();

        expect(document.getElementById("nome").value).toBe("Maria Silva");
        expect(document.getElementById("dataNascimento").value).toBe("2000-05-20");
        expect(document.getElementById("cpf").disabled).toBe(true);
        expect(document.getElementById("titulo-form").textContent).toBe("Editar pessoa");
        expect(document.getElementById("btn-cancelar").hidden).toBe(false);
    });

    test("salvar em modo de edição chama atualizarPessoa e não cadastrarPessoa", async () => {
        await aguardar();
        document.querySelector(".btn-editar").click();
        document.getElementById("nome").value = "Maria Souza";
        enviarFormulario();
        await aguardar();

        expect(api.atualizarPessoa).toHaveBeenCalledWith("12345678901", {
            nome: "Maria Souza",
            dataNascimento: "2000-05-20",
        });
        expect(api.cadastrarPessoa).not.toHaveBeenCalled();
    });
});

describe("exclusão", () => {
    test("clicar em Excluir, confirmando, exclui e recarrega a lista", async () => {
        await aguardar();
        document.querySelector(".btn-excluir").click();
        await aguardar();

        expect(window.confirm).toHaveBeenCalled();
        expect(api.excluirPessoa).toHaveBeenCalledWith("12345678901");
        expect(api.listarPessoas).toHaveBeenCalledTimes(2);
    });

    test("não exclui quando a pessoa cancela a confirmação", async () => {
        window.confirm = jest.fn(() => false);
        await aguardar();
        document.querySelector(".btn-excluir").click();
        await aguardar();

        expect(api.excluirPessoa).not.toHaveBeenCalled();
    });
});