export const validateName = (name: string, isLastName = false): string | null => {
    const value = name?.trim();

    if (!value) {
        return `O ${isLastName ? "último nome" : "nome"} é obrigatório.`;
    }

    if (value.length < 2) {
        return `O ${isLastName ? "último nome" : "nome"} precisa ter no mínimo 2 caracteres.`;
    }

    if (value.length > 50) {
        return `O ${isLastName ? "último nome" : "nome"} deve ter no máximo 50 caracteres.`;
    }

    return null;
};

export const validateEmail = (email: string): string | null => {
    if (!email || email.trim().length === 0) return "O e-mail é obrigatório."
    if (email.length > 254) return "O e-mail é muito longo."
    if (email.startsWith(".") || email.startsWith("@")) return "Digite um e-mail válido."
    if (email.includes("..")) return "Digite um e-mail válido."

    const [local, ...domainParts] = email.split("@")
    const domain = domainParts.join("@")

    if (!local || !domain) return "Digite um e-mail válido."
    if (local.length > 64) return "O e-mail é muito longo."
    if (domain.startsWith("-") || domain.endsWith("-")) return "Digite um e-mail válido."
    if (!domain.includes(".")) return "Digite um e-mail válido."

    const tld = domain.split(".").at(-1)
    if (!tld || tld.length < 2) return "Digite um e-mail válido."

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) return "Digite um e-mail válido."

    return null
}

export const validatePassword = (password: string, confirmPassword: string | null = null): string | null => {
    if (!password) return "A senha é obrigatória."
    if (password.length < 6) return "A senha precisa de pelo menos 6 caracteres."
    if (confirmPassword !== null && confirmPassword !== password) return "As senhas não coincidem."
    return null
}
