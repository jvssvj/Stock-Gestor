import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ProfileDropdown from '../../../../components/ProfileDropdown'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { user } = useAuth()

    function handleUserConnected() {
        if (user) {
            return <ProfileDropdown navOnClick={() => setMenuOpen(prev => !prev)} />
        } else {
            return (
                <Link
                    className="ml-auto no-underline text-white bg-primary py-2 px-4 rounded-lg transition-all duration-200 ease-in-out text-center hover:bg-primary-light max-[720px]:ml-0 max-[720px]:mt-6"
                    to={'/login'}
                >
                    Entrar
                </Link>
            )
        }
    }

    return (
        <>
            <header className="w-full flex items-center justify-center bg-white py-6 px-4 border border-bg max-[720px]:fixed max-[720px]:justify-between max-[720px]:p-4 max-[720px]:z-[5]">

                <div className="w-full max-w-container flex items-center max-[720px]:justify-between">

                    <label className="hidden max-[720px]:cursor-pointer max-[720px]:z-[6] max-[720px]:block max-[720px]:h-[40px] max-[720px]:w-[40px]">
                        <input
                            className="hidden"
                            checked={menuOpen}
                            onChange={() => setMenuOpen(prev => !prev)}
                            type="checkbox"
                        />

                        <svg viewBox="0 0 32 32">
                            <path
                                className={`${styles.hamburger__line} ${styles.hamburger__lineTopBottom}`}
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
                                className={styles.hamburger__line}
                                d="M7 16 27 16"
                            />
                        </svg>
                    </label>

                    <nav className={`w-full flex items-center justify-start gap-8 max-[720px]:fixed max-[720px]:top-0 max-[720px]:right-0 max-[720px]:z-[5] max-[720px]:bg-white max-[720px]:flex-col max-[720px]:max-w-[350px] max-[720px]:min-h-[100dvh] max-[720px]:items-start max-[720px]:pt-20 max-[720px]:px-4 max-[720px]:translate-x-full max-[720px]:transition-transform max-[720px]:duration-700 max-[720px]:ease-[cubic-bezier(0.4,0,0.2,1)] max-[720px]:gap-0 ${menuOpen ? 'max-[720px]:translate-x-0' : ''}`}>
                        <ul className="flex gap-6 items-center list-none max-[720px]:items-start max-[720px]:flex-col">
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a
                                    className="no-underline text-[var(--color-text)] relative transition-all duration-200 ease-in-out before:content-[''] before:w-0 before:h-[2px] before:bg-primary before:absolute before:bottom-[-0.1rem] before:transition-all before:duration-200 before:ease-in-out hover:before:w-full"
                                    href="#home"
                                >
                                    Início
                                </a>
                            </li>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a
                                    className="no-underline text-[var(--color-text)] relative transition-all duration-200 ease-in-out before:content-[''] before:w-0 before:h-[2px] before:bg-primary before:absolute before:bottom-[-0.1rem] before:transition-all before:duration-200 before:ease-in-out hover:before:w-full"
                                    href="#resources"
                                >
                                    Recursos
                                </a>
                            </li>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a
                                    className="no-underline text-[var(--color-text)] relative transition-all duration-200 ease-in-out before:content-[''] before:w-0 before:h-[2px] before:bg-primary before:absolute before:bottom-[-0.1rem] before:transition-all before:duration-200 before:ease-in-out hover:before:w-full"
                                    href="#subscriptions"
                                >
                                    Planos
                                </a>
                            </li>
                            <li onClick={() => setMenuOpen(prev => !prev)}>
                                <a
                                    className="no-underline text-[var(--color-text)] relative transition-all duration-200 ease-in-out before:content-[''] before:w-0 before:h-[2px] before:bg-primary before:absolute before:bottom-[-0.1rem] before:transition-all before:duration-200 before:ease-in-out hover:before:w-full"
                                    href="#doubts"
                                >
                                    Dúvidas
                                </a>
                            </li>
                        </ul>

                        {handleUserConnected()}
                    </nav>

                    <div
                        onClick={() => setMenuOpen(prev => !prev)}
                        className={`bg-black w-full min-h-[100dvh] fixed top-0 left-0 z-[4] opacity-0 transition-all duration-500 ease-in-out invisible ${menuOpen ? 'opacity-60 visible' : ''}`}
                    ></div>
                </div>
            </header>
        </>
    )
}
