import Axios from "axios";

export const getGenres = () => {
    return {
        type: 'GET_GENRES',
        payload: Axios.get('https://floating-sierra-16009.herokuapp.com/books/genre')
    }
}