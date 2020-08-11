import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
	GET_ERRORS,
	SET_BTC_BALANCE,
	SET_ETH_BALANCE,
	SET_BTC_ADDRESS,
	SET_ETH_ADDRESS
	}
	from './types';

export const withdrawBTC = (info) => dispatch => {
	axios.post('api/btc/v1/account/transfer', info)
	.then(res => {
		console.log(res);
		if (res.data.status === 'success') {
			console.log(res.data.tx_hash);
		}
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err
		});
	})
}

export const withdrawETH = (info) => dispatch => {
	axios.post('api/eth/v1/account/transfer', info)
		.then(res => {
			console.log(res);
			console.log(res.data.tx_hash);
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			});
		})
}

export const getBalance = () => dispatch => {

	axios.post('api/btc/v1/account/balance')
	.then(res => {
		console.log(res);
		const btcBalance = res.data.balance;
		const btcAddress = res.data.address;
        console.log("BTC balance:", btcBalance);
        dispatch({
			type: SET_BTC_BALANCE,
			payload: btcBalance
		});

		dispatch({
			type: SET_BTC_ADDRESS,
			payload: btcAddress
		});
    })
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err
		});
	});

	axios.post('api/eth/v1/account/balance')
		.then(res => {
			console.log(res);
			const ethBalance = res.data.balance;
			const ethAddress = res.data.address;
			console.log("ETH Balance:", ethBalance);
			dispatch({
				type: SET_ETH_BALANCE,
				payload: ethBalance
			});

			dispatch({
				type: SET_ETH_ADDRESS,
				payload: ethAddress
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			});
		});
}
