import { SET_BREADCRUMB } from './breadcrumb.constants'
import produce from 'immer'

const initialState = {
    breadcrumbs: null,
}

export const Breadcrumb = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_BREADCRUMB:
                draft.breadcrumbs = action.payload
                break
            default:
                return state
        }
    })
