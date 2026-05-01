import { ChevronDown, IdCard, LogOut, ShieldUser, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ProfileDropdown({ navOnClick }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

    return (
        <div className="ml-auto relative w-full max-w-[350px] flex flex-col items-end max-[720px]:items-start max-[720px]:before:content-[''] max-[720px]:before:w-full max-[720px]:before:h-px max-[720px]:before:bg-border max-[720px]:before:my-4">

            <div
                onClick={() => setProfileDropdownOpen(prev => !prev)}
                className="text-base bg-transparent cursor-pointer flex items-center gap-2 max-[720px]:cursor-default"
            >
                {(user?.avatarUrl) ?
                    <img
                        className="w-[40px] h-[40px] rounded-lg border-2 border-border flex items-center justify-center no-underline text-[var(--color-text)]"
                        src={user.avatarUrl}
                        alt=""
                    />
                    :
                    <span className="w-[40px] h-[40px] rounded-lg border-2 border-border flex items-center justify-center no-underline text-[var(--color-text)]">
                        {user?.name.slice(0, 1)}
                    </span>
                }
                <span>{user.name}</span>
                <span className={`w-[24px] h-[24px] ml-2 transition-all duration-[400ms] ease-in-out max-[720px]:hidden ${profileDropdownOpen ? 'rotate-180' : ''}`}>
                    {<ChevronDown />}
                </span>
            </div>

            <div className={`bg-white border border-border absolute top-[60px] w-full py-6 px-4 rounded-lg transition-all duration-300 ease-in-out max-[720px]:static max-[720px]:p-0 max-[720px]:border-0 max-[720px]:opacity-100 max-[720px]:visible ${profileDropdownOpen ? 'visible opacity-100' : 'opacity-0 invisible'}`}>
                <ul className="flex flex-col items-start gap-4 max-[720px]:mt-4">
                    <li>
                        <a
                            className="flex items-center gap-4 no-underline text-[var(--color-text)] bg-transparent text-base cursor-pointer [&>svg]:transition-[0.2s] hover:[&>svg]:text-primary"
                            href="#"
                        >
                            <ShieldUser />
                            Minha conta
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-4 no-underline text-[var(--color-text)] bg-transparent text-base cursor-pointer [&>svg]:transition-[0.2s] hover:[&>svg]:text-primary"
                            href="#"
                        >
                            <IdCard />
                            Meus dados
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-4 no-underline text-[var(--color-text)] bg-transparent text-base cursor-pointer [&>svg]:transition-[0.2s] hover:[&>svg]:text-primary"
                            href="#subscriptions"
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

                <hr className="h-px w-full bg-border my-4 max-[720px]:hidden" />

                <button
                    className="flex items-center gap-4 no-underline text-[var(--color-text)] bg-transparent text-base cursor-pointer [&>svg]:transition-[0.2s] hover:[&>svg]:text-primary max-[720px]:mt-4"
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
