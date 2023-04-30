import { Skeleton, HStack } from '@chakra-ui/react'

const GenreSkeleton = () => {
	return (
		<HStack alignItems='end'>
			<Skeleton height='32px' width='32px' />
			<Skeleton height='24px' width='100px' />
		</HStack>
	)
}

export default GenreSkeleton
