
import {
  SMART_CHAT_OPEN,
	SMART_CHAT_CLOSE,
  SMART_CHAT_LIST_OPEN,
  SMART_CHAT_LIST_MINIMIZE

} from 'state/action-types'

export const smartChatOpen = () => dispatch => {
  dispatch({
    type: SMART_CHAT_OPEN
  })
}

export const smartChatClose = () => dispatch => {
  dispatch({
    type: SMART_CHAT_CLOSE
  })
}
export const smartChatListOpen = () => dispatch => {
  dispatch({
    type: SMART_CHAT_LIST_OPEN
  })
}

export const smartChatListMinimize = () => dispatch => {
  dispatch({
    type: SMART_CHAT_LIST_MINIMIZE
  })
}
