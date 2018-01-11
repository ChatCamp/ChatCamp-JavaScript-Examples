import {Map} from 'immutable'
import {
	LOGIN_REQUEST,
	LOGIN_REQUEST_FAILURE,
	LOGIN_REQUEST_SUCCESS
} from 'state/action-types'


export const initialState = Map({
  isLoggedIn: false,
  isRequesting: false,
  appId: null,
	loginFail: false,
  email: null,
  password: null
})

export function login (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isRequesting', true)
    case LOGIN_REQUEST_SUCCESS:
      return state.set('isRequesting', false)
    case LOGIN_REQUEST_FAILURE:
      return state.set('isRequesting', false).set('loginFail', true)
    default:
      return state
  }
}
