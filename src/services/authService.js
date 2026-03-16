import { apiFetch } from "./api"

export async function loginService(data) {
    return await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export async function registerService(data) {
    return apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(data),
    })
}