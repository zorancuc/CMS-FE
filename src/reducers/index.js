import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import addrReducer from './addrReducer';
import myWallet from './myWallet';

export default combineReducers({
	errors: errorReducer,
	auth: authReducer,
	addr: addrReducer,
	wallet: myWallet
});