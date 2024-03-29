import './App.css'
import { useState } from 'react'
import { Flex, Grid, GridItem, Show } from '@chakra-ui/react'
import GameGrid from './components/GameGrid'
import NavBar from './Features/NavBar/NavBar'
import GenreList from './components/GenreList'
import PlatformSelector from './components/PlatformSelector'
import SortSelector, { SortItem } from './components/SortSelector'
import { Genre } from './hooks/useGenres'
import { Platform } from './hooks/usePlatforms'
import GameHeading from './components/GameHeading'

// Query Object Pattern - Get query statement in an object
export interface GameQuery {
	genre: Genre | null
	platform: Platform | null
	ordering: SortItem | null
	searchText: string | null
}

function App(): JSX.Element {
	const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)

	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`,
				lg: `"nav nav" "aside main"`, // 1024px
			}}
			gridTemplateColumns={{
				base: '1fr',
				lg: '200px 1fr',
			}}>
			<GridItem area='nav'>
				<NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} />
			</GridItem>
			<Show above='lg'>
				<GridItem area='aside' paddingX={5}>
					<GenreList
						selectedGenre={gameQuery.genre}
						onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
					/>
				</GridItem>
			</Show>
			<GridItem area='main'>
				<GameHeading gameQuery={gameQuery} />
				<Flex paddingInline={3} gap={3}>
					<PlatformSelector
						selectedPlatform={gameQuery.platform}
						onPlatformSelect={(platform) => setGameQuery({ ...gameQuery, platform })}
					/>
					<SortSelector
						selectedSort={gameQuery.ordering}
						onSortSelect={(sortItem) =>
							setGameQuery({ ...gameQuery, ordering: sortItem })
						}
					/>
				</Flex>

				<GameGrid gameQuery={gameQuery} />
			</GridItem>
		</Grid>
	)
}

export default App
