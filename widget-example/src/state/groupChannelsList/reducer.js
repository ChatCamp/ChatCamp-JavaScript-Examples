import Immutable, {OrderedSet} from 'immutable'
import {
  GROUP_CHANNELS_MY_LIST_SUCCESS,
} from 'state/action-types'


export const initialState = OrderedSet()

export function groupChannelsList (state = initialState, action) {
  switch (action.type) {
    case GROUP_CHANNELS_MY_LIST_SUCCESS:
    let inbox = [];
    for(let i in action.groupChannels) {
      inbox.push(action.groupChannels[i].id)
    }
    let inboxSet = Immutable.OrderedSet(inbox);
    inboxSet = inboxSet.toOrderedSet();
    return inboxSet

    default:
      return state
  }
}
