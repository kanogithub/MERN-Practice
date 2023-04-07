import { CanceledError } from 'axios'
import { useState, useEffect } from 'react'
import MovieService, { MovieDetail } from '../services/movie-service'

const wait = (ms: number) => new Promise(resolve => { setTimeout(resolve, ms) })

const useMovieData = (movieTitle: string) => {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [movieData, setMovieData] = useState<MovieDetail>()
    const _movieService = new MovieService()

    const fetchData = async (controller: AbortController) => {
        const movieId = movieTitle.replace('title', '').replaceAll('/', '')
        const timesToTry = 3

        let currentTry = 0
        while (true) {
            try {
                const response = await _movieService.GetDetails(movieId, controller)

                setMovieData(response.data)
                setLoading(false)
                break
            }
            catch (err: any) {
                if (err instanceof CanceledError) {
                    console.log('Movie Data Request Canceled')
                    break
                }

                currentTry++
                if (currentTry == timesToTry) {
                    setError(err.message)
                    break
                }

                await wait(1000)
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        fetchData(controller)

        return () => controller.abort()
    }, [])

    return { isLoading, error, movieData }
}

export default useMovieData