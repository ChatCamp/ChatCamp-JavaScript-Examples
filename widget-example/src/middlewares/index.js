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
  GROUP_CHANNELS_OPEN,
  GROUP_CHANNELS_MINIMIZE,
  GROUP_CHANNELS_CREATE
} from 'state/action-types'

import Utility from 'utility/Utility'

export const iFlyMiddleWare = store => {

  let userId = Utility.getUrlQueryParams(window.location.href)['userId'][0]

  // to expose startchat to other platforms
  let startChat = (groupChannelId) => {
    _startGroupChannel(groupChannelId)
    store.dispatch({
      type: GROUP_CHANNELS_OPEN,
      groupChannelsId: groupChannelId
    })
  }
  window.cc.startChat = startChat

  // client.customConnect(userId, "localhost", "9080", function(e, user) {
  client.connect(userId, function(e, user) {
    if(e==null) {
      // client.updateUserDisplayName(userId, "ws://192.168.2.145", "9080", function(e, user) {

        let groupChannelId1 = Utility.getUrlQueryParams(window.location.href)['groupChannelId'][0]
        var allGroupChannels = []
        allGroupChannels[0] = groupChannelId1
        // allGroupChannels[1] = "5a7b1aeacf725e6c5c8e1fa7"
        let storeChannels = store.getState().groupChannelsState.keySeq().toArray()
        allGroupChannels = allGroupChannels.concat(storeChannels)

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
        _startGroupChannel(groupChannelId)
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

  let _startGroupChannel = (groupChannelId) => {
    client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
      if(error==null) {

        store.dispatch({
          type: GROUP_CHANNELS_GET_SUCCESS,
          groupChannel: groupChannel
        });
        let state = store.getState().groupChannelsState.getIn([groupChannel.id, "state"])
        if(state === "OPEN"){
          store.dispatch({
            type: GROUP_CHANNELS_OPEN,
            groupChannelsId: groupChannel.id
          })
        }
        else if(state === "MINIMIZE"){
          store.dispatch({
            type: GROUP_CHANNELS_MINIMIZE,
            groupChannelsId: groupChannel.id
          })
        }
        else if( state === undefined){
          store.dispatch({
            type: GROUP_CHANNELS_CREATE,
            groupChannelsId: groupChannel.id
          })
        }


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


  return next => action => {
    next(action);
  }
}
