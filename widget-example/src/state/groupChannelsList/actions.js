import {
  GROUP_CHANNELS_MY_LIST_SUCCESS,
  GROUP_CHANNELS_LIST_SUCCESS
} from 'state/action-types'

import client from 'Client'

export const getList = (reference) => dispatch => {
  var groupListQuery = client.GroupChannel.createGroupChannelListQuery();
  groupListQuery.reference = reference
  groupListQuery.get(function(error, groupChannelList){
     if(error == null){
       dispatch({
         type: GROUP_CHANNELS_LIST_SUCCESS,
         groupChannels: groupChannelList
       });
       dispatch({
         type: GROUP_CHANNELS_MY_LIST_SUCCESS,
         groupChannels: groupChannelList
       });
      }

  })
}
