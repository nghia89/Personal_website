import { SET_CLAIM_USER } from './User.constants'
import produce from 'immer'

const initialState = {
    claimUser: null,
    isAuthentication: false
}

export const claimUser = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_CLAIM_USER:
                draft.claimUser = action.payload
                draft.isAuthentication = true
                break
            default:
                return state
        }
    })
