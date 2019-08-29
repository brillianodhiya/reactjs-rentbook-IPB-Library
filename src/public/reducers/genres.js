const initialState = {
    genreList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
};

const genres = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_GENRES_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case 'GET_GENRES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_GENRES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                genreList: action.payload.data
            };
        default:
            return state;
    }
}

export default genres;