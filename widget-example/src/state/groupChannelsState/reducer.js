import {Map} from 'immutable'
import {
  GROUP_CHANNELS_CREATE,
  GROUP_CHANNELS_CLOSE,
  GROUP_CHANNELS_OPEN,
  GROUP_CHANNELS_MINIMIZE,
  GROUP_CHANNELS_HIDE
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
      return state.setIn([action.groupChannelsId,"state"], final)
    case GROUP_CHANNELS_CLOSE:
      return state.removeIn([action.groupChannelsId])
    case GROUP_CHANNELS_OPEN:
      return state.setIn([action.groupChannelsId,"state"], "OPEN")
    case GROUP_CHANNELS_MINIMIZE:
      return state.setIn([action.groupChannelsId,"state"], "MINIMIZE")
    case GROUP_CHANNELS_HIDE:
      return state.setIn([action.groupChannelsId,"state"], "HIDDEN")
    default:
      return state
  }
}
