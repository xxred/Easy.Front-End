export function getItem(key) {
  return localStorage.getItem(key)
}

export function setItem(key, token) {
  return localStorage.setItem(key, token)
}

export function removeItem(key) {
  return localStorage.removeItem(key)
}

export default {
  getItem,
  setItem,
  removeItem
}
