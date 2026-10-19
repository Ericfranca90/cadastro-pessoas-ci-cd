const TAMANHO_CPF = 11;

function somenteDigitos(valor) {
    return String(valor).replace(/\D/g, "");
}

function formatarCpf(valor) {
    const d = somenteDigitos(valor).slice(0, TAMANHO_CPF);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function formatarData(dataIso) {
    const [ano, mes, dia] = dataIso.split("-");
    return `${dia}/${mes}/${ano}`;
}

function validarPessoa({ cpf, nome, dataNascimento }) {
    if (somenteDigitos(cpf).length !== TAMANHO_CPF) return "CPF deve ter 11 dígitos.";
    if (!nome || !nome.trim()) return "Informe o nome.";
    if (!dataNascimento) return "Informe a data de nascimento.";
    if (new Date(`${dataNascimento}T00:00:00`) > new Date()) {
        return "A data de nascimento não pode ser no futuro.";
    }
    return null;
}

if (typeof module !== "undefined") {
    module.exports = { formatarCpf, formatarData, validarPessoa };
}