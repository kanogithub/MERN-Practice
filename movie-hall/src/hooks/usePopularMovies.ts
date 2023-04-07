import { CanceledError } from 'axios'
import { useState, useEffect } from 'react'
import MovieService from '../services/movie-service'

const usePopularMovies = () => {
    const [error, setError] = useState('')
    const [movies, setMovies] = useState<string[]>([])

    const _movieService = new MovieService()

    useEffect(() => {
        const { request, cancel } = _movieService.GetMostPopularMovies()
        request
            .then(res => {
                setMovies(res.data)
            })
            .catch(err => {
                if (err instanceof CanceledError) console.log('Get Popular List Request Canceled')
                else setError(err.message)
            })

        return () => {
            cancel()
        }
    }, [])

    return { error, movies }
}

export default usePopularMovies