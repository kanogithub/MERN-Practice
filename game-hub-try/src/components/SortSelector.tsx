import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import usePlatforms, { Platform } from '../hooks/usePlatforms'

interface Props {
	selectedPlatform: Platform | null
	onPlatformSelect: (platform: Platform | null) => void
}

const SortSelector = () => {
	const iconStyle = (open: boolean) => ({
		transitionDuration: '0.3s',
		transform: `rotate(${open ? '180' : '0'}deg)`,
	})

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton as={Button} rightIcon={<BsChevronDown style={iconStyle(isOpen)} />}>
						Order by: Relevance
					</MenuButton>
					<MenuList>
						<MenuItem>Relevance</MenuItem>
						<MenuItem>Date added</MenuItem>
						<MenuItem>Name</MenuItem>
						<MenuItem>Release date</MenuItem>
						<MenuItem>Popularity</MenuItem>
						<MenuItem>Average rating</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	)
}

export default SortSelector
