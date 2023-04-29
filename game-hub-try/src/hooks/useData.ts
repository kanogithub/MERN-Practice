import { useState, useEffect } from 'react'
import { AxiosError, CanceledError } from 'axios'
import apiClient from '../services/api-client'

interface ResponseProps<T> {
    count: number
    results: T[]
}

const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        setIsLoading(true)

        apiClient
            .get<ResponseProps<T>>(endpoint, { signal: controller.signal })
            .then((res) => {
                setData(res.data.results)
            })
            .catch((err: AxiosError) => {
                if (err instanceof CanceledError) return
                setError(err.message)
            })
            .finally(() => setIsLoading(false))

        return () => controller.abort()
    }, [])

    return { data, error, isLoading }
}

export default useData
