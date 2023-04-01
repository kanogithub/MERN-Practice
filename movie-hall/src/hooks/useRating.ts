import { CanceledError } from 'axios'
import { useState, useEffect } from 'react'
import MovieService, { Rating } from '../services/movie-service'

const useRating = (movieTitle: string) => {
    const [error, setError] = useState('')
    const [rating, setRating] = useState<Rating>()

    const _movieService = new MovieService()
    const _movieId = movieTitle.replace('title', '').replaceAll('/', '')

    useEffect(() => {
        const { request, cancel } = _movieService.GetRatings(_movieId)
        request
            .then(res => {
                setRating(res.data)
            })
            .catch(err => {
                if (err instanceof CanceledError) console.log('Request Canceled')
                else setError(err.message)
            })

        return () => {
            cancel()
        }
    }, [])

    return { error, rating }
}

export default useRating