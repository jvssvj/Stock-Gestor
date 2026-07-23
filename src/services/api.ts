const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function apiFetch<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token")

    const isFormData = options.body instanceof FormData

    const headers: Record<string, string> = {}

    if (!isFormData) {
        headers["Content-Type"] = "application/json"
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    if (options.headers) {
        Object.assign(headers, options.headers)
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    if (!response.ok) {
        let errorData: unknown = { message: "Erro na requisição" }
        try {
            errorData = await response.json()
        } catch {
            console.error("Servidor não retornou JSON de erro.")
        }
        throw errorData
    }

    return response.json() as Promise<T>
}
