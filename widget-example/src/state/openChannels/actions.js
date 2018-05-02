import client from 'Client'

export const userMessage = (openChannelId, message) => dispatch => {
  client.OpenChannel.get(openChannelId, function(error, openChannel) {
    // groupChannel.stopTyping()
    openChannel.sendMessage(message, function(error, message) {

    })
  })
}
