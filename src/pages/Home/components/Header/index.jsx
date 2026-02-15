import stockGestorIcon from '@/assets/images/stockgestor-icon.png'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default function Header() {
    return (
        <>
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <img src={stockGestorIcon} alt="" />
                <a href="">Stock Gestor</a>
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
                        <a className={styles.header__nav__option} href="#Duvidas">Duvidas</a>
                    </li>
                </ul>
            </nav>
            <Link className={styles.header__login} to={'/login'}>Entrar</Link>
        </header>
        </>
    )
} 