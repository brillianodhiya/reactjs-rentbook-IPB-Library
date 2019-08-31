import { combineReducers } from 'redux';

import book from './books';
import genres from './genres';
import user from './users';

const rootReducer = combineReducers ({
    book,
    genres,
    user,
});

export default rootReducer;