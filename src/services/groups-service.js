import firebase from 'firebase'
import { messageBus } from '../scripts/message-bus'

export default class GroupService {
  create(options) {
    if (!options.groupName) {
      return
    }

    const groupId = firebase.database().ref(`/users/${options.uid}/my_groups`).push({
      name: options.groupName
    }).key

    firebase.database().ref(`/group_users/${options.groupId}`).push({
      email: options.email,
      uid: options.uid
    })

    firebase.database().ref(`/users/${options.uid}/group_memberships`).push(groupId)

    messageBus.$emit('addMessage', {
      type: 'success',
      text: 'New group added successefully'
    })

    return groupId
  }
}
