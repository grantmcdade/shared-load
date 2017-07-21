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
  <v-flex xs12 sm6>
    <v-card>
      <v-card-title>
        <h5 id="itemDetails">Items On The Selected List</h5>
      </v-card-title>
      <v-list>
        <v-list-tile v-for="item in list" :key="item['.key']" :to="`/items/${item['.key']}`">
          <v-list-tile-action @click="selectedItem = item['.key']" :class="{ 'is-active': selectedItem === item['.key'] }">
            {{item.name}}
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['listId'],
  data () {
    return {
      list: [],
      selectedItem: null
    }
  },
  created () {
    this.bindList(this.listId)
  },
  watch: {
    listId (value) {
      this.bindList(value)
    }
  },
  methods: {
    bindList (listId) {
      /* istanbul ignore if */
      if (listId) {
        const ref = firebase.database().ref(`/items/${this.listId}`)
        this.$bindAsArray('list', ref)
      }
    }
  }
}
</script>

<style>

</style>
