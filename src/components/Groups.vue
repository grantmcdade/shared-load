<!--
    This file is part of Shared Load.

    Shared Load is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Shared Load is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Shared Load.  If not, see <http://www.gnu.org/licenses/>.
-->
<template>
  <div v-if="uid">
    <v-dialog v-model="showConfirm" persistent>
      <app-confirm message="This will delete the group and all related data. Are you sure?" @confirm="onConfirm"></app-confirm>
    </v-dialog>
    <v-card>
      <v-card-title>
        <h5>Groups</h5>
      </v-card-title>
      <v-list>
        <app-group-list-tile v-for="group in groups" :key="group['.key']" :group="group" :actions="actions" @selectGroup.passive="setSelectedGroup" @doAction.passive="doAction" @editName.passive="onEditName"></app-group-list-tile>
      </v-list>
      <app-name-input @nameEntered.passive="addGroup" label="Group Name"></app-name-input>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import appNameInput from './NameInput.vue'
import appBreadcrumb from './Breadcrumb.vue'
import appGroupListTile from './GroupListTile.vue'
import { mapGetters } from 'vuex'
import appConfirm from './Confirm.vue'
import { messageBus } from '../scripts/message-bus'

export default {
  name: 'Groups',
  dependencies: ['GroupService'],
  computed: {
    ...mapGetters(['uid', 'email'])
  },
  components: {
    appBreadcrumb,
    appNameInput,
    appConfirm,
    appGroupListTile
  },
  data () {
    return {
      showConfirm: false,
      onConfirmCallback: null,
      groups: [],
      actions: [
        { title: 'Edit Group', icon: 'mode_edit', action: 'edit' },
        { title: 'Group Users', icon: 'people_outline', action: 'group_users' },
        { title: 'Delete Group', icon: 'delete', action: 'delete' }
      ]
    }
  },
  methods: {
    addGroup (groupName) {
      this.GroupService.create({
        uid: this.uid,
        groupName,
        email: this.email
      })
    },
    deleteGroup (key) {
      this.showConfirm = true
      this.onConfirmCallback = confirmed => {
        if (confirmed) {
          this.$firebaseRefs.groups.child(key).remove()
        }
      }
    },
    bindGroups (uid) {
      if (uid) {
        const ref = firebase.database().ref(`/users/${uid}/my_groups`)
        this.$bindAsArray('groups', ref)
      }
    },
    setSelectedGroup (group) {
      this.$store.commit('SET_SELECTED_GROUP', group)
      this.$router.push(`/groups/${group['.key']}`)
    },
    onConfirm (confirmed) {
      if (this.onConfirmCallback) {
        this.onConfirmCallback(confirmed)
        this.onConfirmCallback = null
        if (confirmed) {
          messageBus.$emit('addMessage', {
            type: 'success',
            text: 'The group was deleted successefully'
          })
        }
      }
      this.showConfirm = false
    },
    doAction (payload) {
      switch (payload.action) {
        case 'delete':
          this.deleteGroup(payload.key)
          break
        case 'group_users':
          this.$router.push(`/group_users/${payload.key}`)
          break
        case 'edit':
          const group = this.groups.find(g => g['.key'] === payload.editGroup)
          if (group) {
            this.updateGroupName(payload.editGroup, group.name)
          }
          break
        default:
          console.log('No action executed for', payload.action)
          break
      }
    },
    onEditName (group) {
      console.log('In onEditName', group)
      if (group) {
        this.updateGroupName(group['.key'], group.name)
      }
    },
    updateGroupName (key, name) {
      this.editGroup = ''
      this.$firebaseRefs.groups.child(`${key}`).update({ name })
    }
  },
  watch: {
    uid (value) {
      this.bindGroups(value)
    },
    editGroup (val, old) {
      console.log(val, old)
    }
  },
  created () {
    this.bindGroups(this.uid)
  }
}
</script>

<style>
.list__tile__action {
  justify-content: center;
}
</style>
