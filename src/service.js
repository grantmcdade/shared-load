import injector from 'vue-inject'
import firebase from 'firebase'
import GroupService from './services/groups'
import UserService from './services/users'

import config from '../temp-settings'

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config.firebase)

injector.factory('db', firebase.database)
injector.service('GroupService', GroupService)
injector.service('UserService', UserService)

export {
  firebaseApp
}
