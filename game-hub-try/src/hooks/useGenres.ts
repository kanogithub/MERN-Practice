import { useState, useEffect } from 'react'
import apiClient from '../services/api-client'
import { AxiosError, CanceledError } from 'axios'

export interface Genre {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
}

interface GenreResponseProps {
    count: number
    results: Genre[]
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        setIsLoading(true)

        apiClient
            .get<GenreResponseProps>('/genres', { signal: controller.signal })
            .then((res) => {
                setGenres(res.data.results)
            })
            .catch((err: AxiosError) => {
                if (err instanceof CanceledError) return
                setError(err.message)
            })
            .finally(() => setIsLoading(false))

        return () => controller.abort()
    }, [])

    return { genres, error, isLoading }
}

export default useGenres
