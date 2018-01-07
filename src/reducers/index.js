export function token (state = {code: null, expiry: null}, action) {

  switch (action.type) {
    case 'setToken':
      return {...action.item}
    default:
      return state
  }
}
