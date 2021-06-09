import { combineReducers } from 'redux'
import { claimUser } from './claimUser/User.reducer'
import { Breadcrumb } from './breadcrumbs/breadcrumb.reducer'
export default combineReducers({
    claimUser: claimUser,
    breadcrumb: Breadcrumb
})
