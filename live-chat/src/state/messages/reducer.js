import {Map} from 'immutable'
import {
  USER_MESSAGE,
  ROOM_MESSAGE
} from 'state/action-types'


export const initialState = Map({
  messages: null
})

export function messages (state = initialState, action) {
  switch (action.type) {
    case ROOM_MESSAGE:
      return state.setIn([action.message.threadId,"messages"], action.message)
    case USER_MESSAGE:
    console.log("message reducer", action)
      return state.setIn([action.message.threadId, action.message.messageId], action.message)
    default:
      return state
  }
}
