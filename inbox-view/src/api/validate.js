// Functions for <InputComponent /> validation,
// FEEL FREE TO REMOVE THIS FILE AND components/InputComponent.jsx,
export function maxSize (num, error = 'Value is too long') {
  return function (value) {
    if (value) {
      return value.length > num ? error : true
    }
  }
}

export function minSize (num, error = 'Value is too short') {
  return function (value) {
    if (value) {
      return value.length < num ? error : true
    }
  }
}

export function checkPasswords (t, error = 'Passwords donot match') {
  return function (value) {
    if (value) {
      return value !== t.state.password ? error : true
    }
  }
}

export function noSpace (str) {
  // trully can't get why do we need this check,
  // but without it on /profile/settings page we get error
  if (str !== undefined && str.indexOf(' ') > -1 ) {
    return `Spaces are not allowed`
  }
  // return !!str.match(/[^-\s]/g)
  return true
}

export function isRequired (str, field) {
  if (str && str.length >= 0) {
    return true
  }
  return `Please, enter your ${field}`
}

export function latin (str) {
  const latinRegex = /^([0-9a-z]+)$/i
  if(!str.match(latinRegex)) {
    return `Please, enter only alphanumeric characters`
  }
  return true
}

export function number (str) {
  return !!str.match(/\d+/g)
}

export function email (str) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(str && !str.match(emailRegex)) {
    return `Please, enter correct email`
  }
  return true
}

export function phone () { }

export function composition (array) {
  return function (value, field) {
    for (var i = 0; i < array.length; i++) {
      if (array[i](value, field) !== true) {
        return array[i](value, field)
      }
    }
    return false
  }
}

export default {
  isRequired,
  phone,
  email,
  noSpace,
  number,
  latin,
  maxSize,
  composition,
  checkPasswords
}
