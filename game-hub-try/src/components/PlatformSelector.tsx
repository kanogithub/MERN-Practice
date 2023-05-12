import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import usePlatforms from '../hooks/usePlatforms'

const PlatformSelector = () => {
	const { data, error } = usePlatforms()

	if (error) null
	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						as={Button}
						rightIcon={
							<BsChevronDown
								style={{
									transitionDuration: '0.3s',
									transform: `rotate(${isOpen ? '180' : '0'}deg)`,
								}}
							/>
						}>
						Platforms
					</MenuButton>
					<MenuList>
						{data.map((platform) => (
							<MenuItem key={platform.id}>{platform.name}</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	)
}

export default PlatformSelector
