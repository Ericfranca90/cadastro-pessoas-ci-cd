const URL_BASE = "/pessoas";
const CABECALHO_JSON = { "Content-Type": "application/json" };

async function tratarResposta(resposta) {
    if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        throw new Error(corpo.erro || "Erro ao comunicar com o servidor.");
    }
    if (resposta.status === 204) return null;
    return resposta.json();
}

async function listarPessoas() {
    return tratarResposta(await fetch(URL_BASE));
}

async function cadastrarPessoa(pessoa) {
    return tratarResposta(
        await fetch(URL_BASE, {
            method: "POST",
            headers: CABECALHO_JSON,
            body: JSON.stringify(pessoa),
        })
    );
}

async function atualizarPessoa(cpf, dados) {
    return tratarResposta(
        await fetch(`${URL_BASE}/${cpf}`, {
            method: "PUT",
            headers: CABECALHO_JSON,
            body: JSON.stringify(dados),
        })
    );
}

async function excluirPessoa(cpf) {
    const URL_BASE = "/pessoas";

    async function tratarResposta(resposta) {
        if (!resposta.ok) {
            const corpo = await resposta.json().catch(() => ({}));
            throw new Error(corpo.erro || "Erro ao comunicar com o servidor.");
        }
        if (resposta.status === 204) return null;
        return resposta.json();
    }

    async function enviarJson(url, metodo, dados) {
        return tratarResposta(
            await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            })
        );
    }

    async function listarPessoas() {
        return tratarResposta(await fetch(URL_BASE));
    }

    async function cadastrarPessoa(pessoa) {
        return enviarJson(URL_BASE, "POST", pessoa);
    }

    async function atualizarPessoa(cpf, dados) {
        return enviarJson(`${URL_BASE}/${cpf}`, "PUT", dados);
    }

    async function excluirPessoa(cpf) {
        return tratarResposta(await fetch(`${URL_BASE}/${cpf}`, { method: "DELETE" }));
    }

    if (typeof module !== "undefined") {
        module.exports = { listarPessoas, cadastrarPessoa, atualizarPessoa, excluirPessoa };
    }
    return tratarResposta(await fetch(`${URL_BASE}/${cpf}`, { method: "DELETE" }));
}

if (typeof module !== "undefined") {
    module.exports = { listarPessoas, cadastrarPessoa, atualizarPessoa, excluirPessoa };
}