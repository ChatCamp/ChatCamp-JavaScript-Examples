import {
	APP_CREATE,
  APP_VALID
} from 'state/action-types'

import client from 'Client'

export const appCreate = (appId, email, username, password, verifyPassword, recaptchaResponse) => dispatch => {
  dispatch({
    type: APP_CREATE,
    appId,
    email
  })

  client.appCreate(appId, email, username, password, verifyPassword, recaptchaResponse)
}

export const appValid = (appId) => dispatch => {
  dispatch({
    type: APP_VALID,
    appId
  })

  client.appValid(appId)
}
