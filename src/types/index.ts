export type Id = string | number

export interface User {
  id?: Id
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  avatarUrl?: string
}

export interface Category {
  id: Id
  name: string
  color: string
  iconName: string
}

export interface ItemMovementChange {
  field: string
  oldValue: string | number | null
  newValue: string | number | null
}

export interface ItemMovement {
  id: Id
  reason?: string
  createdAt?: string
  changes: ItemMovementChange[]
}

export interface Item {
  id: Id
  name: string
  quantity: number
  priceInCents: number
  sku?: string
  category?: Category | null
  description?: string
  imageUrl?: string
  createdAt?: string
  updatedAt?: string
  movements?: ItemMovement[]
}

export interface PaginationMeta {
  totalItems?: number
  totalPages: number
  currentPage?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface ApiEnvelope<T> {
  data: T
  message?: string
}

export interface ValidationError {
  field: string
  message: string
}

export type FieldErrors = Record<string, string>

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  firstName: string
  lastName: string
}

export interface AuthResponse {
  user: User
  token: string
}
