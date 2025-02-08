'use client'
import Cliploader from 'react-spinners/ClipLoader'

const override = {
  display: 'block',
  margin: '100px auto'
}

const Spinner = () => {
  return (
    <Cliploader
      color='#3b82f6'
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
    />
  )

}
 
export default Spinner;