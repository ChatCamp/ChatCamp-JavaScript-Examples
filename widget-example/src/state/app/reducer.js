import {Map} from 'immutable'
import {
	APP_CREATE,
	APP_CREATE_FAILURE,
	APP_CREATE_SUCCESS,
  APP_VALID,
  APP_VALID_FAILURE,
  APP_VALID_SUCCESS,
  USER_AUTH_SUCCESS
} from 'state/action-types'


export const initialState = Map({
  appId: null,
  email: null,
  isAppValid: null,
  isRequesting: false,
  isRequestingAppValid: false,
  username: null,
  password: null,
  appInitiated: false,
	appFailure: false,
  verifyPassword: null
})

export function app (state = initialState, action) {
  switch (action.type) {
    case USER_AUTH_SUCCESS:
      return state.set('appId', action.user.app_id)
    case APP_CREATE:
      return state.set('isRequesting', true)
    case APP_CREATE_SUCCESS:
      const newState = state.set('isRequesting', false)
      const finalState = newState.set('appInitiated', true)
      return finalState
    case APP_CREATE_FAILURE:
			const newStateCF = state.set('isRequesting', false)
      const finalStateCF = newStateCF.set('appFailure', true)
      return finalStateCF
    case APP_VALID:
      return state.set('isRequestingAppValid', true)
    case APP_VALID_SUCCESS:
      const newStateC = state.set('isRequestingAppValid', false)
      const validStateC = newStateC.set('isAppValid', true)
      return validStateC
    case APP_VALID_FAILURE:
      const newStateF = state.set('isRequestingAppValid', false)
      const validStateF = newStateF.set('isAppValid', false)
      return validStateF
    default:
      return state
  }
}
