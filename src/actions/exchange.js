import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS } from './types';

export const doExchange = (exchangeData) => dispatch => {
	
	axios.post('api/bridge/v1/exchange/e2ptoken', exchangeData)
	.then(res => {
		const { success, response } = res.data;
		console.log(success);
		console.log(response);
    })
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err
		});
	});
}
