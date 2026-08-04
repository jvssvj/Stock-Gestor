import { apiFetch } from "./apiFetch";
import type { ApiEnvelope, Category, CreateCategory, Id, Item, MessageResponse, PaginatedResponse, UpdateCategory } from "@/types";

export async function createItemService(data: FormData): Promise<ApiEnvelope<Item>> {
    return await apiFetch<ApiEnvelope<Item>>("/items", {
        method: "POST",
        body: data
    })
}

export async function updateItemService(id: Id, data: FormData): Promise<ApiEnvelope<Item>> {
    return await apiFetch<ApiEnvelope<Item>>(`/items/${id}`, {
        method: "PUT",
        body: data
    })
}

export async function deleteItemService(id: Id): Promise<MessageResponse> {
    return await apiFetch<MessageResponse>(`/items/${id}`, {
        method: "DELETE"
    })
}

export async function getItemsService(page = 1): Promise<PaginatedResponse<Item>> {
    return await apiFetch<PaginatedResponse<Item>>(`/items?page=${page}`, {
        method: "GET"
    })
}

export async function getItemService(id: Id): Promise<ApiEnvelope<Item>> {
    return await apiFetch<ApiEnvelope<Item>>(`/items/${id}`, {
        method: "GET"
    })
}

export async function getCategoriesService(): Promise<ApiEnvelope<Category[]> | Category[]> {
    return await apiFetch<ApiEnvelope<Category[]> | Category[]>('/categories', {
        method: "GET"
    })
}

export async function getCategoryService(id: Id): Promise<ApiEnvelope<Category | null>> {
    return await apiFetch<ApiEnvelope<Category | null>>(`/categories/${id}`, {
        method: "GET"
    })
}

export async function createCategoryService(data: CreateCategory): Promise<ApiEnvelope<Category>> {
    return await apiFetch<ApiEnvelope<Category>>("/categories", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function updateCategoryService(id: Id, data: UpdateCategory): Promise<ApiEnvelope<Category>> {
    return await apiFetch<ApiEnvelope<Category>>(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    })
}

export async function deleteCategoryService(id: Id): Promise<MessageResponse> {
    return await apiFetch<MessageResponse>(`/categories/${id}`, {
        method: "DELETE"
    })
}