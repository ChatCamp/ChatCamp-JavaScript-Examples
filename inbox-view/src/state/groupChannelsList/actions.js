import {
  GROUP_CHANNELS_MY_LIST_SUCCESS
} from 'state/action-types'

import client from 'Client'

// export const getMyGroupChannelList = (groupChannelId) => dispatch => {
//   client.GroupChannel.get(groupChannelId, function(error, groupChannel) {
//     if(!error) {
//       dispatch({
//         type: GROUP_CHANNELS_MY_LIST_SUCCESS,
//         groupChannel: groupChannel
//       });
//     }
//   });
// }
