/**
 * auth actions
 */

export const setUserInfo = (user) => {
  return {
    type: 'SET_USERINFO',
    payload: { user },
  }
}

export const setAlarm = (alarm) => {
  return {
    type: 'SET_ALARM',
    payload: { alarm },
  }
}

export const setAddress = (address) => {
  return {
    type: 'SET_ADDRESS',
    payload: { address },
  }
}


export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: { token },
  }
}

export const set_CardInfo = (token) => {
  return {
    type: 'SET_CARDINFO',
    payload: { token },
  }
}

export const Logut = () => {
  return { type: 'LOG_OUT' }
}

export const History = (state) => {
  return { type: 'HISTORY', payload: { state }, }
}