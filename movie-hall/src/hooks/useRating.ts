import { CanceledError } from 'axios'
import { useState, useEffect } from 'react'
import MovieService from '../services/movie-service'

const useRating = (movieTitle: string) => {
    const [error, setError] = useState('')
    const [rating, setRating] = useState(0)

    const _movieService = new MovieService()
    const _movieId = movieTitle.replace('title', '').replaceAll('/', '')

    useEffect(() => {
        const { request, cancel } = _movieService.GetRatings(_movieId)
        request
            .then(res => {
                setRating(res.data.rating)
            })
            .catch(err => {
                if (err instanceof CanceledError) console.log('Rating Request Canceled')
                else setError(err.message)
            })

        return () => {
            cancel()
        }
    }, [])

    return { error, rating }
}

export default useRating