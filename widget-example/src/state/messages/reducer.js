import {Map} from 'immutable'
import * as Debug from 'debug';

import {
  USER_MESSAGE,
  ROOM_MESSAGE
} from 'state/action-types'

const debug = Debug('chatcamp:state:messages')

export const initialState = Map({
  messages: null
})

export function messages (state = initialState, action) {
  switch (action.type) {
    case ROOM_MESSAGE:
      return state.setIn([action.message.threadId,"messages"], action.message)
    case USER_MESSAGE:
    debug("message reducer", action)
      return state.setIn([action.message.threadId, action.message.messageId], action.message)
    default:
      return state
  }
}
