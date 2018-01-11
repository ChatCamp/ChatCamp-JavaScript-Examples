import {
	GROUP_CHANNELS_GET_SUCCESS
} from 'state/action-types'

import client from 'Client'

export const userMessage = (groupChannelId, message) => dispatch => {

  client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
    groupChannel.sendMessage(message, function(error, message) {
      console.log(error, message)
    })
  })


}
