import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useState } from "react";
import { loginService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import { Eye, EyeOff } from "lucide-react";
import { validateEmail, validatePassword } from "@/utils/validateForm";

const inputBase = "border border-border py-3 px-3 rounded-lg w-full focus:outline-none focus:border-primary";
const inputErrorClass = "bg-danger-subtle text-danger border border-danger focus:border-danger";

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
      setClientErrors({ email: errorEmail, password: errorPassword })
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
    <div className="min-h-[100dvh] p-4 flex flex-col items-center justify-center">
      <section className="bg-white rounded-[0.7rem] py-12 px-4 w-full max-w-[450px] text-center flex flex-col items-center justify-center">
        <Logo size={40} />
        <h1 className="text-2xl text-[var(--color-text)] my-4">Bem-vindo de volta!</h1>
        <p className="text-base text-text-muted">Faça login para acessar seu painel de gestão.</p>

        <form
          method="POST"
          onSubmit={handleSubmit}
          className="w-full text-center flex flex-col gap-4 mt-8"
          noValidate
        >
          <label htmlFor="email" className="text-[var(--color-text)] flex items-start flex-col gap-2 relative">
            Email
            <input
              className={`${inputBase} ${clientErrors.email || apiError ? inputErrorClass : ''}`}
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
              <span className="text-danger text-sm">{clientErrors.email}</span>
            )}
          </label>

          <label htmlFor="password" className="text-[var(--color-text)] flex items-start flex-col gap-2 relative">
            Senha
            <input
              className={`${inputBase} ${clientErrors.password || apiError ? inputErrorClass : ''}`}
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
            <div
              onClick={() => handleShowPassword()}
              className="absolute right-3 top-[2.45rem] text-[var(--color-text)]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {clientErrors.password && (
              <span className="text-danger text-sm">{clientErrors.password}</span>
            )}
            {apiError && <span className="text-danger text-sm">{apiError}</span>}
          </label>

          <a
            className="text-primary no-underline text-end max-[375px]:text-sm"
            href="#forgot-password"
          >
            Esqueci minha senha
          </a>

          <button
            disabled={loading}
            type="submit"
            aria-label={loading ? "Carregando acesso, aguarde" : "Entrar no sistema"}
            className="w-full h-[45px] bg-primary text-white text-base rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-light"
          >
            {loading ? <Spinner /> : 'Entrar'}
          </button>

          <div className="flex items-center gap-4 my-2">
            <hr className="w-full h-px bg-border" />
            <span className="whitespace-nowrap text-text-muted">Não tem uma conta?</span>
            <hr className="w-full h-px bg-border" />
          </div>

          <Link
            to={'/register'}
            className="flex items-center justify-center no-underline w-full h-[45px] rounded-lg transition-all duration-200 ease-in-out border border-border text-[var(--color-text)] hover:border-text-muted"
          >
            Registre-se
          </Link>
        </form>
      </section>
    </div>
  )
}
