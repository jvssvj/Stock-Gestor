import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Eye, EyeOff, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validateName, validatePassword } from "@/utils/validateForm";

type AuthUser = { name: string; email?: string; avatarUrl?: string };

type ProfileErrors = {
    avatar?: string;
    firstName?: string;
    email?: string;
};

type PasswordErrors = {
    current?: string;
    new?: string;
    confirm?: string;
};

export default function SettingsPage() {
    const { user } = useAuth() as { user: AuthUser | null };

    const nameParts = (user?.name ?? "").split(" ");
    const [firstName, setFirstName] = useState(nameParts[0] ?? "");
    const [lastName, setLastName] = useState(nameParts.slice(1).join(" "));
    const [email, setEmail] = useState(user?.email ?? "");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);

    const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setProfileErrors((p) => ({ ...p, avatar: "Selecione uma imagem válida." }));
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setProfileErrors((p) => ({ ...p, avatar: "A imagem deve ter no máximo 5MB." }));
            return;
        }

        setAvatarPreview(URL.createObjectURL(file));
        setProfileErrors((p) => ({ ...p, avatar: "" }));
    }

    function handleProfileSubmit() {

        const firstNameError = validateName(firstName);
        const emailError = validateEmail(email);

        if (firstNameError || emailError) {
            setProfileErrors({ firstName: firstNameError ?? "", email: emailError ?? "" });
            return;
        }

        setProfileErrors({});
        // TODO: conectar à API
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
    }

    function handlePasswordSubmit() {

        const currentError = validatePassword(currentPassword);
        const newError = validatePassword(newPassword);
        const confirmError = validatePassword(newPassword, confirmPassword as unknown as null);

        if (currentError || newError || confirmError) {
            setPasswordErrors({
                current: currentError ?? "",
                new: newError ?? "",
                confirm: confirmError ?? "",
            });
            return;
        }

        setPasswordErrors({});
        // TODO: conectar à API
        setPasswordSuccess(true);
        setTimeout(() => setPasswordSuccess(false), 3000);
    }

    return (
        <div className="w-full max-w-container mx-auto">
            <Link
                to="/dashboard"
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

            <section
                aria-labelledby="profile-heading"
                className="rounded-xl border border-border p-6 mb-6"
            >
                <h2 id="profile-heading" className="text-lg font-semibold text-text mb-6">
                    Perfil
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); handleProfileSubmit(); }} noValidate>
                    <div className="flex items-center gap-5 mb-8">
                        <div className="relative shrink-0">
                            <button
                                type="button"
                                aria-label="Alterar foto de perfil"
                                onClick={() => fileInputRef.current?.click()}
                                className="relative w-20 h-20 rounded-full bg-surface-offset flex items-center justify-center overflow-hidden group border-2 border-border hover:border-primary transition-colors cursor-pointer"
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar atual"
                                        className="w-full h-full object-cover"
                                    />
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
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                                aria-label="Selecionar imagem de perfil"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-text">Foto de perfil</p>
                            <p className="text-xs text-text-muted mt-0.5">
                                PNG, JPG ou WEBP. Máximo 5MB.
                            </p>
                            {profileErrors.avatar && (
                                <p className="text-xs text-danger mt-1" role="alert">
                                    {profileErrors.avatar}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <label
                            className="flex flex-col gap-1.5 text-sm text-text"
                            htmlFor="firstName"
                        >
                            Primeiro nome
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setProfileErrors((p) => ({ ...p, firstName: "" }));
                                }}
                                onBlur={(e) => {
                                    const err = validateName(e.target.value);
                                    if (err) setProfileErrors((p) => ({ ...p, firstName: err }));
                                }}
                                placeholder="João"
                                autoComplete="given-name"
                                className={`px-3 py-2.5 rounded-lg bg-surface-2 border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${profileErrors.firstName
                                    ? "border-danger bg-danger-subtle text-danger"
                                    : "border-border"
                                    }`}
                            />
                            {profileErrors.firstName && (
                                <span className="text-xs text-danger" role="alert">
                                    {profileErrors.firstName}
                                </span>
                            )}
                        </label>

                        <label
                            className="flex flex-col gap-1.5 text-sm text-text"
                            htmlFor="lastName"
                        >
                            Último nome
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Silva"
                                autoComplete="family-name"
                                className="px-3 py-2.5 rounded-lg bg-surface-2 border border-border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors"
                            />
                        </label>
                    </div>

                    <label
                        className="flex flex-col gap-1.5 text-sm text-text mb-6"
                        htmlFor="email"
                    >
                        Email
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setProfileErrors((p) => ({ ...p, email: "" }));
                            }}
                            onBlur={(e) => {
                                const err = validateEmail(e.target.value);
                                if (err) setProfileErrors((p) => ({ ...p, email: err }));
                            }}
                            placeholder="seu@email.com"
                            autoComplete="email"
                            className={`px-3 py-2.5 rounded-lg bg-surface-2 border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${profileErrors.email
                                ? "border-danger bg-danger-subtle text-danger"
                                : "border-border"
                                }`}
                        />
                        {profileErrors.email && (
                            <span className="text-xs text-danger" role="alert">
                                {profileErrors.email}
                            </span>
                        )}
                    </label>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                        {profileSuccess && (
                            <p className="text-sm text-success" role="status">
                                Perfil atualizado com sucesso!
                            </p>
                        )}
                        <button
                            type="submit"
                            className="ml-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </section>

            <section
                aria-labelledby="password-heading"
                className="bg-surface rounded-xl border border-border p-6"
            >
                <h2 id="password-heading" className="text-lg font-semibold text-text mb-6">
                    Alterar senha
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }} noValidate className="flex flex-col gap-4">
                    <label
                        className="flex flex-col gap-1.5 text-sm text-text"
                        htmlFor="currentPassword"
                    >
                        Senha atual
                        <div className="relative">
                            <input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                    setPasswordErrors((p) => ({ ...p, current: "" }));
                                }}
                                onBlur={(e) => {
                                    const err = validatePassword(e.target.value);
                                    if (err) setPasswordErrors((p) => ({ ...p, current: err }));
                                }}
                                autoComplete="current-password"
                                className={`w-full px-3 py-2.5 pr-10 rounded-lg bg-surface-2 border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${passwordErrors.current
                                    ? "border-danger bg-danger-subtle text-danger"
                                    : "border-border"
                                    }`}
                            />
                            <button
                                type="button"
                                aria-label={
                                    showCurrentPassword ? "Esconder senha atual" : "Mostrar senha atual"
                                }
                                onClick={() => setShowCurrentPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer"
                            >
                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {passwordErrors.current && (
                            <span className="text-xs text-danger" role="alert">
                                {passwordErrors.current}
                            </span>
                        )}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                            className="flex flex-col gap-1.5 text-sm text-text"
                            htmlFor="newPassword"
                        >
                            Nova senha
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setPasswordErrors((p) => ({ ...p, new: "" }));
                                    }}
                                    onBlur={(e) => {
                                        const err = validatePassword(e.target.value);
                                        if (err) setPasswordErrors((p) => ({ ...p, new: err }));
                                    }}
                                    autoComplete="new-password"
                                    className={`w-full px-3 py-2.5 pr-10 rounded-lg bg-surface-2 border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${passwordErrors.new
                                        ? "border-danger bg-danger-subtle text-danger"
                                        : "border-border"
                                        }`}
                                />
                                <button
                                    type="button"
                                    aria-label={
                                        showNewPassword ? "Esconder nova senha" : "Mostrar nova senha"
                                    }
                                    onClick={() => setShowNewPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {passwordErrors.new && (
                                <span className="text-xs text-danger" role="alert">
                                    {passwordErrors.new}
                                </span>
                            )}
                        </label>

                        <label
                            className="flex flex-col gap-1.5 text-sm text-text"
                            htmlFor="confirmPassword"
                        >
                            Confirmar nova senha
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setPasswordErrors((p) => ({ ...p, confirm: "" }));
                                    }}
                                    onBlur={(e) => {
                                        const err = validatePassword(newPassword, e.target.value as unknown as null);
                                        if (err) setPasswordErrors((p) => ({ ...p, confirm: err }));
                                    }}
                                    autoComplete="new-password"
                                    className={`w-full px-3 py-2.5 pr-10 rounded-lg bg-surface-2 border text-text placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors ${passwordErrors.confirm
                                        ? "border-danger bg-danger-subtle text-danger"
                                        : "border-border"
                                        }`}
                                />
                                <button
                                    type="button"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Esconder confirmação de senha"
                                            : "Mostrar confirmação de senha"
                                    }
                                    onClick={() => setShowConfirmPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {passwordErrors.confirm && (
                                <span className="text-xs text-danger" role="alert">
                                    {passwordErrors.confirm}
                                </span>
                            )}
                        </label>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
                        {passwordSuccess && (
                            <p className="text-sm text-success" role="status">
                                Senha alterada com sucesso!
                            </p>
                        )}
                        <button
                            type="submit"
                            className="ml-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Alterar senha
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
