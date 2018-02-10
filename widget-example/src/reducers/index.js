import {combineReducers} from 'redux'

import {auth} from 'state/auth/reducer'

import {app} from 'state/app/reducer'
import {groupChannels} from 'state/groupChannels/reducer'



import {login} from 'state/login/reducer'

import {messages} from 'state/messages/reducer'

import {onlineUsers} from 'state/onlineUsers/reducer'


import {smartChat} from 'state/smartChat/reducer'
import {groupChannelsState} from 'state/groupChannelsState/reducer'
import {user} from 'state/user/reducer'

export const rootReducer = combineReducers({
  auth,
  app,
  groupChannels,
  login,
  messages,
  onlineUsers,
  smartChat,
  groupChannelsState,
  user
})
