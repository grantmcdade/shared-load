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
--><template>
  <v-layout wrap>
    <v-flex xs12 sm6>

      <v-card>
        <v-card-title>
          <h4>All Lsts</h4>
          <p class="ml-3">All the lists wich the user is currently linked to</p>
        </v-card-title>
        <v-list subheader>
          <v-subheader>Lists</v-subheader>
          <v-list-tile v-for="list in lists" :key="list['.key']" :to="`/all_lists/${list['.key']}`">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{list.name}}
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <router-view></router-view>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      lists: []
    }
  },
  created () {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const ref = firebase.database().ref(`/users/${user.uid}/group_memberships`)
        ref.once('value', membershipSnap => {
          const groupMemberships = membershipSnap.val()
          for (var key in groupMemberships) {
            if (groupMemberships.hasOwnProperty(key)) {
              var groupId = groupMemberships[key]
              const groupRef = firebase.database().ref(`/lists/${groupId}`)

              groupRef.on('child_added', snap => {
                const list = snap.val()
                list['.key'] = snap.key
                this.lists.push(list)
              })

              groupRef.on('child_removed', span => {
                const index = this.lists.findIndex(list => {
                  return list['.key'] === span.key
                })
                this.lists.slice(index, 1)
              })
            }
          }
        })
      }
      unsub()
    })
  }
}
</script>

<style>
.mark {
  background-color: lightskyblue;
  border: 1px solid lightsalmon;
}
</style>
