import apiClient from './api-client'

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
    width: number
    height: number
    url: string
}

export interface Media {
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

export interface MovieDetail {
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

    GetDetails(id: string) {
        const controller = new AbortController()
        const config = {
            params: { tconst: id, currentCountry: 'AU' },
            signal: controller.signal,
        }

        const request = apiClient.get<MovieDetail>(
            `${this._endPoint}/get-overview-details`,
            config
        )

        return {
            request,
            cancel: () => {
                controller.abort()
            },
        }
    }

    GetMostPupularMovies() {
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

    GetRatings(id: string) {
        const controller = new AbortController()
        const config = {
            params: { tconst: id },
            signal: controller.signal,
        }

        const request = apiClient.get<Rating>(
            `${this._endPoint}/get-ratings`,
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
