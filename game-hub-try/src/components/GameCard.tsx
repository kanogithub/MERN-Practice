import { Card, CardBody, Heading, HStack, Image } from '@chakra-ui/react'
import { Game } from '../hooks/useGames'
import PlatformList from './PlatformList'
import CriticScore from './CriticScore'
import getCorppedImageUrl from '../utilities/image-url'
import GenresMark from './GenresMark'
import { useState } from 'react'

interface Props {
	game: Game
}

const GameCard = ({ game }: Props) => {
	const [hoverOnCard, setHoverOnCard] = useState(false)

	return (
		<Card onMouseOver={() => setHoverOnCard(true)} onMouseLeave={() => setHoverOnCard(false)}>
			<Image src={getCorppedImageUrl(game.background_image)} />
			<GenresMark show={hoverOnCard} genres={game.genres} />
			<CardBody>
				<Heading fontSize='2xl'>{game.name}</Heading>
				<HStack justifyContent='space-between'>
					<PlatformList platforms={game.parent_platforms.map((p) => p.platform)} />
					<CriticScore score={game.metacritic} />
				</HStack>
			</CardBody>
		</Card>
	)
}

export default GameCard
