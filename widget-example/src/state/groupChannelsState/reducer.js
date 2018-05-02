import {Map} from 'immutable'
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
  OPEN_CHANNELS_HIDE
} from 'state/action-types'


export const initialState = Map({

})

export function groupChannelsState (state = initialState, action) {
  switch (action.type) {
    case GROUP_CHANNELS_CREATE:
    let final
      if(state.getIn([action.groupChannelsId,"state"]) === undefined){
        final = "OPEN"
      }
      else{
        final = state.getIn([action.groupChannelsId,"state"])
      }
      return state.setIn([action.groupChannelsId,"state"], final).setIn([action.groupChannelsId,"type"], "group")
    case GROUP_CHANNELS_CLOSE:
      return state.removeIn([action.groupChannelsId])
    case GROUP_CHANNELS_OPEN:
      return state.setIn([action.groupChannelsId,"state"], "OPEN").setIn([action.groupChannelsId,"type"], "group")
    case GROUP_CHANNELS_MINIMIZE:
      return state.setIn([action.groupChannelsId,"state"], "MINIMIZE").setIn([action.groupChannelsId,"type"], "group")
    case GROUP_CHANNELS_HIDE:
      return state.setIn([action.groupChannelsId,"state"], "HIDDEN").setIn([action.groupChannelsId,"type"], "group")
    case OPEN_CHANNELS_CREATE:
    let final1
      if(state.getIn([action.openChannelsId,"state"]) === undefined){
        final1 = "OPEN"
      }
      else{
        final1 = state.getIn([action.openChannelsId,"state"])
      }
      return state.setIn([action.openChannelsId,"state"], final1).setIn([action.openChannelsId,"type"], "open")
    case OPEN_CHANNELS_CLOSE:
      return state.removeIn([action.openChannelsId])
    case OPEN_CHANNELS_OPEN:
      return state.setIn([action.openChannelsId,"state"], "OPEN").setIn([action.openChannelsId,"type"], "open")
    case OPEN_CHANNELS_MINIMIZE:
      return state.setIn([action.openChannelsId,"state"], "MINIMIZE").setIn([action.openChannelsId,"type"], "open")
    case OPEN_CHANNELS_HIDE:
      return state.setIn([action.openChannelsId,"state"], "HIDDEN").setIn([action.openChannelsId,"type"], "open")
    default:
      return state
  }
}
