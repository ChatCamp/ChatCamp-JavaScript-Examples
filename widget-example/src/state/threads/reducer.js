import {Map} from 'immutable'
import {
  THREAD_CREATE,
  THREAD_CLOSE,
  THREAD_OPEN,
  THREAD_MINIMIZE
} from 'state/action-types'


export const initialState = Map({
  threadState: null,
})

export function threads (state = initialState, action) {
  switch (action.type) {
    case THREAD_CREATE:
      return state.setIn([action.threadId,"threadState"], "OPEN")
    case THREAD_CLOSE:
      return state.setIn([action.threadId,"threadState"], "CLOSE")
    case THREAD_OPEN:
      return state.setIn([action.threadId,"threadState"], "OPEN")
    case THREAD_MINIMIZE:
      return state.setIn([action.threadId,"threadState"], "MINIMIZE")
    default:
      return state
  }
}
