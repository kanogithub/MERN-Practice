import { Suspense, lazy, useMemo } from 'react'
import Spinner2 from '../../layouts/Spinner2'

function LazyImg({ src, alt, className }) {
	const Image = lazy(() => import('./Image'))

	return useMemo(
		() => (
			<Suspense fallback={<Spinner2 />}>
				<Image url={src} alt={alt} className={className} />
			</Suspense>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[src]
	)
}

export default LazyImg
