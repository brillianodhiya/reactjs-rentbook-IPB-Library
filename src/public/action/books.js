import Axios from 'axios';

export const getBooks = () => {
    return {
        type: 'GET_BOOK',
        payload: Axios.get ('http://localhost:8888/books/all')
    };
};

export const addBooks = (title, description, image, date_released, genre) => {
    return {
        type: 'POST_BOOK',
        payload: Axios.post('http://localhost:8888/books/', {
            title,
            description,
            image,
            date_released,
            genre,
        })
    }
};

export const updateBook = (idbooks, title, description, image) => {
    return {
        type: 'UPDATE_BOOK',
        payload: Axios.patch(`http://localhost:8888/books/?idbooks=${idbooks}`, {
            title,
            description,
            image,
        })
    };
};

export const deleteBook = (idbooks) => {
    return {
        type: 'DELETE_BOOK',
        payload: Axios.delete(`http://localhost:8888/books/?idbooks=${idbooks}`)
    };
};

export const rentBook = (idbooks) => {
    return {
        type: 'RENT_BOOK',
        payload: Axios.post(`http://localhost:8888/books/rent/${idbooks}`)
    };
};

export const returnBook = (idbooks) => {
    return {
        type: 'RETURN_BOOK',
        payload: Axios.post(`http://localhost:8888/books/return/${idbooks}`)
    };
};

export const getRent = () => {
    return {
        type: 'GET_RENT_BOOK',
        payload: Axios.get(`http://localhost:8888/books/rent/`)
    };
};