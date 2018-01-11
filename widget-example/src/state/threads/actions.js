
import {
  THREAD_CREATE,
  THREAD_CLOSE,
  THREAD_OPEN,
  THREAD_MINIMIZE
} from 'state/action-types'


export const threadCreate = (threadId) => dispatch => {
  dispatch({
    type: THREAD_CREATE,
    threadId: threadId
  })
}

export const threadOpen = (threadId) => dispatch => {
  dispatch({
    type: THREAD_OPEN,
    threadId: threadId
  })
}

export const threadClose = (threadId) => dispatch => {
  dispatch({
    type: THREAD_CLOSE,
    threadId: threadId
  })
}

export const threadMinimize = (threadId) => dispatch => {
  dispatch({
    type: THREAD_MINIMIZE,
    threadId: threadId
  })
}
