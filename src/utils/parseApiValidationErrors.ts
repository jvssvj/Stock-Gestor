import type { FieldErrors, ValidationError } from "@/types"

export function parseApiValidationErrors(errors: ValidationError[] = []): FieldErrors {
    return errors.reduce((acc, { field, message }) => {
        acc[field] = message
        return acc
    }, {} as FieldErrors)
}
