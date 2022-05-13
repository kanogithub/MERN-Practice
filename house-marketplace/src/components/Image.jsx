import { useState, useEffect } from 'react'

function Image({ url, alt, className }) {
	const [img, setImg] = useState()

	const fetchImage = async () => {
		const res = await fetch(url)
		const imageBlob = await res.blob()
		const imageObjectURL = URL.createObjectURL(imageBlob)
		setImg(imageObjectURL)
	}

	useEffect(() => {
		fetchImage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <img src={img} alt={alt} className={className} />
}

export default Image
