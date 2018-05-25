import client from 'Client'
import {
  USER_LIST_SUCCESS
} from 'state/action-types'

export const getUserList = (limit,reference) => dispatch => {
  var userListQuery = client.createUserListQuery();
  userListQuery.limit = limit
  userListQuery.reference = reference
  userListQuery.load(function(error, userList){
     if(error == null){
        dispatch({
          type: USER_LIST_SUCCESS,
          userList: userList
        });
      }

  })
}
