import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import styles from './index.module.css';
import { useState } from "react";
import { loginService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import { Eye, EyeOff } from "lucide-react";
import { validateEmail, validatePassword } from "@/utils/validateForm";

export default function Login() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [clientErrors, setClientErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleShowPassword() {
    setShowPassword(prev => !prev)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const errorEmail = validateEmail(email)
    const errorPassword = validatePassword(password)

    if (errorEmail || errorPassword) {
      setClientErrors({
        email: errorEmail,
        password: errorPassword
      })

      return
    }

    setLoading(true)

    try {
      const response = await loginService({ email, password })

      login(response.user, response.token)
      navigate('/dashboard')
    } catch (err) {
      const isNetworkError = err instanceof TypeError
      setApiError(isNetworkError ? "Falha na conexão." : err.message || "Erro inesperado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login__container}>
      <section className={styles.login__content}>
        <Logo size={40} />
        <h1>Bem-vindo de volta!</h1>
        <p>Faça login para acessar seu painel de gestão.</p>

        <form method="POST" onSubmit={handleSubmit} className={styles.login__content__form} noValidate>
          <label htmlFor="email">
            Email
            <input
              className={`${clientErrors.email || apiError ? styles.input__error : ''}`}
              onBlur={(e) => {
                const error = validateEmail(e.target.value)
                if (error) setClientErrors(prev => ({ ...prev, email: error }))
              }}
              onChange={(e) => {
                setEmail(e.target.value)
                setClientErrors(prev => ({ ...prev, email: "" }))
              }}
              type="email"
              name="email"
              id="email"
            />
            {clientErrors.email && (
              <span className={styles.message__error}>{clientErrors.email}</span>
            )}
          </label>
          <label htmlFor="password">
            Senha
            <input
              className={`${clientErrors.password || apiError ? styles.input__error : ''}`}
              onBlur={(e) => {
                const error = validatePassword(e.target.value)
                if (error) setClientErrors(prev => ({ ...prev, password: error }))
              }}
              onChange={(e) => {
                setPassword(e.target.value)
                setClientErrors(prev => ({ ...prev, password: "" }))
                setApiError("")
              }}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
            />
            <div onClick={() => handleShowPassword()} className={styles.view__password}>
              {showPassword ?
                <EyeOff size={20} />
                :
                <Eye size={20} />
              }
            </div>
            {clientErrors.password && (
              <span className={styles.message__error}>{clientErrors.password}</span>
            )}
            {apiError && <span className={styles.message__error}>{apiError}</span>}
          </label>

          <a className={styles.login__content__forgot__password} href="#forgot-password">Esqueci minha senha</a>

          <button
            disabled={loading}
            type="submit"
            aria-label={loading ? "Carregando acesso, aguarde" : "Entrar no sistema"}
          >
            {loading ? <Spinner /> : 'Entrar'}
          </button>

          <div className={styles.login__content__form__divider}>
            <hr />
            <span>Não tem uma conta?</span>
            <hr />
          </div>

          <Link to={'/register'} className={styles.login__content__form__register}>Registre-se</Link>
        </form>
      </section>
    </div>
  )
}
