import client from 'Client'
import {
  USER_MESSAGE,
  ROOM_MESSAGE
} from 'state/action-types'


export const userMessage = (message) => dispatch => {
  console.log("dispatch", message)
  dispatch({
    type: USER_MESSAGE,
    message: message
  })
}

export const roomMessage = (message) => dispatch => {
  dispatch({
    type: ROOM_MESSAGE,
    message: message
  })
}

export const userMessageWrapper = (threadId, message) =>  {
  return (dispatch, getState) => {
    let state = getState();
    let messageObj = {};
    console.log(state)
    messageObj.name = state.user.get('user_name')
    messageObj.text = message
    messageObj.messageId = Math.random()
    messageObj.threadId = threadId
    messageObj.time = new Date().getHours() + ":" + new Date().getMinutes()

    client.transportManager.send({
      t: 'message.dm',
      d: {
        uid1: state.user.get('id'),
        uid2: threadId,
        text: message,
        sub_type: 'message_created'
      }
    })

    dispatch(userMessage(messageObj));
  }
}
