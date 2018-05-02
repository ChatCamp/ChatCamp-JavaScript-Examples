
import {
  OPEN_CHANNELS_CREATE,
  OPEN_CHANNELS_CLOSE,
  OPEN_CHANNELS_OPEN,
  OPEN_CHANNELS_MINIMIZE,
  OPEN_CHANNELS_HIDE,
  // OPEN_CHANNELS_HIDE_LAST,
  // OPEN_CHANNELS_OPEN_FIRST
} from 'state/action-types'


export const openChannelsCreate = (openChannelsId) => dispatch => {
  dispatch({
    type: OPEN_CHANNELS_CREATE,
    openChannelsId: openChannelsId
  })
}

export const openChannelsOpen = (openChannelsId) => dispatch => {
  dispatch({
    type: OPEN_CHANNELS_OPEN,
    openChannelsId: openChannelsId
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
