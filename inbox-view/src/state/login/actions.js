
import {
	LOGIN_REQUEST,
	LOGIN_REQUEST_FAILURE,
	LOGIN_REQUEST_SUCCESS
} from 'state/action-types'

import client from 'Client'

export const loginUser = (appId, email, password) => dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
    appId,
    email
  })

  client.authenticate(appId, email, password)
}
