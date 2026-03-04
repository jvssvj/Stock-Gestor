import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import styles from './index.module.css';
import { useState } from "react";
import { loginService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')


  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleShowPassword() {
    setShowPassword(prev => !prev)
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "O e-mail é obrigatório."
    if (!regex.test(email)) return "Digite um e-mail válido."
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "A senha é obrigatória."
    if (password.length < 6) return 'A senha precisa de pelo menos 6 digitos.'
    return ""
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    setError(null)

    const errorEmail = validateEmail(email)
    const errorPassword = validatePassword(password)

    if (errorEmail || errorPassword) {
      setEmailError(errorEmail)
      setPasswordError(errorPassword)
      return
    }

    setLoading(true)

    try {
      const response = await loginService({ email, password })

      login(response.user, response.token)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.error || err.message || "Falha na conexão com o servidor."
      setError(msg)
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

        <form onSubmit={handleSubmit} className={styles.login__content__form} noValidate>
          <label htmlFor="email">
            Email
            <input
              className={`${emailError || error ? styles.input__error : ''}`}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
            {emailError && (
              <span className={styles.message__error}>{emailError}</span>
            )}
          </label>
          <label htmlFor="password">
            Senha
            <input
              className={`${passwordError || error ? styles.input__error : ''}`}
              onChange={(e) => setPassword(e.target.value)}
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
            {passwordError && (
              <span className={styles.message__error}>{passwordError}</span>
            )}
            {error && (
              <span className={styles.message__error}>{error}</span>
            )}
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
