import {Map} from 'immutable'
import {
	SMART_CHAT_OPEN,
  SMART_CHAT_CLOSE,
  SMART_CHAT_LIST_OPEN,
  SMART_CHAT_LIST_MINIMIZE
} from 'state/action-types'


export const initialState = Map({
  isSmartChatOpen: true,
  isSmartChatListOpen: true
})

export function smartChat (state = initialState, action) {
  switch (action.type) {
    case SMART_CHAT_OPEN:
      return state.set('isSmartChatOpen', true)
    case SMART_CHAT_CLOSE:
      return state.set('isSmartChatOpen', false)
    case SMART_CHAT_LIST_OPEN:
      return state.set('isSmartChatListOpen', true)
    case SMART_CHAT_LIST_MINIMIZE:
      return state.set('isSmartChatListOpen', false)
    default:
      return state
  }
}
