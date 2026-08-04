import { apiFetch } from "./apiFetch"
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

export async function forgotPasswordService(email: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
    })
}

export async function resetPasswordService(data: {
    email: string
    code: string
    newPassword: string
}): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
            email: data.email,
            otpCode: data.code,
            newPassword: data.newPassword,
        }),
    })
}

export async function requestOtpService(): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/auth/request-otp", {
        method: "POST",
    })
}

export async function getMeService(): Promise<ApiEnvelope<User>> {
    return apiFetch<ApiEnvelope<User>>("/users/me", {
        method: "GET",
    })
}

export async function updateMeService(data: FormData): Promise<ApiEnvelope<User>> {
    return apiFetch<ApiEnvelope<User>>("/users/me", {
        method: "PUT",
        body: data,
    })
}

export async function changePasswordService(data: { otpCode: string, newPassword: string }): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/users/me/password", {
        method: "POST",
        body: JSON.stringify({
            otpCode: data.otpCode,
            newPassword: data.newPassword,
        }),
    })
}

export async function requestEmailChangeOtpService(): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/auth/request-otp", {
        method: "POST",
    })
}

export async function verifyOtpService(data: { email: string; code: string }): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify(data),
    })
}