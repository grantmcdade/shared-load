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
      <h4 id="itemDetails">Item Details</h4>
      <span v-if="item" class="ml-3">for {{item.name}}</span>
    </v-card-title>
    <v-card-text>
      <v-layout row>
        <v-flex xs12>
          <strong>Item Id:</strong> {{itemId}}
        </v-flex>
      </v-layout>
      <v-layout v-if="item" row wrap>
        <v-flex xs12 md6>
          <v-select :items="users" item-text="name" item-value="uid" v-model="item.assignedTo" label="Assigned To"></v-select>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field label="Estimated Duration" v-model="item.aproximateDuration" suffix="minutes"></v-text-field>
        </v-flex>
        <v-btn raised primary @click="saveItem">Save</v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['itemId'],
  data () {
    return {
      item: null,
      users: []
    }
  },
  dependencies: ['UserService'],
  methods: {
    saveItem () {
      const item = Object.assign({}, this.item)
      delete item['.key']
      this.$firebaseRefs.item.update(item)
    }
  },
  created () {
    this.$bindAsObject('item', firebase.database().ref(`/items/${this.itemId}`))

    this.UserService.getUsers()
    .then(users => {
      this.users = users
    })
  }
}
</script>

<style>

</style>
