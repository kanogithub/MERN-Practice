import spinner from '../assets/spinner2.gif'

function Spinner2() {
	return (
		<div className='w-100 mt-20'>
			<img width={180} className='text-center mx-auto' src={spinner} alt='Loading...' />
		</div>
	)
}

export default Spinner2
