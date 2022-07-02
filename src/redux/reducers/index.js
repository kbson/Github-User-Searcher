import userReducer from './user';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
})

const rootReducer = (state, action) => {
    return allReducers(state, action)
}

export default rootReducer;