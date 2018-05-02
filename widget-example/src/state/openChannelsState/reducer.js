// import {Map} from 'immutable'
// import {
//   OPEN_CHANNELS_CREATE,
//   OPEN_CHANNELS_CLOSE,
//   OPEN_CHANNELS_OPEN,
//   OPEN_CHANNELS_MINIMIZE,
//   OPEN_CHANNELS_HIDE
// } from 'state/action-types'
//
//
// export const initialState = Map({
//
// })
//
// export function openChannelsState (state = initialState, action) {
//   switch (action.type) {
//     case OPEN_CHANNELS_CREATE:
//     let final
//       if(state.getIn([action.openChannelsId,"state"]) === undefined){
//         final = "OPEN"
//       }
//       else{
//         final = state.getIn([action.openChannelsId,"state"])
//       }
//       return state.setIn([action.openChannelsId,"state"], final)
//     case OPEN_CHANNELS_CLOSE:
//       return state.removeIn([action.openChannelsId])
//     case OPEN_CHANNELS_OPEN:
//       return state.setIn([action.openChannelsId,"state"], "OPEN")
//     case OPEN_CHANNELS_MINIMIZE:
//       return state.setIn([action.openChannelsId,"state"], "MINIMIZE")
//     case OPEN_CHANNELS_HIDE:
//       return state.setIn([action.openChannelsId,"state"], "HIDDEN")
//     default:
//       return state
//   }
// }
