export type Id = string | number

export interface User {
  id?: Id
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  avatarUrl?: string
}


export interface DashboardItem {
  id: string
  name: string
  quantity: number
}

export interface RecentItem extends DashboardItem {
  createdAt: string
}

export interface DashboardMovement {
  label: string
  value: number
}

export interface DashboardAttentionItem {
  id: Id
  name: string
  missingFields: string[]
}

export interface Dashboard {
  totalDifferentItems: number
  totalQuantity: number
  lowStockCount: number
  lowStockItems: DashboardItem[]
  recentItems: RecentItem[]
  topMovements: DashboardMovement[]
  itemsByCategory: DashboardMovement[]
  needsAttention: DashboardAttentionItem[]
}

export interface Category {
  id: Id
  name: string
  color: string
  iconName: string
  _count: {
    items: number
  }
}

export interface CreateCategory {
  name: string
  color: string
  iconName: string
}

export type UpdateCategory = Partial<CreateCategory>

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

export interface ItemFormData {
  name: string
  quantity: number | string
  priceInCents: number | string
  category: string
  description: string
  sku: string
  reason: string
  image?: File | null
}

export interface ItemFormSubmit {
  id: Id
  name: string
  quantity: number
  priceInCents: number
  category: string
  description: string
  sku: string
  reason: string
  updatedAt: string
  image?: File | null
  imageRemoved?: boolean
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

export interface MessageResponse {
  message: string
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
