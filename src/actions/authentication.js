import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_ALL_USERS, GET_ERRORS_ALLURS } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
	console.log(user);
	axios.post('api/auth/register', user)
	.then(res => history.push('/login'))
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err
		});
	});
}

export const loginUser = user => dispatch => {
	axios.post('/api/auth/login', user)
	.then(res => {
		console.log(res);
		const { token } = res.data;
		localStorage.setItem('jwtToken', token);
		console.log(token);
		setAuthToken(token);
		const decoded = jwt_decode(token);
		console.log(decoded);
		dispatch(setCurrentUser(decoded));
	})
	.catch(err => {
		console.log("Error: ", err);
		dispatch({
			type: GET_ERRORS,
			payload: err
		});
	});
}



export const getCurrentUser = () => dispatch => {
	axios.get('/api/auth/user')
	.then(res => {
		console.log(res);
		dispatch({
			type: GET_ALL_USERS,
			payload: res.data
		});
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS_ALLURS,
			payload: err
		});
	});
}

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

export const logoutUser = history => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
	history.push('/login');
}
