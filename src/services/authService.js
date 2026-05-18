import { apiFetch } from "./api"

export async function loginService(data) {
    const response = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.data
}

export async function registerService(data) {
    return apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(data),
    })
}