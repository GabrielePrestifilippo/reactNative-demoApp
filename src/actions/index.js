export const setToken = (item) => {
  return {type: 'setToken', item}
}
export const setUsed = (item) => {
  return {type: 'setUsed', item}
}



export const setTags = (item) => {
  return {type: 'setTags', item}
}

export const removeTag = (item) => {
  return {type: 'removeTag', item}
}
export const addTag = (item) => {
  return {type: 'addTag', item}
}