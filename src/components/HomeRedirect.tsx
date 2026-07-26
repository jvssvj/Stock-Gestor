import { Navigate } from "react-router-dom"

export default function HomeRedirect() {
    const token = localStorage.getItem("token")

    return <Navigate to={token ? "/app" : "/home"} replace />
}