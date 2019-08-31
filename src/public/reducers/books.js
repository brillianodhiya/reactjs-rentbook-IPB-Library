const initiaState = {
    bookList: [],
    bookRent: [],
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
        case 'POST_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'POST_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };

        case 'POST_BOOK_FULFILLED':
            state.bookList.push(action.payload.data.result)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: state.bookList
            };
        
        case 'UPDATE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'UPDATE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };

        case 'UPDATE_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };

        case 'DELETE_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'DELETE_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };

        case 'DELETE_BOOK_FULFILLED':
            const dataAfter = state.bookList.filter(book => book.idbooks != action.payload.data.result.idbooks);
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: dataAfter,
            };

        case 'RENT_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };

        case 'RENT_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };

        case 'RENT_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            };

        case 'RETURN_BOOK_PENDING':
            return {
                ...state,
                isLoading: false,
                isFulfilled: false,
                isRejected: false,
            };

        case 'RETURN_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };

        case 'RETURN_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }

        case 'GET_RENT_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            }

        case 'GET_RENT_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }

        case 'GET_RENT_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookRent: action.payload.data.result
            }

        default:
            return state;
    }
}

export default book;