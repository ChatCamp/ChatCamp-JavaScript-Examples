
import {
  GROUP_CHANNELS_CREATE,
  GROUP_CHANNELS_CLOSE,
  GROUP_CHANNELS_OPEN,
  GROUP_CHANNELS_MINIMIZE
} from 'state/action-types'


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
