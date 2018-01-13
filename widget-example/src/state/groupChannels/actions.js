import {
	GROUP_CHANNELS_GET_SUCCESS,
  GROUP_CHANNELS_GET_HISTORY_SUCCESS
} from 'state/action-types'

import client from 'Client'

export const userMessage = (groupChannelId, message) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    groupChannel.sendMessage(message, function(error, message) {
      console.log(error, message)
    })
  })
}

export const getHistory = (groupChannelId, messageId) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    let previousMessageListQuery = groupChannel.createPreviousMessageListQuery();
    previousMessageListQuery.load(20, messageId, function(previousMessageListQueryError, messages) {
      dispatch({
        type: GROUP_CHANNELS_GET_HISTORY_SUCCESS,
        groupChannel: groupChannel,
        messages: messages
      });
    })
  })
}
