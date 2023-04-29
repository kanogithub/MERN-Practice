import axios from "axios";

// https://api.rawg.io/docs/
export default axios.create({
    baseURL: import.meta.env.VITE_RAWGIO_BASEURL,
    params: {
        key: import.meta.env.VITE_RAWGIO_KEY
    }
})