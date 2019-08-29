import Axios from "axios";

export const getGenres = () => {
    return {
        type: 'GET_GENRES',
        payload: Axios.get('http://localhost:8888/books/genre')
    }
}