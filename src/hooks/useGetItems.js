import { getItemsService } from "@/services/appService"
import { useEffect, useRef, useState } from "react"

export default function useGetItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)       // loading inicial
  const [loadingPage, setLoadingPage] = useState(false) // loading de paginação
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    const fetchItems = async () => {
      if (isFirstLoad.current) {
        setLoading(true)
      } else {
        setLoadingPage(true)
      }

      try {
        const data = await getItemsService(currentPage)
        setItems(data)
        isFirstLoad.current = false
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
        setLoadingPage(false)
      }
    }

    fetchItems()
  }, [currentPage])

  return { items, setItems, loading, loadingPage, error, currentPage, setCurrentPage }
}