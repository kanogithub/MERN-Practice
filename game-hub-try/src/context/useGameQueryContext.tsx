import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
import { Genre } from '../hooks/useGenres'
import { Platform } from '../hooks/usePlatforms'
import { SortItem } from '../components/SortSelector'

export interface GameQuery {
	genre: Genre | null
	platform: Platform | null
	ordering: SortItem | null
	searchText: string | null
}

export interface GameQueryContextProps {
	gameQuery: GameQuery
	setGameQueryValue: (value: Partial<GameQuery>) => void
}

export const GameQueryContext = createContext<GameQueryContextProps>({} as GameQueryContextProps)

interface Props {
	children: ReactNode
}

export const GameQueryContextProvider = ({ children }: Props) => {
	const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)
	const setGameQueryValue = (value: Partial<GameQuery>) => {
		setGameQuery({ ...gameQuery, value } as SetStateAction<GameQuery>)
	}

	return (
		<GameQueryContext.Provider value={{ gameQuery, setGameQueryValue }}>
			{children}
		</GameQueryContext.Provider>
	)
}

export const useGameQueryContext = () => useContext(GameQueryContext)
