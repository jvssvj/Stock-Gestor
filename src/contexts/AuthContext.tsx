/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useCallback, useEffect, type ReactNode } from "react";
import type { User } from "@/types";

export interface AuthContextValue {
    user: User | null
    login: (userData: User, token: string) => void
    logout: () => void
    getToken: () => string | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) as User : null
        } catch {
            return null
        }
    })

    const login = useCallback((userData: User, token: string) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }, [])

    useEffect(() => {
        function handleStorageChange(e: StorageEvent) {
            if (e.key === "user" || e.key === "token") {
                const storedUser = localStorage.getItem("user");
                setUser(storedUser ? JSON.parse(storedUser) as User : null);
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    const getToken = useCallback(() => localStorage.getItem("token"), [])

    const value = useMemo<AuthContextValue>(() => {
        return { user, login, logout, getToken }
    }, [user, login, logout, getToken])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
