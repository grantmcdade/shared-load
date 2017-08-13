import injector from 'vue-inject'
import GroupService from './services/groups'
import UserService from './services/users'

injector.service('GroupService', GroupService)
injector.service('UserService', UserService)
