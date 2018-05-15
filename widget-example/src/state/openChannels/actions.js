import {
  OPEN_CHANNELS_GET_HISTORY_SUCCESS,
  OPEN_CHANNELS_ATTACHMENT_PROGRESS,
  OPEN_CHANNELS_ATTACHMENT_RESET
} from 'state/action-types'
import client from 'Client'

export const userMessage = (openChannelId, message) => dispatch => {
  client.OpenChannel.get(openChannelId, function(error, openChannel) {
    // groupChannel.stopTyping()
    openChannel.sendMessage(message, function(error, message) {

    })
  })
}

export const attachmentMessage = (openChannelId, attachment) => dispatch => {
  client.OpenChannel.get(openChannelId, function(error, openChannel) {
    openChannel.sendAttachment(attachment, function(bSent, bTotal) {
      let progress = Math.ceil((bSent * 100) / bTotal)
      dispatch({
        type: OPEN_CHANNELS_ATTACHMENT_PROGRESS,
        openChannelId: openChannelId,
        progress: progress
      });
    },function(error, message) {
      dispatch({
        type: OPEN_CHANNELS_ATTACHMENT_RESET,
        openChannelId: openChannelId,
      });
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
