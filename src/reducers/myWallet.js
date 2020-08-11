import { SET_BTC_BALANCE, SET_ETH_BALANCE, SET_BTC_ADDRESS, SET_ETH_ADDRESS } from '../actions/types';

const initialState = {
	btcBalance: 0,
	ethBalance: 0,
	btcAddress: "",
	ethAddress: ""
}

export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_BTC_BALANCE:
			return {
				...state,
				btcBalance: action.payload
            };
        case SET_ETH_BALANCE:
            return {
                ...state,
                ethBalance: action.payload
			};
		case SET_BTC_ADDRESS:
			return {
				...state,
				btcAddress: action.payload
			};
		case SET_ETH_ADDRESS:
			return {
				...state,
				ethAddress: action.payload
			};
		default:
			return state;
	}
}
