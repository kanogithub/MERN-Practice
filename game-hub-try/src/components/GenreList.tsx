import { List, ListItem, Image, HStack, Text } from '@chakra-ui/react'
import GenreSkeleton from './GenreSkeleton'
import getCorppedImageUrl from '../utilities/image-url'
import useGenres from '../hooks/useGenres'

const GenreList = () => {
	const { data, error, isLoading } = useGenres()
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

	if (error) return null

	return (
		<List>
			{isLoading
				? skeletons.map((skeleton) => (
						<ListItem key={skeleton} paddingY={2}>
							<GenreSkeleton />
						</ListItem>
				  ))
				: data.map((genre) => (
						<ListItem key={genre.id} paddingY={2}>
							<HStack>
								<Image
									boxSize='32px'
									borderRadius={8}
									src={getCorppedImageUrl(genre.image_background)}
								/>
								<Text fontSize='lg'>{genre.name}</Text>
							</HStack>
						</ListItem>
				  ))}
		</List>
	)
}

export default GenreList
