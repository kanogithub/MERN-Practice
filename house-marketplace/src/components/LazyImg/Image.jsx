import spinner from '../../assets/spinner2.gif'

function Image({ url, alt, className }) {
	return (
		<img
			src={url}
			alt={alt}
			className={className}
			style={{ backgroundImage: `url(${spinner})` }}
			loading='lazy'
		/>
	)
}

export default Image
