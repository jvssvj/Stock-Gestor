import styles from './index.module.css'
import { ChevronDown, IdCard, LogOut, ShieldUser, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ProfileDropdown({ navOnClick }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

    return (
        <div className={styles.profileDropdown}>

            <div onClick={() => setProfileDropdownOpen(prev => !prev)} className={styles.profileDropdown__avatarButton}>
                {(user?.avatarUrl) ?
                    <img
                        className={styles.profileDropdown__userAvatar}
                        src={user.avatarUrl}
                        alt=""
                    />
                    :
                    <span className={styles.profileDropdown__userAvatar}>
                        {user?.name.slice(0, 1)}
                    </span>
                }
                <span>{user.name}</span>
                <span className={`${styles.profileDropdown__userAvatar__arrow} ${profileDropdownOpen ? styles.arrow__animation : ''}`}>{<ChevronDown />}</span>
            </div>

            <div className={`${styles.profileDropdown__menu} ${profileDropdownOpen ? styles.openProfileDropdown : styles.closeProfileDropdown}`}>
                <ul className={styles.profileDropdown__list}>
                    <li className={styles.profileDropdown__item}>
                        <a className={styles.profileDropdown__link} href="#">
                            <ShieldUser />
                            Minha conta
                        </a>
                    </li>
                    <li className={styles.profileDropdown__item}>
                        <a className={styles.profileDropdown__link} href="#">
                            <IdCard />
                            Meus dados
                        </a>
                    </li>
                    <li className={styles.profileDropdown__item}>
                        <a
                            className={styles.profileDropdown__link} href="#subscriptions"
                            onClick={() => {
                                navOnClick()
                                setProfileDropdownOpen(prev => !prev)
                            }}
                        >
                            <Star />
                            Planos
                        </a>
                    </li>
                </ul>

                <hr className={styles.profileDropdown__divider} />

                <button
                    className={styles.profileDropdown__button__logout}
                    onClick={() => {
                        logout()
                        navigate('/')
                    }}
                >
                    <LogOut />
                    Sair
                </button>
            </div>
        </div>
    )
}