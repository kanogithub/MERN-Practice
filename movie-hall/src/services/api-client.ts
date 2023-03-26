import axios from 'axios'

export default axios.create({
    baseURL: 'https://imdb8.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
})