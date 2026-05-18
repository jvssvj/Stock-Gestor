import { apiFetch } from "./api";

export async function createItemService(data) {
    const response = await apiFetch("/items", {
        method: "POST",
        body: JSON.stringify(data)
    })

    return response.data
}

export async function updateItemService(id, data) {
    const response = await apiFetch(`/items/${id}`, {
        method: "PUT",
        body: data
    })

    return response.data
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