import Immutable, {Map} from 'immutable'
import {
  OPEN_CHANNELS_LIST_SUCCESS,
  OPEN_CHANNELS_GET_SUCCESS,
  OPEN_CHANNELS_GET_HISTORY_SUCCESS,
  OPEN_CHANNELS_MESSAGE_RECEIVED_SUCCESS
} from 'state/action-types'


export const initialState = Map()

export function openChannels (state = initialState, action) {
  let oldMessages, oldOpen;
  switch (action.type) {
    case OPEN_CHANNELS_GET_SUCCESS:
      let g = Map(action.openChannel)
      oldOpen = state.getIn([action.openChannel.id], Immutable.Map())
      g = g.merge(oldOpen)
      return state
      .setIn([action.openChannel.id], g)
    case OPEN_CHANNELS_GET_HISTORY_SUCCESS:
      let messages = {};
      for(let i in action.messages.reverse()) {
        let message = action.messages[i]
        messages[message['id']] = {
          'id': message.id,
          'type': message.type,
          'text': message.text,
          'customType': message.customType,
          'metadata': message.metadata,
          'user': Map(message.user),
          'insertedAt': message.insertedAt,
          'attachment': Map(message.attachment)
        }
      }
      let messageMap = Immutable.OrderedMap(messages);
      messageMap = messageMap.toOrderedMap();
      oldMessages = state.getIn([action.openChannel.getId(), 'messages'], Immutable.OrderedMap())
      return state
        .setIn([action.openChannel.getId(), 'messages'], messageMap.merge(oldMessages))

    case OPEN_CHANNELS_LIST_SUCCESS:
      let channels = Map()
      for(let i in action.openChannels) {
        let g = Map(action.openChannels[i])
        oldOpen = state.getIn([action.openChannels[i].id], Immutable.Map())
        g = g.merge(oldOpen)
        channels = channels.setIn([action.openChannels[i].id], g)
      }

      let channelMap = channels;
      let oldChannels = state
      return channelMap.merge(oldChannels)
    case OPEN_CHANNELS_MESSAGE_RECEIVED_SUCCESS:
      let mO = {};
      mO[action.message.id] = {
        'id': action.message.id,
        'type': action.message.type,
        'text': action.message.text,
        'customType': action.message.customType,
        'metadata': action.message.metadata,
        'user': Map(action.message.user),
        'insertedAt': action.message.insertedAt,
        'attachment': Map(action.message.attachment)
      }
      mO = Immutable.OrderedMap(mO)
      oldMessages = state.getIn([action.openChannel.id, 'messages'], Immutable.OrderedMap())
      return state
        .setIn([action.openChannel.id, 'messages'], oldMessages.merge(mO))
    default:
      return state
  }
}
