import { combineReducers } from 'redux'
import { claimUser } from './claimUser/User.reducer'

export default combineReducers({
    claimUser: claimUser,
})
