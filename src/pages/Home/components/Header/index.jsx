import { Link } from 'react-router-dom'
import styles from './index.module.css'
import Logo from '@/components/Logo'

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__logo__container}>
                    <Logo />
                </div>
                <nav className={styles.header__nav}>
                    <ul>
                        <li>
                            <a className={styles.header__nav__option} href="#Inicio">Início</a>
                        </li>
                        <li>
                            <a className={styles.header__nav__option} href="#Recursos">Recursos</a>
                        </li>
                        <li>
                            <a className={styles.header__nav__option} href="#Planos">Planos</a>
                        </li>
                        <li>
                            <a className={styles.header__nav__option} href="#Duvidas">Dúvidas</a>
                        </li>
                    </ul>
                </nav>
                <Link className={styles.header__login} to={'/login'}>Entrar</Link>
            </header>
        </>
    )
} 