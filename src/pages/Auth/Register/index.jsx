import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import styles from './index.module.css'

export default function Register() {
    return (
        <div className={styles.register__container}>
            <section className={styles.register__content}>
                <Logo size={40} />
                <h1>Crie sua conta</h1>
                <p>Comece a gerenciar seu estoque hoje mesmo</p>

                <form className={styles.register__content__form}>
                    <label htmlFor="name">
                        Seu nome ou nome da empresa
                        <input type="email" name="name" id="name" />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input type="email" name="email" id="email" />
                    </label>
                    <label htmlFor="password">
                        Senha
                        <input type="password" name="password" id="password" />
                    </label>
                    <label htmlFor="confirm-password">
                        Confirmar senha
                        <input type="password" name="confirm-password" id="confirm-password" />
                    </label>

                    <button>Registrar</button>

                    <div className={styles.register__content__form__divider}>
                        <hr />
                        <span>Já possui uma conta?</span>
                        <hr />
                    </div>

                    <Link to={'/login'} className={styles.register__content__form__login}>Entrar</Link>
                </form>
            </section>
        </div>

    );
}