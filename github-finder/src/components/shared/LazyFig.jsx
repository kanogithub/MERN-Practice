import { useEffect } from 'react'
import axios from 'axios'
// import spinner from '../assets/spinner.gif'

const STATS_VERCEL_APP = process.env.REACT_APP_STATS_VERCEL

const vercel = axios.create({
	baseURL: STATS_VERCEL_APP,
})

function LazyFig({ _className, _src }) {
	// const [img, setImg] = useState({ isLoading: true, src: null })
	useEffect(() => {
		vercel.get(`${STATS_VERCEL_APP}${_src}`).then((result) => console.log(result))
	}, [_src])

	return <figure className={_className}>{null}</figure>
}

export default LazyFig
