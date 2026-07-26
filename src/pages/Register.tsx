import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useState, type FormEvent } from "react";
import Spinner from "@/components/Spinner";
import { validateEmail, validateName, validatePassword } from "@/utils/validateForm";
import { useAuth } from "@/hooks/useAuth";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import { registerService } from "@/services/authService";
import { loginService } from "@/services/authService";
import { hasValidationErrors, isApiErrorResponse } from "@/utils/apiErrors";
import type { FieldErrors } from "@/types";

const inputBase = "border border-border py-3 px-3 rounded-lg w-full focus:outline-none focus:border-primary";
const inputErrorClass = "bg-danger-subtle text-danger border border-danger focus:border-danger";

interface RegisterErrors {
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    password?: string | null
    confirmPassword?: string | null
}

export default function Register() {
    const { login } = useAuth()

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [clientErrors, setClientErrors] = useState<RegisterErrors>({})
    const [serverErrors, setServerErrors] = useState<FieldErrors>({})
    const [apiError, setApiError] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setClientErrors({})
        setServerErrors({})

        const checkFirstName = validateName(firstName, false)
        const checkLastName = validateName(lastName, true)
        const checkEmail = validateEmail(email)
        const checkPassword = validatePassword(password)
        const checkSamePassword = validatePassword(password, confirmPassword)

        if (checkFirstName || checkLastName || checkEmail || checkPassword || checkSamePassword) {
            setClientErrors({
                firstName: checkFirstName,
                lastName: checkLastName,
                email: checkEmail,
                password: checkPassword,
                confirmPassword: checkSamePassword
            })
            return
        }

        setLoading(true)

        try {
            await registerService({ firstName, lastName, email, password })

            const loginResponse = await loginService({ email, password })
            login(loginResponse.user, loginResponse.token)

            navigate('/app', { state: { firstName } })
        } catch (err) {
            console.log(err)
            if (hasValidationErrors(err)) {
                setServerErrors(parseApiValidationErrors(err.errors))
            } else {
                const isNetworkError = err instanceof TypeError
                const apiMessage = isApiErrorResponse(err) ? err.message : undefined
                setApiError(isNetworkError ? "Falha na conexão." : apiMessage || "Erro inesperado.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] p-4 flex flex-col items-center justify-center">
            <section className="bg-white rounded-[0.7rem] w-full max-w-[450px] flex flex-col items-center justify-center">
                <Logo />
                <h1 className="text-3xl text-text-main font-semibold my-4">Crie sua conta</h1>
                <p className="text-base text-text-muted text-center">Comece a gerenciar seu estoque hoje mesmo</p>

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    method="POST"
                    className="w-full text-center flex flex-col gap-4 mt-8"
                >
                    <div className="flex gap-4">
                        <label htmlFor="first-name" className="text-text-main flex items-start flex-1 flex-col gap-2 text-start">
                            Primeiro nome
                            <input
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    setClientErrors(prev => ({ ...prev, firstName: "" }))
                                }}
                                onBlur={(e) => {
                                    const error = validateName(e.target.value, false)
                                    if (error) setClientErrors(prev => ({ ...prev, firstName: error }))
                                }}
                                type="text"
                                name="first-name"
                                id="first-name"
                                className={`${inputBase} ${clientErrors.firstName ? inputErrorClass : ""}`}
                            />
                            {clientErrors.firstName && (
                                <span className="text-danger text-sm">{clientErrors.firstName}</span>
                            )}
                        </label>
                        <label htmlFor="last-name" className="text-text-main flex items-start flex-1 flex-col gap-2 text-start">
                            Último nome
                            <input
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    setClientErrors(prev => ({ ...prev, lastName: "" }))
                                }}
                                onBlur={(e) => {
                                    const error = validateName(e.target.value, true)
                                    if (error) setClientErrors(prev => ({ ...prev, lastName: error }))
                                }}
                                type="text"
                                name="last-name"
                                id="last-name"
                                className={`${inputBase} ${clientErrors.lastName ? inputErrorClass : ""}`}
                            />
                            {clientErrors.lastName && (
                                <span className="text-danger text-sm">{clientErrors.lastName}</span>
                            )}
                        </label>
                    </div>

                    <label htmlFor="email" className="text-text-main flex items-start flex-col gap-2 text-start">
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

                    <label htmlFor="password" className="text-text-main flex items-start flex-col gap-2 text-start">
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

                    <label htmlFor="confirm-password" className="text-text-main flex items-start flex-col gap-2 text-start">
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

                    <p className="text-muted">Já possui uma conta?
                        {' '}
                        <Link
                            to={'/login'}
                            className="text-primary font-semibold"
                        >
                            Entrar
                        </Link>
                    </p>
                </form>
            </section>
        </div>
    )
}
