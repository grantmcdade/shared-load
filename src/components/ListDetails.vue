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
      <h4>List Details</h4>
      <span v-if="selectedList" class="ml-3">for {{selectedList.name}}</span>
      <v-spacer></v-spacer>
      <strong>List Id:</strong> {{listId}}</span>
    </v-card-title>
    <v-card-text>
      <v-layout row v-if="breadCrumb.length > 0">
        <app-breadcrumb :items="breadCrumb"></app-breadcrumb>
        <v-spacer></v-spacer>
      </v-layout>
      <v-list>
        <v-list-tile v-for="item in items" :key="item['.key']" :to="`/items/${item['.key']}`">
          <v-list-tile-action>
            <v-icon>radio_button_unchecked</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.name}}
          </v-list-tile-content>
          <v-list-tile-action @click.stop="deleteItem(item['.key'])">
            <v-icon>delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <app-name-input @nameEntered="addItem" label="Item Name"></app-name-input>
  </v-card>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import appBreadcrumb from './Breadcrumb'
import appNameInput from './NameInput'
import { getList } from '../scripts/lists'

export default {
  props: ['listId'],
  data () {
    return {
      items: [],
      breadCrumb: []
    }
  },
  components: {
    appBreadcrumb,
    appNameInput
  },
  computed: {
    ...mapGetters(['selectedGroup', 'selectedList'])
  },
  methods: {
    addItem (itemName) {
      const item = { name: itemName }
      const key = this.$firebaseRefs.items.push(item).key
      firebase.database().ref(`/items/${key}`).update(item)
      this.itemName = ''
    },
    deleteItem (key) {
      this.$firebaseRefs.items.child(key).remove()
    },
    updateSelectedList (listId) {
      if (!this.selectedList || (listId !== this.selectedList['.key'])) {
        console.log('Updating Group...')
        getList(firebase.database(), listId, list => {
          this.$store.commit('SET_SELECTED_LIST', list)
        })
      }
    }
  },
  watch: {
    listId (value) {
      this.updateSelectedList(value)
    }
  },
  created () {
    this.updateSelectedList(this.listId)
    this.$bindAsArray('items', firebase.database().ref(`/items/${this.listId}`))
    if (this.selectedGroup) {
      this.breadCrumb.push(
        { name: 'Groups', to: '/groups' },
        { name: 'Group', to: `/groups/${this.selectedGroup['.key']}` })
    }
    this.breadCrumb.push(
      { name: 'List', to: `/lists/${this.listId}` })
  }
}
</script>

<style>

</style>
