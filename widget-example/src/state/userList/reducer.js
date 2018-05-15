import Immutable, {OrderedMap, Map} from 'immutable'
import {
  USER_LIST_SUCCESS,
} from 'state/action-types'


export const initialState = OrderedMap()

export function userList (state = initialState, action) {
  let oldUser;
  switch (action.type) {
    case USER_LIST_SUCCESS:
      let channels =  OrderedMap()
      for(let i in action.userList) {
        let g = OrderedMap(action.userList[i])
        oldUser = state.getIn([action.userList[i].id], Immutable.Map())
        g = g.merge(oldUser)
        channels = channels.setIn([action.userList[i].id], g)
      }

      let channelMap = channels;
      let oldChannels = state
      return oldChannels.merge(channelMap)

    default:
      return state
  }
}
