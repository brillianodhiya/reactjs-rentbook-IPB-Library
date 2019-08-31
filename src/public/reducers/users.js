const initialState = {
    userData: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REGISTER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'USER_REGISTER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'USER_REGISTER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userData: action.payload.data
            };
        case 'USER_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'USER_LOGIN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'USER_LOGIN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userData: action.payload.data
            }
        default:
            return state
    }
}

export default user;