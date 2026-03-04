const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function apiFetch(endpoint, options = {}) {
    // 1. Pegamos o token do storage
    const token = localStorage.getItem("token");

    // 2. Criamos os cabeçalhos padrão
    const headers = {
        "Content-Type": "application/json",
    };

    // 3. Só adicionamos o Authorization se o token REALMENTE existir
    // Isso evita enviar "Bearer null" ou "Bearer undefined"
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // 4. Se você passou headers extras nas 'options', eles entram aqui
    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    // 5. Fazemos a requisição unindo tudo
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options, // Método (GET, POST), Body, etc.
        headers: headers, // Nossos headers tratados
    });

    // 6. TRATAMENTO DE ERRO ESTRATÉGICO
    if (!response.ok) {
        let message = "Erro na requisição";

        try {
            // Tentamos ler o JSON de erro
            const errorData = await response.json();
            message = errorData.error || errorData.message || message;
        } catch (err) {
            // Se o servidor não mandou JSON, o erro continua sendo o padrão
            console.error("Servidor não retornou JSON de erro.", err);
        }

        throw new Error(message);
    }

    // 7. Retorno de sucesso
    return response.json();
}