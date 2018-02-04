import {
  GROUP_CHANNELS_ATTACHMENT_PROGRESS,
  GROUP_CHANNELS_ATTACHMENT_RESET,
	GROUP_CHANNELS_GET_SUCCESS,
  GROUP_CHANNELS_GET_HISTORY_SUCCESS,
  GROUP_CHANNELS_INVITE_ACCEPTED_SUCCESS
} from 'state/action-types'

import client from 'Client'

export const getChannel = (groupChannelId) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    if(!error) {
      dispatch({
        type: GROUP_CHANNELS_GET_SUCCESS,
        groupChannel: groupChannel
      });
    }
  });
}

export const userMessage = (groupChannelId, message) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    groupChannel.stopTyping()
    groupChannel.sendMessage(message, function(error, message) {

    })
  })
}

export const actionMessage = (groupChannelId, message, product) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    // groupChannel.stopTyping()
    groupChannel.sendMessage(message, {product: JSON.stringify(product)}, "action_link", function(error, message) {

    })
  })
}

export const attachmentMessage = (groupChannelId, attachment) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    groupChannel.sendAttachment(attachment, function(bSent, bTotal) {
      let progress = Math.ceil((bSent * 100) / bTotal)
      dispatch({
        type: GROUP_CHANNELS_ATTACHMENT_PROGRESS,
        groupChannelId: groupChannelId,
        progress: progress
      });
    },function(error, message) {
      dispatch({
        type: GROUP_CHANNELS_ATTACHMENT_RESET,
        groupChannelId: groupChannelId,
      });
    })
  })
}

export const startTyping = (groupChannelId) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    groupChannel.startTyping()
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

export const acceptInvitation = (groupChannelId) => dispatch => {
  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    groupChannel.acceptInvitation(function(error) {
      if(!error) {
        window.location.reload()
        client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
          dispatch({
            type: GROUP_CHANNELS_GET_SUCCESS,
            groupChannel: groupChannel
          });
          dispatch(getHistory(groupChannelId, null))
        });
      }
    })
  })
}
