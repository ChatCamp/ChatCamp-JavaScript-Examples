import Immutable, {OrderedSet} from 'immutable'
import {
  GROUP_CHANNELS_MY_LIST_SUCCESS,
  GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS,
  GROUP_CHANNELS_LEAVE_SUCCESS
} from 'state/action-types'


export const initialState = OrderedSet()

export function groupChannelsList (state = initialState, action) {
  switch (action.type) {
    case GROUP_CHANNELS_MY_LIST_SUCCESS:
    let inbox = [];
    let inboxList = {}
    // for(let i in action.groupChannels) {
    //   inboxList[action.groupChannels[i].id] = action.groupChannels[i]
    //   if(inbox.length > 0){
    //     for(let j in inbox){
    //       if(action.groupChannels[i].lastMessage && action.groupChannels[i].lastMessage.insertedAt > inboxList[inbox[j]].lastMessage.insertedAt && j !== (inbox.length - 1)){
    //         inbox.splice(j, 0, action.groupChannels[i].id);
    //       }
    //       else if(action.groupChannels[i].lastMessage && Number(j) === (inbox.length - 1)){
    //         inbox.push(action.groupChannels[i].id)
    //       }
    //     }
    //   }
    //   else{
    //     inbox.push(action.groupChannels[i].id)
    //   }
    //
    //
    // }
    for(let i in action.groupChannels) {
      inbox.push(action.groupChannels[i].id)
    }
    let inboxSet = Immutable.OrderedSet(inbox);
    inboxSet = inboxSet.toOrderedSet();
    let oldInbox = state
    return oldInbox.merge(inboxSet)

    case GROUP_CHANNELS_MESSAGE_RECEIVED_SUCCESS:
     let currentList = state.toJS()
     currentList.splice(0, 0, action.groupChannel.getId())
     let currentListSet = Immutable.OrderedSet(currentList);
     return currentListSet.toOrderedSet()

     case GROUP_CHANNELS_LEAVE_SUCCESS:
      return state.delete(action.groupChannel.id)

    default:
      return state
  }
}
