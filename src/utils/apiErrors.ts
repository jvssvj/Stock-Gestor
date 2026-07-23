import type { ValidationError } from "@/types"

export interface ApiErrorResponse {
  message?: string
  errors?: ValidationError[]
}

export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return typeof error === "object" && error !== null
}

export function hasValidationErrors(error: unknown): error is { errors: ValidationError[] } {
  if (!isApiErrorResponse(error)) return false
  return Array.isArray(error.errors)
}
