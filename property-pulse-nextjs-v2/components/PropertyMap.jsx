'use client'
import { useState, useEffect } from 'react'
import { setDefaults, fromAddress } from 'react-geocode';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image';
import Spinner from './Spinner';
import pin from '@/assets/images/pin.svg'

const PropertyMap = ({ address }) => {
  const [latLng, setLatLng] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px'
  })
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)
  
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'au'
  })

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(address)

        // Check Geocode result
        if (res.results.length === 0) {
          setGeocodeError(true)
          return
        } else {
          const { lat, lng } = res.results[0].geometry.location
          setLatLng({ lat, lng })
          setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng
          })
        }
      } catch (error) {
        console.error(error)
        setGeocodeError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCoords()
  }, [])

  if (loading) return <Spinner />

  if (geocodeError) return <div className='text-xl'>No location data found</div>

  return (
    <Map
      mapLib={import('mapbox-gl')}
      mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_TOKEN }
      initialViewState={{
        longitude: latLng.lng,
        latitude: latLng.lat,
        zoom: 15
      }}
      style={{width: '100%', height: 500}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={latLng.lng} latitude={latLng.lat} anchor='bottom'>
        <Image src={pin} alt='location' width={40} height={40} />
      </Marker>
    </Map>
  );
}
 
export default PropertyMap;