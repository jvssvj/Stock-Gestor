import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import styles from './index.module.css'
import { Checkbox, FormControlLabel } from "@mui/material";

export default function Login() {
  return (
    <div className={styles.login__container}>
      <section className={styles.login__content}>
        <Logo size={40} />
        <h1>Bem-vindo de volta!</h1>
        <p>Faça login para acessar seu painel de gestão.</p>

        <form className={styles.login__content__form}>
          <label htmlFor="email">
            Email
            <input type="email" name="email" id="email" />
          </label>
          <label htmlFor="password">
            Senha
            <input type="password" name="password" id="password" />
          </label>

          <div className={styles.login__content__reming}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar-me" />

            <a href="#forgot-password">Esqueci minha senha</a>
          </div>

          <button>Entrar</button>

          <div className={styles.login__content__form__divider}>
            <hr />
            <span>Não tem uma conta?</span>
            <hr />
          </div>

          <Link to={'/register'} className={styles.login__content__form__register}>Registre-se</Link>
        </form>
      </section>
    </div>

  );
}
