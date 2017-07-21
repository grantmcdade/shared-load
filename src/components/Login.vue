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
  <v-layout v-if="!uid" wrap>
    <v-flex>
      <v-card>
        <v-card-title>
          <h5>Supported Poviders</h5>
        </v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn block class="primary" @click="signinWithGoogle">Login with Google
            <v-icon dark right>lock_open</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title>
          <h5>Email and Password</h5>
        </v-card-title>
        <v-card-text>
          <v-text-field name="email" type="email" label="Email Address" v-model="email">
          </v-text-field>
          <v-text-field name="password" type="password" label="Password" v-model="password">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn block class="primary" @click="signInWithEmailAndPassord">Signin
            <v-icon dark right>lock_open</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signinWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(() => {
          this.$router.push('/groups')
        })
        .catch(e => {
          alert(e.message)
        })
    },
    signInWithEmailAndPassord () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(e => {
          alert(e.message)
        })
    }
  },
  computed: {
    ...mapGetters(['uid'])
  }
}
</script>

<style>

</style>
