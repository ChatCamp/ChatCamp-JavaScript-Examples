import client from 'Client'
import {
  CHAT_CONNECT_SUCCESS,
  GROUP_CHANNELS_GET_ERROR,
  GROUP_CHANNELS_GET_SUCCESS,
  GROUP_CHANNELS_GET_HISTORY_SUCCESS,
  GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS,
  GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED,
  GROUP_CHANNELS_INVALID_PARTICIPANT,
  SET_SMART_CHAT_TYPE,
  GROUP_CHANNELS_CREATE
} from 'state/action-types'

import Utility from 'utility/Utility'

export const iFlyMiddleWare = store => {

  // // Check if we have cookie set
  // if(client.isStatePersist()) {
  //   store.dispatch({
  //     type: LOGIN_REQUEST_SUCCESS,
  //     result: {}
  //   });
  //
  //   client.connect();
  //
  // }

  let userId = Utility.getUrlQueryParams(window.location.href)['userId'][0]

  client.customConnect(userId, "localhost", "9080", function(e, user) {
  // client.connect(userId, function(e, user) {
    if(e==null) {
      // client.updateUserDisplayName(userId, "ws://192.168.2.145", "9080", function(e, user) {

        let groupChannelId1 = Utility.getUrlQueryParams(window.location.href)['groupChannelId'][0]
        var allGroupChannels = []
        allGroupChannels[0] = groupChannelId1
        // allGroupChannels[1] = "5a7b1aeacf725e6c5c8e1fa7"
        store.dispatch({
          type: CHAT_CONNECT_SUCCESS,
          user: user
        });
        store.dispatch({
          type: SET_SMART_CHAT_TYPE,
          data: {type: "embed"} //popup or embed
        });

      for(let i in allGroupChannels){
        let groupChannelId = allGroupChannels[i]
        client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
          if(error==null) {

            store.dispatch({
              type: GROUP_CHANNELS_GET_SUCCESS,
              groupChannel: groupChannel
            });

            store.dispatch({
              type: GROUP_CHANNELS_CREATE,
              groupChannelsId: groupChannel.id
            })

            // Check if the current user is participants of this groupChannelLeave
            let isCurrentUserAcceptedParticipant = false;
            let isCurrentUserParticipant = false;
            console.log(client.user.id)
            for (let i in groupChannel.participants) {
              let participant = groupChannel.participants[i]
              console.log(participant.id, client.user.id)
              if(participant.id === client.user.id) {
                isCurrentUserParticipant = true
                if(participant.status === "accepted") {
                  isCurrentUserAcceptedParticipant = true
                }
              }
            }

            if(isCurrentUserParticipant && isCurrentUserAcceptedParticipant) {
              let previousMessageListQuery = groupChannel.createPreviousMessageListQuery();
              previousMessageListQuery.load(20, null, function(previousMessageListQueryError, messages) {
                store.dispatch({
                  type: GROUP_CHANNELS_GET_HISTORY_SUCCESS,
                  groupChannel: groupChannel,
                  messages: messages
                });
              })

              setInterval(function(){
                groupChannel.sync(function(error,groupChannel){
                  if(error == null){
                    store.dispatch({
                      type: GROUP_CHANNELS_GET_SUCCESS,
                      groupChannel: groupChannel
                    });
                  }
                })
              }, 30000)
            }
            else if(isCurrentUserParticipant && !isCurrentUserAcceptedParticipant){
              store.dispatch({
                type: GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED,
                groupChannel: groupChannel
              });
            }
            else {
              store.dispatch({
                type: GROUP_CHANNELS_INVALID_PARTICIPANT,
                groupChannel: groupChannel
              });
            }
          }
          else {
            store.dispatch({
              type: GROUP_CHANNELS_GET_ERROR,
              error: error,
              groupChannelId: groupChannelId
            });
          }
        });
      }

        let channelListener = new client.ChannelListener();
        channelListener.onGroupChannelMessageReceived = function(groupChannel, message) {
          console.log("Listener", groupChannel, message)
          store.dispatch({
            type: GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS,
            groupChannel: groupChannel,
            message: message
          });
        }

        channelListener.onGroupChannelTypingStatusChanged = function(groupChannel) {
          console.log("Typing Status", groupChannel, groupChannel.getTypingParticipants())
          store.dispatch({
            type: GROUP_CHANNELS_GET_SUCCESS,
            groupChannel: groupChannel
          });
        }

        channelListener.onGroupChannelReadStatusUpdated = function(groupChannel) {
          console.log("Read Status Update", groupChannel)
          store.dispatch({
            type: GROUP_CHANNELS_GET_SUCCESS,
            groupChannel: groupChannel
          });
        }

        client.addChannelListener("t", channelListener)
      // });
    }
    else {

    }
  });

  // iFlyChat Web SDK Events integration

  // // Arrange all events alphabetically. Easier to locate.
  //
  // client.on('authenticate.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: LOGIN_REQUEST_SUCCESS,
  //     result: data
  //   });
  //
  //   // client.connect()
  //
  // })

  // client.on('authenticate.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: LOGIN_REQUEST_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('app.create.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: APP_CREATE_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('app.create.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: APP_CREATE_FAILURE,
  //     result: data
  //   });
  // })
  //
  // client.on('app.valid.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: APP_VALID_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('app.valid.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: APP_VALID_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('email.confirm.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: EMAIL_CONFIRMATION_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('email.confirm.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: EMAIL_CONFIRMATION_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('message.dm', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   // store.dispatch({
  //   //   type: USER_MESSAGE,
  //   //   message: {
  //   //     messageId: data.message.id,
  //   //     name: data.message.sender.user_name,
  //   //     text: data.message.text
  //   //   }
  //   // })
  // })
  //
  // // client.on('onlineUsers.info', (data) => {
  // //
  // //   console.log("WS Middleware triggered:", data);
  // //
  // //   if(data.ok) {
  // //     store.dispatch({
  // //       type: ONLINE_USERS_INFO_SUCCESS,
  // //       onlineUsers: data.list
  // //     })
  // //   }
  // // })
  //
  // client.on('password.recover.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: PASSWORD_FORGOT_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('password.recover.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: PASSWORD_FORGOT_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('password.reset.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: PASSWORD_RESET_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('password.reset.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: PASSWORD_RESET_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('password.resetAccess.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: PASSWORD_RESET_ACCESS_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('password.resetAccess.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: PASSWORD_RESET_ACCESS_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('register.success', (data) => {
  //
  //   console.log("WS Middleware triggered:", data);
  //
  //   store.dispatch({
  //     type: REGISTER_REQUEST_SUCCESS,
  //     result: data
  //   });
  //
  //
  // })
  //
  // client.on('register.error', (data) => {
  //   console.log("WS Middleware triggered:", data)
  //   store.dispatch({
  //     type: REGISTER_REQUEST_FAILURE,
  //     result: data
  //   })
  // })
  //
  // client.on('users.auth', (data) => {
  //   if(data.ok) {
  //     store.dispatch({
  //       type: USER_AUTH_SUCCESS,
  //       user: data.user
  //     })
  //   }
  // })


  return next => action => {
    next(action);
  }
}
