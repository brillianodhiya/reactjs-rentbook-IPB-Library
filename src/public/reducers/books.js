const initiaState = {
    bookList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const book = (state = initiaState, action) => {
    switch (action.type) {
        case 'GET_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data
            };
        default:
            return state;
    }
}

export default book;