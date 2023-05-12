import { Badge, Stack } from '@chakra-ui/react'
import { Genre } from '../hooks/useGenres'

interface Props {
	show: boolean
	genres: Genre[]
}

const GenresMark = ({ show, genres }: Props) => {
	if (genres.length <= 0) return null

	return (
		<Stack
			direction='row'
			position='absolute'
			bgColor='black'
			width='100%'
			justifyContent='end'
			opacity={0.6}
			top={show ? '0' : '-10'}
			padding={2}
			style={{ transitionDuration: '0.3s' }}>
			{genres.map((genre) => (
				<Badge
					colorScheme='messenger'
					style={{ userSelect: 'none', msUserSelect: 'none', MozUserSelect: 'none' }}>
					{genre.name}
				</Badge>
			))}
		</Stack>
	)
}

export default GenresMark
