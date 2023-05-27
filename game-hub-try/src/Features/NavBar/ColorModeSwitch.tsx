import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'

const ColorModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<HStack width={150} justifyContent='center'>
			<Switch
				colorScheme='green'
				isChecked={colorMode === 'dark'}
				onChange={toggleColorMode}
			/>
			<Text whiteSpace='nowrap'>Dark Mode</Text>
		</HStack>
	)
}

export default ColorModeSwitch