import { apiFetch } from "./api"

export async function loginService(data) {
    return await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export async function registerService(data) {
    return apiFetch("/register", {
        method: "POST",
        body: JSON.stringify(data),
    })
}