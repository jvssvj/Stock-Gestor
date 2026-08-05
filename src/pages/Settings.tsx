import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validateName } from "@/utils/validateForm";
import { changePasswordService, requestOtpService, updateMeService } from "@/services/authService";

type FieldErrors = Record<string, string>;

function parseErrors(err: unknown): FieldErrors {
    if (err && typeof err === "object" && "errors" in err) {
        const errors = (err as { errors: { field: string; message: string }[] }).errors;
        return Object.fromEntries(errors.map((e) => [e.field, e.message]));
    }
    if (err && typeof err === "object" && "message" in err) {
        return { form: (err as { message: string }).message };
    }
    return { form: "Algo deu errado. Tente novamente." };
}

const MAX_MB = 2;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type PasswordStep = "idle" | "sent" | "done";
type EmailStep = "idle" | "sent" | "done";

export default function SettingsPage() {
    const { user, updateUser } = useAuth()

    // ── Perfil ──────────────────────────────────────────────────
    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [removeImage, setRemoveImage] = useState(false)
    const [profileErrors, setProfileErrors] = useState<FieldErrors>({});
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Email ────────────────────────────────────────────────────
    const [emailStep, setEmailStep] = useState<EmailStep>("idle");
    const currentEmail = user?.email ?? ""
    const [newEmail, setNewEmail] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [emailErrors, setEmailErrors] = useState<FieldErrors>({});
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [emailResending, setEmailResending] = useState(false)
    const [emailCooldown, setEmailCooldown] = useState(0)


    // ── Senha ────────────────────────────────────────────────────
    const [passwordStep, setPasswordStep] = useState<PasswordStep>("idle");
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<FieldErrors>({});
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordResending, setPasswordResending] = useState(false); // 👈
    const [passwordCooldown, setPasswordCooldown] = useState(0);       // 👈
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    // ── Handlers: Avatar ─────────────────────────────────────────
    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) {
            setProfileErrors((p) => ({ ...p, avatar: "Formato inválido. Use JPG, PNG ou WEBP." }));
            return;
        }
        if (file.size > MAX_MB * 1024 * 1024) {
            setProfileErrors((p) => ({ ...p, avatar: `A imagem deve ter no máximo ${MAX_MB}MB.` }));
            return;
        }
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setRemoveImage(false);
        setProfileErrors((p) => ({ ...p, avatar: "" }));
    }

    // ── Handlers: Perfil (nome + avatar juntos) ──────────────────
    async function handleProfileSubmit(e: React.FormEvent) {
        e.preventDefault();
        const firstNameError = validateName(firstName);
        if (firstNameError) {
            setProfileErrors({ firstName: firstNameError });
            return;
        }

        setProfileLoading(true);
        setProfileErrors({});
        try {
            const form = new FormData();
            form.append("firstName", firstName);
            form.append("lastName", lastName);

            if (avatarFile) {
                form.append("image", avatarFile)
            }

            if (removeImage) {
                form.append("removeImage", "true")
            }

            const response = await updateMeService(form);
            updateUser(response.data)

            setAvatarFile(null);
            setRemoveImage(false)
            setProfileSuccess(true);
        } catch (err) {
            setProfileErrors(parseErrors(err));
        } finally {
            setProfileLoading(false);
        }
    }

    // ── Handlers: Email ──────────────────────────────────────────
    async function handleRequestEmailOtp() {
        setEmailLoading(true);
        setEmailErrors({});
        try {
            await requestOtpService();
            setEmailStep("sent");
        } catch (err) {
            setEmailErrors(parseErrors(err));
        } finally {
            setEmailLoading(false);
        }
    }

    async function handleEmailSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (emailCode.length !== 6) {
            setEmailErrors({ code: "O código deve ter 6 dígitos." });
            return;
        }
        const emailError = validateEmail(newEmail);
        if (emailError) {
            setEmailErrors({ email: emailError });
            return;
        }
        setEmailLoading(true);
        setEmailErrors({});
        try {
            const form = new FormData();
            form.append("email", newEmail);
            form.append("otpCode", emailCode);
            const response = await updateMeService(form);
            updateUser(response.data)
            setEmailSuccess(true);
            setEmailStep("done");
        } catch (err) {
            setEmailErrors(parseErrors(err));
        } finally {
            setEmailLoading(false);
        }
    }

    // ── Handlers: Senha ──────────────────────────────────────────
    async function handleRequestPasswordOtp() {
        setPasswordLoading(true);
        setPasswordErrors({});
        try {
            await requestOtpService();
            setPasswordStep("sent");
        } catch (err) {
            setPasswordErrors(parseErrors(err));
        } finally {
            setPasswordLoading(false);
        }
    }

    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPasswordErrors({});
        if (otpCode.length !== 6) {
            setPasswordErrors({ code: "O código deve ter 6 dígitos." });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordErrors({ password: "A senha deve ter no mínimo 6 caracteres." });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordErrors({ confirm: "As senhas não conferem." });
            return;
        }
        setPasswordLoading(true);
        try {
            await changePasswordService({ otpCode, newPassword });
            setPasswordSuccess(true);
            setPasswordStep("done");
            setOtpCode("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (err) {
            setPasswordErrors(parseErrors(err));
        } finally {
            setPasswordLoading(false);
        }
    }

    useEffect(() => {
        if (emailCooldown <= 0) return
        const timer = setTimeout(() => setEmailCooldown((c) => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [emailCooldown])

    useEffect(() => {
        if (passwordCooldown <= 0) return
        const timer = setTimeout(() => setPasswordCooldown((c) => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [passwordCooldown])

    async function handleResendEmailOtp() {
        setEmailResending(true)
        setEmailErrors({})
        try {
            await requestOtpService()
            setEmailCode("")
            setEmailCooldown(60)
        } catch (err) {
            setEmailErrors(parseErrors(err))
        } finally {
            setEmailResending(false)
        }
    }

    async function handleResendPasswordOtp() {
        setPasswordResending(true)
        setPasswordErrors({})
        try {
            await requestOtpService()
            setOtpCode("")
            setPasswordCooldown(60)
        } finally {
            setPasswordResending(false)
        }
    }

    const inputBase = "w-full px-3 py-2.5 rounded-lg bg-surface-2 border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors";
    const inputError = "border-danger bg-danger-subtle text-danger";
    const inputNormal = "border-border";

    return (
        <div className="w-full max-w-container mx-auto">
            <Link
                to="/app"
                className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-6"
            >
                <ArrowLeft size={18} />
                Voltar
            </Link>

            <header className="mb-8">
                <h1 className="text-4xl font-bold text-text-dark">Configurações</h1>
                <p className="text-text-muted mt-5 text-sm">
                    Gerencie suas informações de perfil e segurança.
                </p>
            </header>

            {/* ── Seção: Perfil ── */}
            <section aria-labelledby="profile-heading" className="bg-white rounded-xl border border-border p-6 mb-6">
                <h2 id="profile-heading" className="text-lg font-semibold text-text mb-6">Perfil</h2>

                <form onSubmit={handleProfileSubmit} noValidate>
                    {/* Avatar */}
                    <div className="flex items-center gap-5 mb-8">
                        <div className="relative shrink-0">
                            <button
                                type="button"
                                aria-label="Alterar foto de perfil"
                                onClick={() => fileInputRef.current?.click()}
                                className="relative w-20 h-20 rounded-full bg-surface-offset flex items-center justify-center overflow-hidden group border-2 border-border hover:border-primary transition-colors cursor-pointer"
                            >
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar atual" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} className="text-text-muted" />
                                )}
                                <span className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                    <Camera size={20} className="text-white" />
                                </span>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleAvatarChange}
                                aria-label="Selecionar imagem de perfil"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-text">Foto de perfil</p>
                            <p className="text-xs text-text-muted mt-0.5">PNG, JPG ou WEBP · Máximo 2MB.</p>
                            {profileErrors.avatar && (
                                <p className="text-xs text-danger mt-1" role="alert">{profileErrors.avatar}</p>
                            )}
                            {user?.avatarUrl && (
                                <button
                                    className="text-[14px] flex items-center gap-1 cursor-pointer text-danger"
                                    type="button"
                                    onClick={() => {
                                        setAvatarFile(null)
                                        setAvatarPreview(null)
                                        setRemoveImage(true)

                                    }}
                                >
                                    Remover imagem
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Nome */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="firstName">
                            Primeiro nome
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value); setProfileErrors((p) => ({ ...p, firstName: "" })); }}
                                onBlur={(e) => { const err = validateName(e.target.value); if (err) setProfileErrors((p) => ({ ...p, firstName: err })); }}
                                placeholder="João"
                                autoComplete="given-name"
                                className={`${inputBase} ${profileErrors.firstName ? inputError : inputNormal}`}
                            />
                            {profileErrors.firstName && <span className="text-xs text-danger" role="alert">{profileErrors.firstName}</span>}
                        </label>

                        <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="lastName">
                            Último nome
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Silva"
                                autoComplete="family-name"
                                className={`${inputBase} ${inputNormal}`}
                            />
                        </label>
                    </div>

                    {profileErrors.form && (
                        <p className="mb-4 text-sm text-danger" role="alert">{profileErrors.form}</p>
                    )}

                    <div className="flex items-center justify-between flex-wrap gap-3">
                        {profileSuccess && <p className="text-sm text-success" role="status">Perfil atualizado com sucesso!</p>}
                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:opacity-90 text-white text-sm font-medium rounded-lg transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {profileLoading && <Loader2 size={16} className="animate-spin" />}
                            {profileLoading ? "Salvando..." : "Salvar alterações"}
                        </button>
                    </div>
                </form>
            </section>

            {/* ── Seção: Email ── */}
            <section aria-labelledby="email-heading" className="bg-white rounded-xl border border-border p-6 mb-6">
                <h2 id="email-heading" className="text-lg font-semibold text-text mb-1">E-mail</h2>
                <p className="text-xs text-text-muted mb-6">
                    E-mail atual: <span className="font-semibold text-text">{currentEmail}</span>
                </p>

                {emailStep === "done" && (
                    <p className="text-sm text-success" role="status">E-mail alterado com sucesso!</p>
                )}

                {emailStep === "idle" && (
                    <>
                        {emailErrors.form && <p className="mb-3 text-sm text-danger" role="alert">{emailErrors.form}</p>}
                        <button
                            type="button"
                            onClick={handleRequestEmailOtp}
                            disabled={emailLoading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:opacity-90 text-white text-sm font-medium rounded-lg transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            {emailLoading && <Loader2 size={16} className="animate-spin" />}
                            {emailLoading ? "Enviando..." : "Alterar e-mail"}
                        </button>
                    </>
                )}

                {emailStep === "sent" && (
                    <form onSubmit={handleEmailSubmit} noValidate className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="emailCode">
                            Código de verificação
                            <p className="text-xs text-text-muted">Enviamos um código para <span className="font-semibold">{currentEmail}</span>. Ele expira em 10 minutos.</p>
                            <input
                                id="emailCode"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                autoFocus
                                value={emailCode}
                                onChange={(e) => { setEmailCode(e.target.value.replace(/\D/g, "")); setEmailErrors((p) => ({ ...p, code: "" })); }}
                                onBlur={() => { if (emailCode.length > 0 && emailCode.length < 6) setEmailErrors((p) => ({ ...p, code: "O código deve ter 6 dígitos." })) }}
                                placeholder="000000"
                                className={`w-40 px-3 py-2.5 rounded-lg bg-surface-2 border text-center text-xl font-bold tracking-[0.4em] placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${emailErrors.code || emailErrors.form ? inputError : inputNormal}`}
                            />
                            {emailErrors.code &&
                                <span className="text-xs text-danger" role="alert">
                                    {emailErrors.code}
                                </span>
                            }
                            {emailErrors.form &&
                                <span className="text-xs text-danger" role="alert">
                                    {emailErrors.form}
                                </span>
                            }

                            <div className="text-start">
                                {emailCooldown > 0 ? (
                                    <p className="text-[13px] text-muted">
                                        Reenviar em <span className="font-semibold text-text-main">{emailCooldown}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendEmailOtp}
                                        disabled={emailResending}
                                        className="text-[13px] text-primary hover:underline disabled:opacity-50 cursor-pointer"
                                    >
                                        {emailResending ? "Reenviando..." : "Não recebeu? Reenviar código"}
                                    </button>
                                )}
                            </div>
                        </label>

                        <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="newEmail">
                            Novo e-mail
                            <input
                                id="newEmail"
                                type="email"
                                required
                                value={newEmail}
                                onChange={(e) => { setNewEmail(e.target.value); setEmailErrors((p) => ({ ...p, email: "" })); }}
                                placeholder="novo@email.com"
                                className={`${inputBase} ${emailErrors.email ? inputError : inputNormal}`}
                            />
                            {emailErrors.email &&
                                <span className="text-xs text-danger" role="alert">
                                    {emailErrors.email}
                                </span>
                            }
                        </label>

                        <div className="flex items-center gap-3 mt-2">
                            <button
                                type="submit"
                                disabled={emailLoading || emailCode.length < 6}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:opacity-90 text-white text-sm font-medium rounded-lg transition-opacity cursor-pointer disabled:opacity-50"
                            >
                                {emailLoading && <Loader2 size={16} className="animate-spin" />}
                                {emailLoading ? "Salvando..." : "Confirmar novo e-mail"}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setEmailStep("idle"); setEmailCode(""); setEmailErrors({}); }}
                                className="text-sm text-text-muted hover:text-text transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </section>

            {/* ── Seção: Senha ── */}
            <section aria-labelledby="password-heading" className="bg-white rounded-xl border border-border p-6">
                <h2 id="password-heading" className="text-lg font-semibold text-text mb-1">Alterar senha</h2>
                <p className="text-xs text-text-muted mb-6">Enviaremos um código para o seu e-mail para confirmar a alteração.</p>

                {passwordSuccess && (
                    <p className="text-sm text-success mb-4" role="status">Senha alterada com sucesso!</p>
                )}

                {passwordStep === "idle" && (
                    <>
                        {passwordErrors.form && <p className="mb-3 text-sm text-danger" role="alert">{passwordErrors.form}</p>}
                        <button
                            type="button"
                            onClick={handleRequestPasswordOtp}
                            disabled={passwordLoading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:opacity-90 text-white text-sm font-medium rounded-lg transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            {passwordLoading && <Loader2 size={16} className="animate-spin" />}
                            {passwordLoading ? "Enviando..." : "Receber código por e-mail"}
                        </button>
                    </>
                )}

                {passwordStep === "sent" && (
                    <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-4">
                        {passwordErrors.form && <p className="text-sm text-danger" role="alert">{passwordErrors.form}</p>}

                        <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="otpCode">
                            Código de verificação
                            <p className="text-xs text-text-muted">Verifique sua caixa de entrada. O código expira em 10 minutos.</p>
                            <input
                                id="otpCode"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                autoFocus
                                value={otpCode}
                                onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, "")); setPasswordErrors((p) => ({ ...p, code: "" })); }}
                                onBlur={() => { if (otpCode.length > 0 && otpCode.length < 6) setPasswordErrors((p) => ({ ...p, code: "O código deve ter 6 dígitos." })) }}
                                placeholder="000000"
                                className={`w-40 px-3 py-2.5 rounded-lg bg-surface-2 border text-center text-xl font-bold tracking-[0.4em] placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${passwordErrors.code ? inputError : inputNormal}`}
                            />
                            {passwordErrors.code &&
                                <span className="text-xs text-danger" role="alert">
                                    {passwordErrors.code}
                                </span>
                            }
                            <div className="text-center">
                                {passwordCooldown > 0 ? (
                                    <p className="text-sm text-muted">
                                        Reenviar em <span className="font-semibold text-text-main">{passwordCooldown}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendPasswordOtp}
                                        disabled={passwordResending}
                                        className="text-sm text-primary hover:underline disabled:opacity-50 cursor-pointer"
                                    >
                                        {passwordResending ? "Reenviando..." : "Não recebeu? Reenviar código"}
                                    </button>
                                )}
                            </div>
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="newPassword">
                                Nova senha
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value); setPasswordErrors((p) => ({ ...p, password: "" })); }}
                                        autoComplete="new-password"
                                        placeholder="Mínimo 6 caracteres"
                                        className={`${inputBase} pr-10 ${passwordErrors.password ? inputError : inputNormal}`}
                                    />
                                    <button type="button" onClick={() => setShowNewPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer">
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {passwordErrors.password && <span className="text-xs text-danger" role="alert">{passwordErrors.password}</span>}
                            </label>

                            <label className="flex flex-col gap-1.5 text-sm text-text" htmlFor="confirmPassword">
                                Confirmar nova senha
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); setPasswordErrors((p) => ({ ...p, confirm: "" })); }}
                                        autoComplete="new-password"
                                        placeholder="Repita a senha"
                                        className={`${inputBase} pr-10 ${passwordErrors.confirm ? inputError : inputNormal}`}
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer">
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {passwordErrors.confirm && <span className="text-xs text-danger" role="alert">{passwordErrors.confirm}</span>}
                            </label>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <button
                                type="submit"
                                disabled={passwordLoading || otpCode.length < 6}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:opacity-90 text-white text-sm font-medium rounded-lg transition-opacity cursor-pointer disabled:opacity-50"
                            >
                                {passwordLoading && <Loader2 size={16} className="animate-spin" />}
                                {passwordLoading ? "Salvando..." : "Alterar senha"}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setPasswordStep("idle"); setOtpCode(""); setPasswordErrors({}); }}
                                className="text-sm text-text-muted hover:text-text transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </div>
    );
}