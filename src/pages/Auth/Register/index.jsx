import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import styles from './index.module.css'
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { validateEmail, validateName, validatePassword } from "@/utils/validateForm";
import { useAuth } from "@/hooks/useAuth";
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors";
import { registerService } from "@/services/authService";
import { loginService } from "@/services/authService";

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

            navigate('/dashboard', {
                state: {
                    name
                }
            })
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
        <div className={styles.register__container}>
            <section className={styles.register__content}>
                <Logo size={40} />
                <h1>Crie sua conta</h1>
                <p>Comece a gerenciar seu estoque hoje mesmo</p>

                <form noValidate onSubmit={handleSubmit} method="POST" className={styles.register__content__form}>
                    <label htmlFor="name">
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
                            className={clientErrors.name ? styles.input__error : ""}
                        />
                        {clientErrors.name && (
                            <span className={styles.message__error}>{clientErrors.name}</span>
                        )}
                    </label>
                    <label htmlFor="email">
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
                            className={`${clientErrors.email || serverErrors.email ? styles.input__error : ""}`}
                        />
                        {clientErrors.email && (
                            <span className={styles.message__error}>{clientErrors.email}</span>
                        )}
                        {serverErrors.email && <span className={styles.message__error}>{serverErrors.email}</span>}
                    </label>
                    <label htmlFor="password">
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
                            className={clientErrors.password ? styles.input__error : ""}
                        />
                        {clientErrors.password && (
                            <span className={styles.message__error}>{clientErrors.password}</span>
                        )}
                    </label>
                    <label htmlFor="confirm-password">
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
                            className={clientErrors.confirmPassword ? styles.input__error : ""}
                        />
                        {clientErrors.confirmPassword && (
                            <span className={styles.message__error}>{clientErrors.confirmPassword}</span>
                        )}
                    </label>
                    {apiError && <span className={styles.message__error}>{apiError}</span>}
                    <button
                        disabled={loading}
                        type="submit"
                        aria-label={loading ? "Carregando acesso, aguarde" : "Registrar"}
                    >
                        {loading ? <Spinner /> : 'Registrar'}
                    </button>

                    <div className={styles.register__content__form__divider}>
                        <hr />
                        <span>Já possui uma conta?</span>
                        <hr />
                    </div>

                    <Link to={'/login'} className={styles.register__content__form__login}>Entrar</Link>
                </form>
            </section>
        </div>

    )
}