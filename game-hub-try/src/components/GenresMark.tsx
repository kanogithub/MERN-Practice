import { Badge, Stack } from '@chakra-ui/react'
import { Genre } from '../hooks/useGenres'

interface Props {
	show: boolean
	genres: Genre[]
}

const GenresMark = ({ show, genres }: Props) => {
	if (genres.length <= 0) return null

	return (
		<Stack className='genre-mark' direction='row' top={show ? '0' : '-10'}>
			{genres.map((genre) => (
				<Badge
					key={genre.id}
					colorScheme='messenger'
					style={{ userSelect: 'none', msUserSelect: 'none', MozUserSelect: 'none' }}>
					{genre.name}
				</Badge>
			))}
		</Stack>
	)
}

export default GenresMark
