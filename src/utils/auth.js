import Storage from 'src/utils/storage'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Storage.getItem(TokenKey)
}

export function setToken(token) {
  return Storage.setItem(TokenKey, token)
}

export function removeToken() {
  return Storage.removeItem(TokenKey)
}
