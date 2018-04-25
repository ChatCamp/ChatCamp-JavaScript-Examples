import { post, get } from './utils'
import * as store from 'store2'

export function getLocalToken () {
  return store.get('auth_token')
}

export function resetLocalToken () {
  store.remove('auth_token')
}
export function setLocalToken (token) {
  store.set('auth_token', token)
}

export function getAccessToken () {
  return store.get('access_token')
}

export function resetAccessToken () {
  store.remove('access_token')
}
export function setAccessToken (token) {
  store.set('access_token', token)
}

export function getApiKey () {
  return store.get('api_key')
}

export function resetApiKey () {
  store.remove('api_key')
}

export function setApiKey (token) {
  store.set('api_key', token)
}
export function getAppId () {
  return store.get('app_id')
}

export function resetAppId () {
  store.remove('app_id')
}
export function setAppId (token) {
  store.set('app_id', token)
}

export function isLoggedIn () {
  return getLocalToken() !== null
}

// export function getAppId () {
//   return null;
// }

export function isAppVerified () {
  return false;
}

export function getRecoveryEmailStatus () {
  return false;
}

export function getPasswordTokenStatus () {
  return true;
}

export async function loginAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/users.login', data)
}

export async function logoutAPI () {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  // return post('/auth', data)
  return get('/api/3.0/users.logout')
}

export async function registerAppAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/app.create', data)
}

export async function registerUserAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/users.register', data)
}

export async function appVerifyAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/app.valid', data)
}

export async function recoverPasswordAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/users.recoverPassword', data)
}

export async function verifyResetPasswordTokenAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return get('/api/3.0/users.resetPassword?reset_token=' + data.reset_token + '&app_id=' + data.app_id)
}

export async function resetPasswordAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/users.resetPassword', data)
}

export async function emailConfirmAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return get('/api/3.0/users.confirm?confirmation_token=' + data.confirmation_token + '&app_id=' + data.app_id)
}

export async function getApiKeyAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/api/3.0/app.info', data)
}
