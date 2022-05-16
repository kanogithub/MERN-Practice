import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db } from '../firebase.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import uuid from 'react-uuid'
import Spinner from '../components/Spinner'
import ListingForm from '../components/ListingForm'

function CreateListing() {
	const [loading, setLoading] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [geolocationEnabled, setGeolocationEnabled] = useState(true)
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

	const onSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)

		// checking schema
		if (formData.discountedPrice >= formData.regularPrice) {
			setLoading(false)
			toast.error('Discounted Price needs to be less than regular price')
			return
		}

		if (formData.images.length > 5) {
			setLoading(false)
			toast.error('Upload images may not over 5')
			return
		}

		let geolocation = {}
		let location
		let address_components

		// check for gelocation
		if (geolocationEnabled) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&
				key=${process.env.REACT_APP_GEOCODE_API_KEY}`
			)

			const data = await response.json()

			geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
			geolocation.lng = data.results[0]?.geometry.location.lng ?? 0
			location =
				data.status === 'ZERO_RESULTS' ? undefined : data.results[0].formatted_address

			// just check if has correct address by geolocationAPIs
			if (location === undefined || location.includes('undefined')) {
				setLoading(false)
				toast.error('Please enter a correct address')
				return
			}

			// when pass address check fit in address components
			address_components = {
				state: data.results[0]?.address_components[4].short_name,
				suburb: data.results[0]?.address_components[2].short_name,
				postCode: data.results[0]?.address_components[6].short_name,
			}
		} else {
			geolocation.lat = formData.latitude
			geolocation.lng = formData.longitude
		}

		// Store images in firebase using REsumable
		const storageImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage()
				const fileName = `${auth.currentUser.uid}-${image.name}-${uuid()}`
				const storageRef = ref(storage, `images/${fileName}`)
				const uploadTask = uploadBytesResumable(storageRef, image)
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						// handle snapshot state
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
						console.log('Upload is ' + progress + '% done')
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused')
								break
							case 'running':
								console.log('Upload is running')
								break
							default:
						}
					},
					(error) => {
						// handle error event
						reject(error)
					},
					() => {
						// handle success upload
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL)
						})
					}
				)
			})
		}

		const imageUrls = await Promise.all(
			[...formData.images].map((image) => storageImage(image))
		).catch((error) => {
			toast.error('Images not upload proprably')
			console.log(error)
		})

		const formDataCopy = {
			...formData,
			imageUrls,
			geolocation,
			timestamp: serverTimestamp(),
			location: formData.address,
			address_components,
		}

		delete formDataCopy.images
		delete formDataCopy.address
		!formDataCopy.offer && delete formDataCopy.discountedPrice

		const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
		setLoading(false)
		toast.success('Listing saved')
		navigate(`/category/${formDataCopy.type}/${docRef.id}`)
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
	// TODO: layout for desktop
	if (loading) return <Spinner />
	return (
		<div className='profile'>
			<header>
				<p className='pageHeader'>Create a Listing</p>
			</header>

			<ListingForm
				geolocationEnabled={geolocationEnabled}
				formData={formData}
				onSubmit={onSubmit}
				onMutate={onMutate}
			/>
		</div>
	)
}

export default CreateListing
