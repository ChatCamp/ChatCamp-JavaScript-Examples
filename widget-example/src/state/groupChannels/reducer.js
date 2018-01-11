import {Map} from 'immutable'
import {
	GROUP_CHANNELS_GET_SUCCESS,
  GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS
} from 'state/action-types'


export const initialState = Map()

export function groupChannels (state = initialState, action) {
  switch (action.type) {
    case GROUP_CHANNELS_GET_SUCCESS:
      return state
        .setIn([action.groupChannel.getId(), 'id'], action.groupChannel.getId())
        .setIn([action.groupChannel.getId(), 'name'], action.groupChannel.getName())
    case GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS:
      let mO = {};
      mO[action.message.id] = {
        'id': action.message.id,
        'text': action.message.text,
        'user': Map(action.message.user)
      }
      let oldMessages = state.getIn([action.groupChannel.getId(), 'messages'], Map())
      return state
        .setIn([action.groupChannel.getId(), 'messages'], oldMessages.merge(Map(mO)))
    default:
      return state
  }
}
