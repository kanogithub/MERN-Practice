function Image({ url, alt, className }) {
	return <img src={url} alt={alt} className={className} loading='lazy' />
}

export default Image
