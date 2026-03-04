/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useCallback, useEffect } from "react";

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user")
        return stored ? JSON.parse(stored) : null
    })

    const login = useCallback((userData, token) => {
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
        function handleStorageChange(e) {
            if (e.key === "user" || e.key === "token") {
                const storedUser = localStorage.getItem("user");
                setUser(storedUser ? JSON.parse(storedUser) : null);
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    const value = useMemo(() => {
        return { user, login, logout }
    }, [user, login, logout])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}