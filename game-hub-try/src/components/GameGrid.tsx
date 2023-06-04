import useGames from '../hooks/useGames'
import GameCard from '../Features/GameCard/GameCard'
import GameCardSkeleton from '../Features/GameCard/GameCardSkeleton'
import GameCardContainer from '../Features/GameCard/GameCardContainer'
import { SimpleGrid, Text } from '@chakra-ui/react'
import { GameQuery } from '../App'

interface Props {
	gameQuery: GameQuery
}

const GameGrid = ({ gameQuery }: Props) => {
	const { data, error, isLoading } = useGames(gameQuery)
	const skeletons = [1, 2, 3, 4, 5, 6]

	return (
		<>
			{error && <Text>{error}</Text>}
			<SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6} padding={3}>
				{isLoading
					? skeletons.map((s) => (
							<GameCardContainer key={s}>
								<GameCardSkeleton />
							</GameCardContainer>
					  ))
					: data.map((game) => (
							<GameCardContainer key={game.id}>
								<GameCard game={game} />
							</GameCardContainer>
					  ))}
			</SimpleGrid>
		</>
	)
}

export default GameGrid
