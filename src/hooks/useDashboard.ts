import { useEffect, useState } from "react"
import { dashboardService } from "@/services/appService"
import type { Dashboard } from "@/types"

export function useDashboard() {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchDashboard() {
            try {
                setLoading(true)
                const response = await dashboardService()
                setDashboard(response.data)
            } catch (error) {
                console.error(error)
                setError("Erro ao carregar o dashboard.")
            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()
    }, [])

    return {
        dashboard,
        loading,
        error,
    }
}