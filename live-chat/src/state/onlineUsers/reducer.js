import Immutable from 'immutable'
import {
	ONLINE_USERS_INFO_SUCCESS,
  ONLINE_USERS_JOIN_SUCCESS,
  ONLINE_USERS_LEAVE_SUCCESS
} from 'state/action-types'


export const initialState = Immutable.fromJS({
  'global': []
})

export function onlineUsers (state = initialState, action) {
  switch (action.type) {
    case ONLINE_USERS_INFO_SUCCESS:
      return Immutable.fromJS({
        'global': action.onlineUsers
      })
    default:
      return state
  }
}
