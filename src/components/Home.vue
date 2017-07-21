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
    <v-card-title primary-title>
      <h3 class="headline mb-0">Home Component</h3>
    </v-card-title>
    <v-card-text>
      Welcome to the shared load app. This app allows task lists to be shared between a group of people.
    </v-card-text>
    <v-card-actions>
      <v-btn flat @click.native="getUser">Check User</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase'
import { messageBus } from '../scripts/message-bus'

export default {
  methods: {
    getUser () {
      const unsub = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          messageBus.$emit('addMessage', {
            type: 'success',
            text: 'User is signed in'
          })
        } else {
          messageBus.$emit('addMessage', {
            type: 'error',
            text: 'User is not signed in'
          })
        }
        unsub()
      })
    }
  }
}
</script>

<style>

</style>
