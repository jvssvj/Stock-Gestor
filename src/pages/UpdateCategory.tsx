import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import CategoryForm, { type CategoryFormValues } from "@/components/CategoryForm"
import { getCategoryService, updateCategoryService } from "@/services/appService"
import { hasValidationErrors } from "@/utils/apiErrors"
import { parseApiValidationErrors } from "@/utils/parseApiValidationErrors"
import type { FieldErrors } from "@/types"
import { useEffect } from "react"
import Spinner from "@/components/Spinner"

export default function UpdateCategory() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [defaultValues, setDefaultValues] = useState<CategoryFormValues | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverErrors, setServerErrors] = useState<FieldErrors>({})

    useEffect(() => {
        if (!id) return

        async function fetchCategory(categoryId: string) {
            try {
                const response = await getCategoryService(categoryId)

                if (!response.data) return

                const { name, iconName, color } = response.data
                setDefaultValues({ name, iconName, color })
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategory(id)
    }, [id])


    function clearError(field: string) {
        setServerErrors((prev) => {
            const next = { ...prev }
            delete next[field]
            return next
        })
    }

    async function handleSubmit(values: CategoryFormValues) {
        setServerErrors({})
        setIsSubmitting(true)

        try {
            const response = await updateCategoryService(id!, values)

            navigate("/app/success", {
                state: {
                    status: "update",
                    resource: "category",
                    data: response.data,
                },
            })
        } catch (error) {
            if (hasValidationErrors(error)) {
                setServerErrors(parseApiValidationErrors(error.errors))
            } else {
                console.error(error)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return (
        <div className="w-full h-full flex items-center justify-center">
            <Spinner />
        </div>
    )

    if (!defaultValues) return (
        <p className="text-sm text-text-muted">Categoria não encontrada.</p>
    )

    return (
        <main className="w-full max-w-container">
            <header className="mb-8">
                <Link
                    to="/app/categories"
                    className="inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-text-main no-underline"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Voltar para categorias
                </Link>
                <h1 className="mt-3 text-2xl font-bold text-text-main">Editar categoria</h1>
                <p className="mt-1 text-sm text-text-muted">
                    Atualize nome, ícone ou cor da categoria.
                </p>
            </header>

            <CategoryForm
                defaultValues={defaultValues}
                serverErrors={serverErrors}
                onServerErrorClear={clearError}
                isSubmitting={isSubmitting}
                submitLabel="Salvar alterações"
                onSubmit={handleSubmit}
            />
        </main>
    )
}