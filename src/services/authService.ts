import { apiFetch } from "./api"
import type { ApiEnvelope, AuthResponse, LoginPayload, RegisterPayload, User } from "@/types"

export async function loginService(data: LoginPayload): Promise<AuthResponse> {
    const response = await apiFetch<ApiEnvelope<AuthResponse>>("/login", {
        method: "POST",
        body: JSON.stringify(data),
    })

    return response.data
}

export async function registerService(data: RegisterPayload): Promise<ApiEnvelope<User>> {
    return apiFetch<ApiEnvelope<User>>("/register", {
        method: "POST",
        body: JSON.stringify(data),
    })
}
