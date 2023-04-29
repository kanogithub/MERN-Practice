import { List, ListItem, Image, HStack, Text } from '@chakra-ui/react'
import getCorppedImageUrl from '../utilities/image-url'
import useGenres from '../hooks/useGenres'

const GenreList = () => {
	const { data } = useGenres()
	return (
		<List>
			{data.map((genre) => (
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
