export function parseApiValidationErrors(errors = []) {
    return errors.reduce((acc, { field, message }) => {
        acc[field] = message
        return acc
    }, {})
}