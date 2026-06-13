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

export async function getItemsService() {
    return await apiFetch("/items", {
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