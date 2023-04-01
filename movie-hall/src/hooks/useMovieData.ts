import { CanceledError } from 'axios'
import { useState, useEffect } from 'react'
import MovieService, { Media } from '../services/movie-service'

const useMovieData = (movieTitle: string) => {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [movieData, setMovieData] = useState<Media>()

    const _movieService = new MovieService()
    const _movieId = movieTitle.replace('title', '').replaceAll('/', '')

    useEffect(() => {
        const { request, cancel } = _movieService.GetDetails(_movieId)
        request
            .then(res => {
                setMovieData(res.data)
            })
            .catch(err => {
                if (err instanceof CanceledError) console.log('Request Canceled')
                else setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })

        return () => {
            cancel()
        }
    }, [])

    return { isLoading, error, movieData }
}

export default useMovieData