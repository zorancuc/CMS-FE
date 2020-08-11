import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    GET_ERRORS
} from './types';

export const createProposal = (proposal) => dispatch => {

    axios.post('api/proposal/v1/newProposal', proposal)
        .then(res => {
            const {
                success,
                response
            } = res.data;
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
