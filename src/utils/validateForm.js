export const validateName = (name) => {
    if (!name || name.trim().length === 0) return "O nome é obrigatório."
    if (name.trim().length < 4) return "O nome precisa ter no mínimo 4 caracteres."
    if (name.length > 50) return "O nome deve ter no máximo 50 caracteres."
    return null
}

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "O e-mail é obrigatório."
    if (!regex.test(email)) return "Digite um e-mail válido."
    return null
}

export const validatePassword = (password, confirmPassword = null) => {
    if (!password) return "A senha é obrigatória."
    if (password.length < 6) return "A senha precisa de pelo menos 6 caracteres."
    if (confirmPassword !== null && confirmPassword !== password) return "As senhas não coincidem."
    return null
}