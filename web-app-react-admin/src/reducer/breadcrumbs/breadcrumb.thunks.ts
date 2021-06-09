
import * as actions from './breadcrumb.actions'
import { IBreadcrumbs } from '@/models/commonM'


export const setBreadcrumb = (payload: IBreadcrumbs[]) => dispatch => {
  if (payload) {
    return dispatch(actions.setBreadcrumb(payload))
  }
}
