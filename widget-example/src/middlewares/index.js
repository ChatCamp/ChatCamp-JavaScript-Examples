import client from 'Client'
import {
  CHAT_CONNECT_SUCCESS,
  GROUP_CHANNELS_GET_SUCCESS,
  GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS
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

  client.connect(userId, function(e, user) {
    if(e==null) {
      // client.updateUserDisplayName(userId, "ws://192.168.2.145", "9080", function(e, user) {

        let groupChannelId = Utility.getUrlQueryParams(window.location.href)['groupChannelId'][0]

        store.dispatch({
          type: CHAT_CONNECT_SUCCESS,
          user: user
        });

        client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
          store.dispatch({
            type: GROUP_CHANNELS_GET_SUCCESS,
            groupChannel: groupChannel
          });
        });

        let channelListener = new client.ChannelListener();
        channelListener.onGroupChannelMessageReceived = function(groupChannel, message) {
          console.log("Listener", groupChannel, message)
          store.dispatch({
            type: GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS,
            groupChannel: groupChannel,
            message: message
          });
        }

        client.addChannelListener("t", channelListener)
      // });
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
