import useData from "./useData"
import { Genre } from "./useGenres"
import { Platform } from "./usePlatforms"
import { GameQuery } from '../App'


export interface Game {
    id: number
    name: string
    background_image: string
    genres: Genre[]
    parent_platforms: { platform: Platform }[]
    metacritic: number
}

const useGames = (gameQuery: GameQuery) => {
    return useData<Game>('/games',
        { params: { genres: gameQuery.genre?.id, platforms: gameQuery.platform?.id, ordering: gameQuery.ordering } },
        [gameQuery])
}

export default useGames
