import {Map} from 'immutable'
import {
	CHAT_CONNECT_SUCCESS
} from 'state/action-types'


export const initialState = Map({
})

export function user (state = initialState, action) {
  switch (action.type) {
    case CHAT_CONNECT_SUCCESS:
      return Map({
        id: action.user.id,
        displayName: action.user.displayName,
        avatarUrl: action.user.avatarUrl,
        profileUrl: action.user.profileUrl,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        phoneNumber: action.user.phoneNumber,

      })
    default:
      return state
  }
}
