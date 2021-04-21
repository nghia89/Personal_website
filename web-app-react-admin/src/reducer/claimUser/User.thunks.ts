
import * as actions from './User.actions'
import { Profile } from '@/models/Profile'


export const setClaimUser = (payload: Profile) => dispatch => {
  if (payload) {
    return dispatch(actions.setUser(payload))
  }
}

export const getClaimUser = () => dispatch => {
  return dispatch(actions.getUser())
}
