import { combineReducers } from 'redux';
import reducerlogin from './reducerlogin';
import reducerplanets from './reducerplanets';
import reducersetuser from './reducer_setuser';

const rootReducer = combineReducers({
 loggedin:reducerlogin,
 planets:reducerplanets,
 loggedinuser:reducersetuser
});

export default rootReducer;
