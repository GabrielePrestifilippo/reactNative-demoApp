export function token (state = {code: null, used: null}, action) {

  switch (action.type) {
    case 'setToken':
      return {...action.item}
    case 'setUsed':
      return {
        ...state,
        used: action.item
      }
    default:
      return state
  }
}

export function tags (state = {myTags: []}, action) {

  switch (action.type) {
    case 'setTags':
      return {
        ...state,
        myTags: action.item
      }
    case 'removeTag':
      return {
        ...state,
        myTags: [
          ...state.myTags.slice(0, state.myTags.indexOf(action.item)),
          ...state.myTags.slice(state.myTags.indexOf(action.item) + 1)
        ]
      }
    case 'addTag':
      return {
        ...state,
        myTags: state.myTags.concat(action.item)
      }
    default:
      return state
  }
}
