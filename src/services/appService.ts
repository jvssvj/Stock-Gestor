import { apiFetch } from "./api";
import type { ApiEnvelope, Category, Id, Item, PaginatedResponse } from "@/types";

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

export async function deleteItemService(id: Id): Promise<ApiEnvelope<Item>> {
    return await apiFetch<ApiEnvelope<Item>>(`/items/${id}`, {
        method: "DELETE",
    })
}

export async function getItemsService(page = 1): Promise<PaginatedResponse<Item>> {
    return await apiFetch<PaginatedResponse<Item>>(`/items?page=${page}`, {
        method: "GET"
    })
}

export async function getItemService(id: Id): Promise<ApiEnvelope<Item> | Item> {
    return await apiFetch<ApiEnvelope<Item> | Item>(`/items/${id}`, {
        method: "GET"
    })
}

export async function getCategoriesService(): Promise<ApiEnvelope<Category[]> | Category[]> {
    return await apiFetch<ApiEnvelope<Category[]> | Category[]>('/categories', {
        method: "GET"
    })
}
