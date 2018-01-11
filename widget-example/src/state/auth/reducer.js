import {Map} from 'immutable'
import {
  APP_SET,
	LOGIN_REQUEST,
	LOGIN_REQUEST_FAILURE,
	LOGIN_REQUEST_SUCCESS
} from 'state/action-types'
import {getAppIdFromURL} from 'api/utils'

export const initialState = Map({
  isLoggedIn: false,
  appId: null,
  apiKey: null
})

export function auth (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      console.log("login request success:", action)
      // return state.set('appId', action.result.user.app_id).set('apiKey', action.result.token.value).set('isLoggedIn', true)
      return state.set('isLoggedIn', true)
    // case APP_SET:
    //   return state.set('appId', action.appId)
    default:
      return state
  }
}
