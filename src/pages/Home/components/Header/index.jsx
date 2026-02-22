import { Link } from 'react-router-dom'
import styles from './index.module.css'
import Logo from '@/components/Logo'
import { useState } from 'react'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__content}>
                    <div className={styles.header__logo__container}>
                        <Logo size={36} />
                    </div>
                    <label className={styles.hamburger}>
                        <input checked={menuOpen} onChange={() => setMenuOpen(prev => !prev)} type="checkbox" />

                        <svg viewBox="0 0 32 32">
                            <path
                                className={`${styles.line} ${styles.lineTopBottom}`}
                                d="M27 10 13 10
                                C10.8 10 9 8.2 9 6
                                9 3.5 10.8 2 13 2
                                15.2 2 17 3.8 17 6
                                L17 26
                                C17 28.2 18.8 30 21 30
                                23.2 30 25 28.2 25 26
                                25 23.8 23.2 22 21 22
                                L7 22"
                            />
                            <path
                                className={styles.line}
                                d="M7 16 27 16"
                            />
                        </svg>
                    </label>

                    <nav className={`${styles.header__nav} ${menuOpen ? styles.menuOpenAnimation : ''}`}>
                        <ul>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a className={styles.header__nav__option} href="#home">Início</a>
                            </li>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a className={styles.header__nav__option} href="#resources">Recursos</a>
                            </li>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a className={styles.header__nav__option} href="#subscriptions">Planos</a>
                            </li>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a className={styles.header__nav__option} href="#doubts">Dúvidas</a>
                            </li>
                        </ul>
                        <Link className={styles.header__login} to={'/login'}>Entrar</Link>
                    </nav>

                    <div onClick={() => setMenuOpen(prev => !prev)} className={`${styles.overlay} ${(menuOpen) ? styles.overlay__open : ''} `}></div>
                </div>
            </header>
        </>
    )
} 