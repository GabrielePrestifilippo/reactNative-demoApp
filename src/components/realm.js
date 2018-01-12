'use strict'

import Realm from 'realm'

const Tags = {
  name: 'Tags',
  properties: {
    name: 'string',
    tags: 'string[]',
  }
}
const Token = {
  name: 'Token',
  properties: {
    code: 'string?',
    used: 'int?',
  }
}

const Person = {
  name: 'Person',
  properties: {
    full_name: 'string',
    id: 'string',
    profile_picture: 'string?',
    username: 'string',
    last_picture: 'string?'
  }
}

const People = {
  name: 'People',
  properties: {
    list: 'Person[]',
    retrievedOn: 'string?'
  }
}
export default new Realm({schema: [Tags, Token, Person, People], schemaVersion: 1})

