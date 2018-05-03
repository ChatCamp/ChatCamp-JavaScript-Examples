import {
  OPEN_CHANNELS_GET_HISTORY_SUCCESS
} from 'state/action-types'
import client from 'Client'

export const userMessage = (openChannelId, message) => dispatch => {
  client.OpenChannel.get(openChannelId, function(error, openChannel) {
    // groupChannel.stopTyping()
    openChannel.sendMessage(message, function(error, message) {

    })
  })
}

export const getHistory = (openChannelId, messageId) => dispatch => {
  client.OpenChannel.get(openChannelId, function(error, openChannel) {
    let previousMessageListQuery = openChannel.createPreviousMessageListQuery();
    previousMessageListQuery.load(20, messageId, function(previousMessageListQueryError, messages) {
      dispatch({
        type: OPEN_CHANNELS_GET_HISTORY_SUCCESS,
        openChannel: openChannel,
        messages: messages
      });
    })
  })
}
