import Immutable, {Map} from 'immutable'
import {
  GROUP_CHANNELS_ATTACHMENT_PROGRESS,
  GROUP_CHANNELS_ATTACHMENT_RESET,
	GROUP_CHANNELS_GET_SUCCESS,
	GROUP_CHANNELS_GET_ERROR,
	GROUP_CHANNELS_GET_HISTORY_SUCCESS,
  GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS,
  GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED,
  GROUP_CHANNELS_INVITE_ACCEPTED_SUCCESS,
  GROUP_CHANNELS_INVALID_PARTICIPANT
} from 'state/action-types'


export const initialState = Map()

export function groupChannels (state = initialState, action) {
  let oldMessages, oldGroup;
  switch (action.type) {
    case GROUP_CHANNELS_GET_SUCCESS:
      let g = Map(action.groupChannel)
      oldGroup = state.getIn([action.groupChannel.getId()], Immutable.Map())
      g = g.merge(oldGroup)
      return state
        .setIn([action.groupChannel.getId()], g)
        .setIn([action.groupChannel.getId(), 'typing'], action.groupChannel.isTyping())
        .setIn([action.groupChannel.getId(), 'typingParticipants'], action.groupChannel.getTypingParticipants())
        .setIn([action.groupChannel.getId(), 'participants'], action.groupChannel.participants)
        .setIn([action.groupChannel.getId(), 'participantsCount'], action.groupChannel.participants.length)
    case GROUP_CHANNELS_GET_ERROR:
    return state
      .setIn([action.groupChannelId, "id"], action.groupChannelId)
      .setIn([action.groupChannelId, "errorCode"], action.error.getCode())
      .setIn([action.groupChannelId, "errorMessage"], action.error.getMessage())
    case GROUP_CHANNELS_GET_HISTORY_SUCCESS:
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
      oldMessages = state.getIn([action.groupChannel.getId(), 'messages'], Immutable.OrderedMap())
      return state
        .setIn([action.groupChannel.getId(), 'messages'], messageMap.merge(oldMessages))
    case GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS:
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
      oldMessages = state.getIn([action.groupChannel.getId(), 'messages'], Immutable.OrderedMap())
      return state
        .setIn([action.groupChannel.getId(), 'messages'], oldMessages.merge(mO))
    case GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED:
      return state
        .setIn([action.groupChannel.getId(), 'errorType'], GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED)
    case GROUP_CHANNELS_INVALID_PARTICIPANT:
      return state
        .setIn([action.groupChannel.getId(), 'errorType'], GROUP_CHANNELS_INVALID_PARTICIPANT)
    case GROUP_CHANNELS_INVITE_ACCEPTED_SUCCESS:
      return state
        .deleteIn([action.groupChannel.getId(), 'errorType'])
    case GROUP_CHANNELS_ATTACHMENT_PROGRESS:
      return state
        .setIn([action.groupChannelId, 'attachmentProgress'], action.progress)
    case GROUP_CHANNELS_ATTACHMENT_RESET:
      return state
        .setIn([action.groupChannelId, 'attachmentProgress'], 0)
    default:
      return state
  }
}
