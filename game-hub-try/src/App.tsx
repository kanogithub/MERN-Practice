import { useState } from 'react'
import { Grid, GridItem, Show } from '@chakra-ui/react'
import GameGrid from './components/GameGrid'
import NavBar from './components/NavBar'
import GenreList from './components/GenreList'
import PlatformSelector from './components/PlatformSelector'
import { Genre } from './hooks/useGenres'
import { Platform } from './hooks/usePlatforms'

function App(): JSX.Element {
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
	const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)

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
				<NavBar />
			</GridItem>
			<Show above='lg'>
				<GridItem area='aside' paddingX={5}>
					<GenreList
						selectedGenre={selectedGenre}
						onSelectGenre={(genre) => setSelectedGenre(genre)}
					/>
				</GridItem>
			</Show>
			<GridItem area='main'>
				<PlatformSelector
					selectedPlatform={selectedPlatform}
					onPlatformSelect={(platform) => setSelectedPlatform(platform)}
				/>
				<GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} />
			</GridItem>
		</Grid>
	)
}

export default App
