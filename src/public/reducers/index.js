import { combineReducers } from 'redux';

import book from './books';
import genres from './genres';

const rootReducer = combineReducers ({
    book,
    genres,
});

export default rootReducer;