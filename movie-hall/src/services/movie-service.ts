import apiClient from './api-client'
import { CanceledError, AxiosResponse } from 'axios'

// type and interface
export enum Genres {
    'Action' = 'action',
    'Adventure' = 'adventure',
    'Animation' = 'animation',
    'Biography' = 'biography',
    'Comedy' = 'comedy',
    'Crime' = 'crime',
    'Documentary' = 'documentary',
    'Drama' = 'drama',
    'Family' = 'family',
    'Fantasy' = 'fantasy',
    'Film-noir' = 'film-noir',
    'History' = 'history',
    'Horror' = 'horror',
    'Musical' = 'musical',
    'Mystery' = 'mystery',
    'Romance' = 'romance',
    'Thriller' = 'thriller',
    'War' = 'war',
    'Western' = 'western',
}

export interface Image {
    id: string
    width: number
    height: number
    url: string
}

export interface Media {
    id: string
    runningTimeInMinutes: number
    title: string
    titleType: string
    year: number
    image: Image
}

export interface Rating {
    rating: number
    topRank: number
}

export interface UserReview {
    reviews: {
        author: { displayName: string }
        authorRating: number
        reviewText: string
        reviewTitle: string
        submissionDate: string
    }[]
}

export interface MovieDetail {
    id: string
    title: Media
    ratings: Rating
    genres: Genres[]
    releaseDate: string
    plotOutline: { text: string }
    plotSummary: { text: string }
}

// Class
class MovieService {
    readonly _endPoint: string = '/title'
    readonly _timesToRetry: number = 3

    wait(ms: number) { return new Promise(resolve => { setTimeout(resolve, ms) }) }

    GetDetails(id: string) {
        const controller = new AbortController()
        const config = {
            params: { tconst: id, currentCountry: 'AU' },
            signal: controller.signal,
        }

        // Implement Retry Pattern
        let currentTry = 0
        const response = new Promise<AxiosResponse<MovieDetail>>(async (resolve, reject) => {
            while (true) {
                try {
                    const res = await apiClient.get<MovieDetail>(
                        `${this._endPoint}/get-overview-details`,
                        config
                    )

                    resolve(res)
                    break
                }
                catch (err: any) {
                    currentTry++
                    if (err instanceof CanceledError || currentTry >= this._timesToRetry) {
                        reject(err)
                        break
                    }

                    await this.wait(1000)
                }
            }
        })

        return { response, cancel: () => controller.abort() }
    }

    GetMostPopularMovies() {
        const controller = new AbortController()
        const config = {
            params: {
                homeCountry: 'AU',
                purchaseCountry: 'AU',
                currentCountry: 'AU',
            },
            signal: controller.signal,
        }

        const request = apiClient.get<string[]>(
            `${this._endPoint}/get-most-popular-movies`,
            config
        )

        return {
            request,
            cancel: () => {
                controller.abort()
            },
        }
    }

    GetMostPupularMoviesByGenre(genre: Genres) {
        const controller = new AbortController()
        const config = {
            params: { genre, limit: '25' },
            signal: controller.signal,
        }

        const request = apiClient.get<string[]>(
            `${this._endPoint}/v2/get-popular-movies-by-genre`,
            config
        )

        return {
            request,
            cancel: () => {
                controller.abort()
            },
        }
    }

    GetUserReview(id: string) {
        const controller = new AbortController()
        const config = {
            params: { tconst: id },
            signal: controller.signal,
        }

        const request = apiClient.get<UserReview>(
            `${this._endPoint}/get-user-reviews`,
            config
        )

        return {
            request,
            cancel: () => {
                controller.abort()
            },
        }
    }

    GetTopRatedMovies() {
        const controller = new AbortController()
        const config = {
            signal: controller.signal,
        }

        const request = apiClient.get<string[]>(
            `${this._endPoint}/get-top-rated-movies`,
            config
        )

        return {
            request,
            cancel: () => {
                controller.abort()
            },
        }
    }

    FindMovie(query: string) {
        const controller = new AbortController()
        const config = {
            params: { title: query, titleType: 'movie', limit: '20', sortArg: 'moviemeter,asc' },
            signal: controller.signal,
        }

        const request = apiClient.get<Media[]>(
            `${this._endPoint}/v2/find`,
            config
        )

        return {
            request,
            cancel: () => {
                controller.abort()
            },
        }
    }
}

export default MovieService
