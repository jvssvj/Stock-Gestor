import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { forgotPasswordService, resetPasswordService, verifyOtpService } from "@/services/authService"
import { ArrowLeft, Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"

type Step = "email" | "code" | "password" | "done"

type FieldErrors = Record<string, string>

function parseErrors(err: unknown): FieldErrors {
    if (err && typeof err === "object" && "errors" in err) {
        const errors = (err as { errors: { field: string; message: string }[] }).errors
        return Object.fromEntries(errors.map((e) => [e.field, e.message]))
    }
    if (err && typeof err === "object" && "message" in err) {
        return { form: (err as { message: string }).message }
    }
    return { form: "Algo deu errado. Tente novamente." }
}

// ─── Step 1: Email ───────────────────────────────────────────
function EmailStep({ onNext }: { onNext: (email: string) => void }) {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            await forgotPasswordService(email)
            onNext(email)
        } catch (err) {
            const parsed = parseErrors(err)
            setError(parsed.email ?? parsed.form ?? "Erro ao enviar código.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-text-main">Esqueci minha senha</h1>
                <p className="mt-1 text-sm text-muted">
                    Digite seu e-mail e enviaremos um código de verificação.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text-main">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError("") }}
                        placeholder="seu@email.com"
                        aria-invalid={!!error}
                        className={`mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm placeholder:text-light-gray focus:outline-none focus:ring-2 ${error
                            ? "border-danger focus:ring-danger/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                            }`}
                    />
                    {error && <p className="mt-2 text-xs text-danger">{error}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Enviando..." : "Enviar código"}
                </button>
            </form>

            <Link
                to="/login"
                className="flex items-center gap-1.5 text-sm text-muted hover:text-text-main no-underline transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar para o login
            </Link>
        </div>
    )
}

// ─── Step 2: Code ────────────────────────────────────────────
function CodeStep({ email, onNext, onBack }: { email: string; onNext: (code: string) => void; onBack: () => void }) {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    useEffect(() => {
        if (cooldown <= 0) return
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [cooldown])

    async function handleResend() {
        setResending(true)
        setError("")
        try {
            await forgotPasswordService(email)
            setCode("")
            setCooldown(60) // bloqueia por 60 segundos
        } catch {
            setError("Erro ao reenviar o código. Tente novamente.")
        } finally {
            setResending(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (code.length !== 6) {
            setError("O código deve ter 6 dígitos.")
            return
        }
        setLoading(true)
        setError("")
        try {
            await verifyOtpService({ email, code })
            onNext(code)
        } catch (err) {
            const parsed = parseErrors(err)
            setError(parsed.form ?? "Código inválido ou expirado.")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="space-y-6">
            <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <KeyRound className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-text-main">Insira o código</h1>
                <p className="mt-1 text-sm text-muted">
                    Enviamos um código de 6 dígitos para{" "}
                    <span className="font-semibold text-text-main">{email}</span>.
                    Ele expira em 10 minutos.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-semibold text-text-main">
                        Código de verificação
                    </label>
                    <input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        autoFocus
                        required
                        value={code}
                        onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setError("") }}
                        placeholder="000000"
                        aria-invalid={!!error}
                        className={`mt-2 h-12 w-full rounded-lg border bg-white px-3 text-center text-2xl font-bold tracking-[0.5em] placeholder:text-light-gray focus:outline-none focus:ring-2 ${error
                            ? "border-danger focus:ring-danger/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                            }`}
                    />
                    {error && <p className="mt-2 text-xs text-danger">{error}</p>}
                </div>

                <button
                    type="submit"
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    {loading ? "Verificando..." : "Verificar código"}
                </button>

                <div className="text-center">
                    {cooldown > 0 ? (
                        <p className="text-sm text-muted">
                            Reenviar código em <span className="font-semibold text-text-main">{cooldown}s</span>
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="text-sm text-primary hover:underline disabled:opacity-50 transition-colors cursor-pointer"
                        >
                            {resending ? "Reenviando..." : "Não recebeu? Reenviar código"}
                        </button>
                    )}
                </div>
            </form>

            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-text-main transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Usar outro e-mail
            </button>
        </div>
    )
}

// ─── Step 3: New Password ─────────────────────────────────────
function PasswordStep({
    email,
    code,
    onDone,
}: {
    email: string
    code: string
    onDone: () => void
}) {
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState<FieldErrors>({})
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErrors({})

        if (password.length < 6) {
            setErrors({ password: "A senha deve ter no mínimo 6 caracteres." })
            return
        }
        if (password !== confirm) {
            setErrors({ confirm: "As senhas não conferem." })
            return
        }

        setLoading(true)
        try {
            await resetPasswordService({ email, code, newPassword: password })
            onDone()
        } catch (err) {
            setErrors(parseErrors(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-text-main">Nova senha</h1>
                <p className="mt-1 text-sm text-muted">
                    Escolha uma senha segura com pelo menos 6 caracteres.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.form && (
                    <div className="rounded-lg border border-danger-light bg-danger-subtle px-4 py-3 text-sm text-danger">
                        {errors.form}
                    </div>
                )}

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-text-main">
                        Nova senha
                    </label>
                    <div className="relative mt-2">
                        <input
                            id="password"
                            type={show ? "text" : "password"}
                            required
                            autoFocus
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setErrors({}) }}
                            placeholder="Mínimo 6 caracteres"
                            aria-invalid={!!errors.password}
                            className={`h-10 w-full rounded-lg border bg-white px-3 pr-10 text-sm placeholder:text-light-gray focus:outline-none focus:ring-2 ${errors.password
                                ? "border-danger focus:ring-danger/20"
                                : "border-border focus:border-primary focus:ring-primary/20"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-light-gray hover:text-text-main"
                        >
                            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-2 text-xs text-danger">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="confirm" className="block text-sm font-semibold text-text-main">
                        Confirmar senha
                    </label>
                    <input
                        id="confirm"
                        type={show ? "text" : "password"}
                        required
                        value={confirm}
                        onChange={(e) => { setConfirm(e.target.value); setErrors({}) }}
                        placeholder="Repita a senha"
                        aria-invalid={!!errors.confirm}
                        className={`mt-2 h-10 w-full rounded-lg border bg-white px-3 text-sm placeholder:text-light-gray focus:outline-none focus:ring-2 ${errors.confirm
                            ? "border-danger focus:ring-danger/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                            }`}
                    />
                    {errors.confirm && <p className="mt-2 text-xs text-danger">{errors.confirm}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Salvando..." : "Salvar nova senha"}
                </button>
            </form>
        </div>
    )
}

// ─── Step 4: Done ─────────────────────────────────────────────
function DoneStep() {
    return (
        <div className="space-y-6 text-center">
            <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-subtle">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-text-main">Senha redefinida!</h1>
                <p className="mt-2 text-sm text-muted">
                    Sua senha foi alterada com sucesso. Agora você pode entrar com a nova senha.
                </p>
            </div>
            <Link
                to="/login"
                className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90 no-underline"
            >
                Ir para o login
            </Link>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
    const [step, setStep] = useState<Step>("email")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg px-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
                {step === "email" && (
                    <EmailStep onNext={(e) => { setEmail(e); setStep("code") }} />
                )}
                {step === "code" && (
                    <CodeStep
                        email={email}
                        onNext={(c) => { setCode(c); setStep("password") }}
                        onBack={() => setStep("email")}
                    />
                )}
                {step === "password" && (
                    <PasswordStep email={email} code={code} onDone={() => setStep("done")} />
                )}
                {step === "done" && <DoneStep />}
            </div>
        </div>
    )
}