import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_RAWGIO_BASEURL,
    params: {
        key: import.meta.env.VITE_RAWGIO_KEY
    }
})