export function getMyTags (realm) {
  let realmObjects = realm.objects('Tags').filtered('name = "myTags"')
  if (realmObjects.length !== 0) {
    return realmObjects[0]
  } else {
    return null
  }
}

export function getSuggestedTags (realm) {
  let realmObjects = realm.objects('Tags').filtered('name = "suggestedTags"')
  if (realmObjects.length !== 0) {
    return realmObjects[0]
  } else {
    return null
  }
}

export function getToken (realm) {
  let realmObjects = realm.objects('Token')
  if (realmObjects.length !== 0) {
    return realmObjects[0]
  } else {
    return null
  }
}

export function getPeople (realm) {
  let realmObjects = realm.objects('People')
  if (realmObjects.length !== 0) {
    return realmObjects[0]
  } else {
    return null
  }
}

export function initDB (realm) {
  let myTags = realm.objects('Tags')
  if (myTags.length != 4) {
    realm.write(() => {
      realm.create('Tags', {name: 'myTags'})
    })
    realm.write(() => {
      realm.create('Tags', {name: 'suggestedTags'})
    })
    realm.write(() => {
      realm.create('Token', {code: undefined})
    })
    realm.write(() => {
      realm.create('People', {list: []})
    })
  }

}