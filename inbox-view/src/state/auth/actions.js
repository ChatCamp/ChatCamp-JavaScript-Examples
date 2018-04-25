import {
	APP_SET
} from 'state/action-types'

export const appSet = (appId) => dispatch => {
  dispatch({
    type: APP_SET,
    appId
  })
}
