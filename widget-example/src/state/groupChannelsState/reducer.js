import {Map} from 'immutable'
import {
  GROUP_CHANNELS_CREATE,
  GROUP_CHANNELS_CLOSE,
  GROUP_CHANNELS_OPEN,
  GROUP_CHANNELS_MINIMIZE
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
      return state.setIn([action.groupChannelsId,"state"], "CLOSE")
    case GROUP_CHANNELS_OPEN:
      return state.setIn([action.groupChannelsId,"state"], "OPEN")
    case GROUP_CHANNELS_MINIMIZE:
      return state.setIn([action.groupChannelsId,"state"], "MINIMIZE")
    default:
      return state
  }
}
