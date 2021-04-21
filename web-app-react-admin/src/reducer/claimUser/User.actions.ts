import * as types from './User.constants';

export const setUser = (payload) => ({
    type: types.SET_CLAIM_USER,
    payload
})

export const getUser = () => ({
    type: types.GET_CLAIM_USER,
})
