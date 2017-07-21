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
        <v-list-tile v-for="group in groups" :key="group['.key']">
          <v-list-tile-action @click="setSelectedGroup(group)">
            <v-icon>group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="setSelectedGroup(group)">
            {{group.name}}
          </v-list-tile-content>
          <v-divider></v-divider>
          <v-list-tile-action @click="$router.push(`/group_users/${group['.key']}`)">
            <v-btn icon>
              <v-icon>people_outline</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action @click.stop="deleteGroup(group['.key'])">
            <v-btn icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <app-name-input @nameEntered="addGroup" label="Group Name"></app-name-input>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import appNameInput from './NameInput'
import appBreadcrumb from './Breadcrumb'
import { mapGetters } from 'vuex'
import appConfirm from './Confirm'
import { messageBus } from '../main'

export default {
  computed: {
    ...mapGetters(['uid', 'email'])
  },
  components: {
    appBreadcrumb,
    appNameInput,
    appConfirm
  },
  data () {
    return {
      showConfirm: false,
      onConfirmCallback: null,
      groups: []
    }
  },
  methods: {
    addGroup (groupName) {
      const groupId = this.$firebaseRefs.groups.push({ name: groupName }).key

      firebase.database().ref(`/group_users/${groupId}`).push({
        email: this.email,
        uid: this.uid
      })

      firebase.database().ref(`/users/${this.uid}/group_memberships`).push(groupId)

      messageBus.$emit('addMessage', {
        type: 'success',
        text: 'New group added successefully'
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
        messageBus.$emit('addMessage', {
          type: 'success',
          text: 'The group was deleted successefully'
        })
      }
      this.showConfirm = false
    }
  },
  watch: {
    uid (value) {
      this.bindGroups(value)
    }
  },
  created () {
    this.bindGroups(this.uid)
  }
}
</script>

<style>

</style>
