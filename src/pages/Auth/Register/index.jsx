import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { validateEmail, validateName, validatePassword } from "@/utils/validateForm";
import { useAuth } from "@/hooks/useAuth";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import { registerService } from "@/services/authService";
import { loginService } from "@/services/authService";

const inputBase = "border border-border py-3 px-3 rounded-lg w-full focus:outline-none focus:border-primary";
const inputErrorClass = "bg-danger-subtle text-danger border border-danger focus:border-danger";

export default function Register() {
    const { login } = useAuth()

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [clientErrors, setClientErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    const [apiError, setApiError] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        setClientErrors({})
        setServerErrors({})

        const checkName = validateName(name)
        const checkEmail = validateEmail(email)
        const checkPassword = validatePassword(password)
        const checkSamePassword = validatePassword(password, confirmPassword)

        if (checkName || checkEmail || checkPassword || checkSamePassword) {
            setClientErrors({
                name: checkName,
                email: checkEmail,
                password: checkPassword,
                confirmPassword: checkSamePassword
            })
            return
        }

        setLoading(true)

        try {
            await registerService({ name, email, password })
            const loginResponse = await loginService({ email, password })
            login(loginResponse.user, loginResponse.token)

            navigate('/dashboard', { state: { name } })
        } catch (err) {
            console.log(err)
            if (err.errors) {
                setServerErrors(parseApiValidationErrors(err.errors))
            } else {
                const isNetworkError = err instanceof TypeError
                setApiError(isNetworkError ? "Falha na conexão." : err.message || "Erro inesperado.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] p-4 flex flex-col items-center justify-center">
            <section className="bg-white rounded-[0.7rem] py-12 px-4 w-full max-w-[450px] flex flex-col items-center justify-center">
                <Logo size={40} />
                <h1 className="text-2xl text-[var(--color-text)] my-4">Crie sua conta</h1>
                <p className="text-base text-text-muted text-center">Comece a gerenciar seu estoque hoje mesmo</p>

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    method="POST"
                    className="w-full text-center flex flex-col gap-4 mt-8"
                >
                    <label htmlFor="name" className="text-[var(--color-text)] flex items-start flex-col gap-2 text-start">
                        Seu nome ou nome da empresa
                        <input
                            onChange={(e) => {
                                setName(e.target.value)
                                setClientErrors(prev => ({ ...prev, name: "" }))
                            }}
                            onBlur={(e) => {
                                const error = validateName(e.target.value)
                                if (error) setClientErrors(prev => ({ ...prev, name: error }))
                            }}
                            type="text"
                            name="name"
                            id="name"
                            className={`${inputBase} ${clientErrors.name ? inputErrorClass : ""}`}
                        />
                        {clientErrors.name && (
                            <span className="text-danger text-sm">{clientErrors.name}</span>
                        )}
                    </label>

                    <label htmlFor="email" className="text-[var(--color-text)] flex items-start flex-col gap-2 text-start">
                        Email
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setClientErrors(prev => ({ ...prev, email: "" }))
                            }}
                            onBlur={(e) => {
                                const error = validateEmail(e.target.value)
                                if (error) setClientErrors(prev => ({ ...prev, email: error }))
                            }}
                            type="email"
                            name="email"
                            id="email"
                            className={`${inputBase} ${clientErrors.email || serverErrors.email ? inputErrorClass : ""}`}
                        />
                        {clientErrors.email && (
                            <span className="text-danger text-sm">{clientErrors.email}</span>
                        )}
                        {serverErrors.email && <span className="text-danger text-sm">{serverErrors.email}</span>}
                    </label>

                    <label htmlFor="password" className="text-[var(--color-text)] flex items-start flex-col gap-2 text-start">
                        Senha
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setClientErrors(prev => ({ ...prev, password: "" }))
                            }}
                            onBlur={(e) => {
                                const error = validatePassword(e.target.value, null)
                                if (error) setClientErrors(prev => ({ ...prev, password: error }))
                            }}
                            type="password"
                            name="password"
                            id="password"
                            className={`${inputBase} ${clientErrors.password ? inputErrorClass : ""}`}
                        />
                        {clientErrors.password && (
                            <span className="text-danger text-sm">{clientErrors.password}</span>
                        )}
                    </label>

                    <label htmlFor="confirm-password" className="text-[var(--color-text)] flex items-start flex-col gap-2 text-start">
                        Confirmar senha
                        <input
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setClientErrors(prev => ({ ...prev, confirmPassword: "" }))
                            }}
                            onBlur={(e) => {
                                const error = validatePassword(password, e.target.value)
                                if (error) setClientErrors(prev => ({ ...prev, confirmPassword: error }))
                            }}
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            className={`${inputBase} ${clientErrors.confirmPassword ? inputErrorClass : ""}`}
                        />
                        {clientErrors.confirmPassword && (
                            <span className="text-danger text-sm">{clientErrors.confirmPassword}</span>
                        )}
                    </label>

                    {apiError && <span className="text-danger text-sm">{apiError}</span>}

                    <button
                        disabled={loading}
                        type="submit"
                        aria-label={loading ? "Carregando acesso, aguarde" : "Registrar"}
                        className="w-full h-[45px] bg-primary text-white text-base rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light"
                    >
                        {loading ? <Spinner /> : 'Registrar'}
                    </button>

                    <div className="flex items-center gap-4 my-2">
                        <hr className="w-full h-px bg-border" />
                        <span className="whitespace-nowrap text-text-muted">Já possui uma conta?</span>
                        <hr className="w-full h-px bg-border" />
                    </div>

                    <Link
                        to={'/login'}
                        className="flex items-center justify-center no-underline w-full h-[45px] rounded-lg transition-all duration-200 ease-in-out border border-border text-[var(--color-text)] hover:border-text-muted"
                    >
                        Entrar
                    </Link>
                </form>
            </section>
        </div>
    )
}
