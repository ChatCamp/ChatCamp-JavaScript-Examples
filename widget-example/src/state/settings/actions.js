
import {
	SAVE_SETTINGS_REQUEST,
	SAVE_SETTINGS_REQUEST_FAILURE,
	SAVE_SETTINGS_REQUEST_SUCCESS
} from 'state/action-types'

import client from 'Client'

export const saveSettings = (appId, fcmSenderId, fcmApiKey) => dispatch => {
  // alert(fcmSenderId)
  dispatch({
    type: SAVE_SETTINGS_REQUEST,
    appId,
    fcmSenderId,
    fcmApiKey
  })

  client.saveSettings(appId, fcmSenderId, fcmApiKey)
}
