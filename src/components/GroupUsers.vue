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
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Group Users
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-tile v-for="user in users" :key="user['.key']">
              <v-list-tile-action>
                <v-icon>email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{user.email}}
              </v-list-tile-content>
              <v-list-tile-action @click="removeUser(user['.key'])">
                <v-icon>delete</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <div class="pl-3 pr-3">
          <v-card-text>
            <v-layout wrap>
              <v-flex md11 sm12 xs12>
                <v-text-field ref="text" name="email" type="email" label="Email Address"
                  prepend-icon="email" append-icon="warning" v-model="email"
                  required :rules="validate()"></v-text-field>
              </v-flex>
              <v-flex md1 sm12 xs12>
                <v-btn block primary @click="addUser">Add User</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import { messageBus } from '../scripts/message-bus'
import v from 'validate.js'

export default {
  props: ['groupId'],
  data () {
    return {
      users: [],
      email: '',
      valid: false
    }
  },
  methods: {
    bindGroupUsers (groupId) {
      if (groupId) {
        const ref = firebase.database().ref(`/group_users/${groupId}`)
        this.$bindAsArray('users', ref)
      }
    },
    addUser () {
      if (this.errors.has('email')) {
        return
      }

      const userIndex = this.users.findIndex(elem => {
        return elem.email === this.email
      })
      if (userIndex !== -1) {
        messageBus.$emit('addMessage', {
          type: 'success',
          text: 'This user is already a member of the group'
        })
        return
      }

      const ref = firebase.database().ref('/users')
      ref.orderByChild('email').equalTo(this.email).once('value', snap => {
        console.log(snap.key, snap.val())

        const users = snap.val()
        if (!users) {
          alert('User not found!')
        }

        for (var key in users) {
          if (users.hasOwnProperty(key)) {
            var user = users[key]
            console.log(user.email)

            const groupRef = firebase.database().ref(`/group_users/${this.groupId}`)
            const userKey = groupRef.push({
              email: user.email,
              uid: key
            }).key

            const userRef = firebase.database().ref(`/users/${key}/group_memberships/${userKey}`)
            userRef.set(this.groupId)
          }
        }
      })
        .catch(e => {
          alert(e.message)
        })
    },
    removeUser (key) {
      console.log('Key =', key)
      this.$firebaseRefs.users.child(key).remove()
      firebase.database().ref(`/users/${this.uid}/group_memberships/${key}`).remove()
    },
    validate () {
      const result = v.single(this.email, {presence: true, email: true})
      this.valid = result === undefined
      return result
    }
  },
  watch: {
    groupId (value) {
      this.bindGroupUsers(value)
    }
  },
  computed: {
    ...mapGetters(['uid'])
  },
  created () {
    this.bindGroupUsers(this.groupId)
  }
}
</script>

<style>

</style>
