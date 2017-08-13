import injector from 'vue-inject'
import GroupService from './services/groups'
import UserService from './services/users'
import FirebaseService from './services/firebase'

injector.service('FirebaseService', FirebaseService)
injector.service('GroupService', GroupService)
injector.service('UserService', UserService)
