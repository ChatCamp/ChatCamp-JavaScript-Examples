
import {
  GROUP_CHANNELS_CREATE,
  GROUP_CHANNELS_CLOSE,
  GROUP_CHANNELS_OPEN,
  GROUP_CHANNELS_MINIMIZE,
  GROUP_CHANNELS_HIDE,
  OPEN_CHANNELS_CREATE,
  OPEN_CHANNELS_CLOSE,
  OPEN_CHANNELS_OPEN,
  OPEN_CHANNELS_MINIMIZE,
  OPEN_CHANNELS_HIDE,
  OPEN_CHANNELS_REMOVE_HISTORY
} from 'state/action-types'

import client from 'Client'


export const groupChannelsCreate = (groupChannelsId) => dispatch => {
  dispatch({
    type: GROUP_CHANNELS_CREATE,
    groupChannelsId: groupChannelsId
  })
}

export const groupChannelsOpen = (groupChannelsId) => dispatch => {
  dispatch({
    type: GROUP_CHANNELS_OPEN,
    groupChannelsId: groupChannelsId
  })
}

export const groupChannelsClose = (groupChannelsId) => dispatch => {
  dispatch({
    type: GROUP_CHANNELS_CLOSE,
    groupChannelsId: groupChannelsId
  })
}

export const groupChannelsMinimize = (groupChannelsId) => dispatch => {
  dispatch({
    type: GROUP_CHANNELS_MINIMIZE,
    groupChannelsId: groupChannelsId
  })
}

export const groupChannelsHide = (groupChannelsId) => dispatch => {
  dispatch({
    type: GROUP_CHANNELS_HIDE,
    groupChannelsId: groupChannelsId
  })
}
export const openChannelsCreate = (openChannelsId) => dispatch => {
  client.OpenChannel.get(openChannelsId, function(error, openChannel) {
    openChannel.join(function(error) {
      dispatch({
        type: OPEN_CHANNELS_CREATE,
        openChannelsId: openChannelsId
      })
    })
  })

}

export const openChannelsOpen = (openChannelsId) => dispatch => {
  client.OpenChannel.get(openChannelsId, function(error, openChannel) {
    openChannel.join(function(error) {
      dispatch({
        type: OPEN_CHANNELS_OPEN,
        openChannelsId: openChannelsId
      })
    })
  })

}

export const openChannelsClose = (openChannelsId) => dispatch => {
  dispatch({
    type: OPEN_CHANNELS_CLOSE,
    openChannelsId: openChannelsId
  })
}

export const openChannelsMinimize = (openChannelsId) => dispatch => {
  dispatch({
    type: OPEN_CHANNELS_MINIMIZE,
    openChannelsId: openChannelsId
  })
}

export const openChannelsHide = (openChannelsId) => dispatch => {
  dispatch({
    type: OPEN_CHANNELS_HIDE,
    openChannelsId: openChannelsId
  })
}

export const openChannelsLeave = (openChannelsId) => dispatch => {
  client.OpenChannel.get(openChannelsId, function(error, openChannel) {
    openChannel.leave(function(error) {
      dispatch({
        type: OPEN_CHANNELS_CLOSE,
        openChannelsId: openChannelsId
      })
      dispatch({
        type: OPEN_CHANNELS_REMOVE_HISTORY,
        openChannelsId: openChannelsId
      })
    })
  })

}
