import { CanceledError } from 'axios'
import { useState, useEffect } from 'react'
import MovieService, { MovieDetail } from '../services/movie-service'

const useMovieData = (movieTitle: string) => {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [movieData, setMovieData] = useState<MovieDetail>()
    const _movieService = new MovieService()
    const _movieId = movieTitle.replace('title', '').replaceAll('/', '')

    useEffect(() => {
        const { response, cancel } = _movieService.GetDetails(_movieId)
        response
            .then(res => {
                setMovieData(res.data)
                setLoading(false)
            })
            .catch(err => {
                if (err instanceof CanceledError)
                    console.log('Movie Data Request Canceled')
                else
                    setError(err.message)
            })

        return () => cancel()
    }, [])

    return { isLoading, error, movieData }
}

export default useMovieData