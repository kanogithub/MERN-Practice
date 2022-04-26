import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import ListingForm from '../components/ListingForm'

function CreateListing() {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bathrooms: 1,
		bedrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		images: {},
		latitude: 0,
		longitude: 0,
	})

	const auth = getAuth()
	const navigate = useNavigate()
	const isMounted = useRef(true)

	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setFormData((prevState) => ({ ...prevState, userRef: user.uid }))
				} else {
					navigate('/sign-in')
				}
			})
		}

		return () => (isMounted.current = false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted])

	const onSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
	}

	const onMutate = (e) => {
		const value = e.target.value === 'true' ? true : e.target.value === 'false' ? false : null

		// Text/Booleans
		if (!e.target.files) {
			setFormData((prevState) => ({ ...prevState, [e.target.id]: value ?? e.target.value }))
		}

		// Files
		if (e.target.files) {
			setFormData((prevState) => ({ ...prevState, images: e.target.files }))
		}
	}

	if (loading) return <Spinner />
	return (
		<div className='profile'>
			<header>
				<p className='pageHeader'>Create a Listing</p>
			</header>

			<ListingForm formData={formData} onSubmit={onSubmit} onMutate={onMutate} />
		</div>
	)
}

export default CreateListing
