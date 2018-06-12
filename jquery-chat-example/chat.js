/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}





$(document).ready(function(){

  var sendMessage = function() {
    var text = $('#message-to-send').val()
    cc.OpenChannel.get(openChannelId, function(error, openChannel) {
      openChannel.sendMessage(text, function(error, message) {
        console.log("sent", message)
      })
    })
    $('#message-to-send').val('')
  }

  var renderMessage = function(message) {
    var o = ''
    if(message.user.id === userId) {
      o += '<li class="clearfix">'
      o += '<div class="message-data align-right">'
      o += '<span class="message-data-time" >' + timeago().format(message.insertedAt*1000) + '</span> &nbsp; &nbsp;'
      o += '<span class="message-data-name" >' + message.user.displayName + '</span> <i class="fa fa-circle me"></i>'
      o += '</div>'
      o += '<div class="message my-message float-right">'
      o += message.text
      o += '</div>'
      o += '</li>'    
    }
    else {
      o += '<li>'
      o += '<div class="message-data">'
      o += '<span class="message-data-name"><i class="fa fa-circle online"></i> ' + message.user.displayName + '</span>'
      o += '<span class="message-data-time">' + timeago().format(message.insertedAt*1000) + '</span>'
      o += '</div>'
      o += '<div class="message room-message">'
      o += message.text
      o += '</div>'
      o += '</li>'
    }
    return o
  }

  var scrollToBottom = function() {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
  }

  // Initialize ChatCamp
  var cc = new ChatCamp({
    appId: "6346990561630613504"
  })

  // Create random user ID and name
  var userId = String(getRandomInt(300, 400))
  var userDisplayName = 'User ' + userId
  var openChannelId = "5a5ef06b48bdc63ad6760fe5"

  // Connect to ChatCamp
  cc.connect(userId, function(errorConnect, userConnect) {
    if(errorConnect === null){
      // Set display name of the user
      cc.updateUserDisplayName(userDisplayName, function(error, user) {
        console.log("user")
        // Get Open Channel
        cc.OpenChannel.get(openChannelId, function(error, openChannel) {
        	if(!error){
          	// Join Open Channel
            openChannel.join(function(error) {
              $('.chat-room-name').html(openChannel.name)
              $('.chat-participants').html(openChannel.participantsCount + ' Participants')
              // Get history of Open Channel
              let previousMessageListQuery = openChannel.createPreviousMessageListQuery();
              previousMessageListQuery.load(50, null, function(previousMessageListQueryError, messages) {
                if(!previousMessageListQueryError){
                  console.log("Previous messages are successfully loaded")
                  messages.forEach(message => {
                    $(".chat-history > ul").prepend(renderMessage(message))
                    scrollToBottom()
                  })
                }
              })
            })
          }
        })
      })
    }
  })
  
  var channelListener = new cc.ChannelListener();

  channelListener.onOpenChannelMessageReceived = function(openChannel, message) {
	   console.log("New Message received in open channel", openChannel, message)
     $(".chat-history > ul").append(renderMessage(message))
     scrollToBottom()
  }

  cc.addChannelListener("1", channelListener)

  $('#message-to-send').keypress(function(e) {
    if(e.which == 13) {
        sendMessage()
    }
  });

  $('button').on('click', function() {
    sendMessage()
  })

  $('#message-to-send').attr('placeholder', 'You are logged in as ' + userDisplayName + '. Type your message here and press enter to send.')

})
