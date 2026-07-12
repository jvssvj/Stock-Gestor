import { apiFetch } from "./api";

export async function createItemService(data) {
    return await apiFetch("/items", {
        method: "POST",
        body: data
    })
}

export async function updateItemService(id, data) {
    return await apiFetch(`/items/${id}`, {
        method: "PUT",
        body: data
    })
}

export async function deleteItemService(id) {
    return await apiFetch(`/items/${id}`, {
        method: "DELETE",
    })
}

export async function getItemsService(page = 1) {
    return await apiFetch(`/items?page=${page}`, {
        method: "GET"
    })
}

export async function getItemService(id) {
    return await apiFetch(`/items/${id}`, {
        method: "GET"
    })
}

export async function getCategoriesService() {
    return await apiFetch('/categories', {
        method: "GET"
    })
}