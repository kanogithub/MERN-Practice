import { Suspense, lazy } from 'react'
import Spinner2 from '../../layouts/Spinner2'

function LazyImg({ src, alt, className }) {
	const Image = lazy(() => import('./Image'))

	return (
		<Suspense fallback={<Spinner2 />}>
			<Image url={src} alt={alt} className={className} />
		</Suspense>
	)
}

export default LazyImg
