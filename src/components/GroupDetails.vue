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
  <v-card>
    <v-card-title>
      <h4>Group Details</h4>
      <span v-if="selectedGroup && !editGroupName" class="ml-3" @click="startEditGroupName">for {{selectedGroup.name}}</span>
      <v-text-field v-else-if="editGroupName" autofocus v-model="groupName" @keydown.enter="saveGroupName" @blur="saveGroupName"></v-text-field>
      <v-spacer></v-spacer>
      <span><strong>Group Id:</strong> {{groupId}}</span>
    </v-card-title>

    <v-list>
      <v-list-tile v-for="list in lists" :key="list['.key']">
        <v-list-tile-action @click="setSelectedList(list)" class="hidden-xs-only">
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content @click="setSelectedList(list)">
          <v-list-tile-title>{{list.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action @click="deleteList(list['.key'])">
          <v-btn icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <app-name-input @nameEntered="addItem" label="List Name"></app-name-input>
  </v-card>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import appBreadcrumb from './Breadcrumb'
import appNameInput from './NameInput'
import { getGroup } from '../scripts/groups'

export default {
  props: ['groupId'],
  data () {
    return {
      lists: [],
      editGroupName: false,
      groupName: ''
    }
  },
  computed: {
    ...mapGetters(['uid', 'selectedGroup'])
  },
  components: {
    appBreadcrumb,
    appNameInput
  },
  methods: {
    addItem (listName) {
      this.$firebaseRefs.lists.push({ name: listName })
    },
    deleteList (key) {
      this.$firebaseRefs.lists.child(key).remove()
    },
    updateSelectedGroup (groupId) {
      if (!this.selectedGroup || (groupId !== this.selectedGroup['.key'])) {
        getGroup(firebase.database(), this.uid, groupId)
          .then(group => {
            this.$store.commit('SET_SELECTED_GROUP', group)
          })
          .catch(err => console.log(err))
      }
    },
    setSelectedList (list) {
      this.$store.commit('SET_SELECTED_LIST', list)
      this.$router.push(`/lists/${list['.key']}`)
    },
    startEditGroupName () {
      this.editGroupName = true
      this.groupName = this.selectedGroup.name
    },
    saveGroupName (event) {
      const ref = firebase.database().ref(`/users/${this.uid}/my_groups/${this.groupId}`)
      ref.update({ name: this.groupName })
      this.editGroupName = false
    }
  },
  watch: {
    groupId (value) {
      this.updateSelectedGroup(value)
    }
  },
  created () {
    this.updateSelectedGroup(this.groupId)

    this.$bindAsArray('lists',
      firebase.database().ref(`/lists/${this.groupId}`))
  }
}
</script>

<style>

</style>
