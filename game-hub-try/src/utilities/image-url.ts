import { useScroll } from "framer-motion"
import noImagePlaceHoder from '../assets/no-image-placeholder.webp'

const getCorppedImageUrl = (url: string) => {
    if (!url) return noImagePlaceHoder
    const target = 'media/'
    const index = url.indexOf(target) + target.length
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index)
}

export default getCorppedImageUrl