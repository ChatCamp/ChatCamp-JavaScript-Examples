import Immutable, {Map} from 'immutable'
import {
	GROUP_CHANNELS_GET_SUCCESS,
	GROUP_CHANNELS_GET_HISTORY_SUCCESS,
  GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS
} from 'state/action-types'


export const initialState = Map()

export function groupChannels (state = initialState, action) {
  let oldMessages;
  switch (action.type) {
    case GROUP_CHANNELS_GET_SUCCESS:
      let g = Map(action.groupChannel)
      return state
        .setIn([action.groupChannel.getId()], g)
        .setIn([action.groupChannel.getId(), 'participantsCount'], action.groupChannel.participants.length)
    case GROUP_CHANNELS_GET_HISTORY_SUCCESS:
      let messages = {};
      for(let i in action.messages.reverse()) {
        let message = action.messages[i]
        messages[message['id']] = {
          'id': message.id,
          'text': message.text,
          'user': Map(message.user),
          'insertedAt': message.insertedAt
        }
      }
      let messageMap = Immutable.OrderedMap(messages);
      messageMap = messageMap.toOrderedMap();
      oldMessages = state.getIn([action.groupChannel.getId(), 'messages'], Immutable.OrderedMap())
      return state
        .setIn([action.groupChannel.getId(), 'messages'], messageMap.merge(oldMessages))
    case GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS:
      let mO = {};
      mO[action.message.id] = {
        'id': action.message.id,
        'text': action.message.text,
        'user': Map(action.message.user),
        'insertedAt': action.message.insertedAt
      }
      mO = Immutable.fromJS(mO)
      oldMessages = state.getIn([action.groupChannel.getId(), 'messages'], Immutable.OrderedMap())
      return state
        .setIn([action.groupChannel.getId(), 'messages'], oldMessages.merge(mO))
    default:
      return state
  }
}
