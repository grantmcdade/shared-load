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
  <v-app>
    <v-snackbar
      :success="snackbarType === 'success'"
      :info="snackbarType === 'info'"
      :warning="snackbarType === 'warning'"
      :error="snackbarType === 'error'"
      :primary="snackbarType === 'primary'"
      :secondary="snackbarType === 'secondary'"
      :top="true"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn icon dark flat @click.native="snackbar = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light>
      <v-toolbar class="pa-0 primary" dark>
        <v-toolbar-title>Shared Load</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native.stop="mini = !mini">
          <v-icon dark>chevron_left</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.link" v-if="visible(item)">
          <v-list-tile-action>
            <v-btn icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark class="primary">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title @click="navigateHome" style="cursor: pointer;">Shared Load</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in items" :key="item.title" :to="item.link" v-if="visible(item)">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import snackbarMixin from './scripts/snackbar'

export default {
  computed: {
    ...mapGetters(['uid'])
  },
  data () {
    return {
      mini: false,
      drawer: false,
      items: [
        { icon: 'group', title: 'Groups', link: '/groups', auth: true },
        { icon: 'list', title: 'Lists', link: '/all_lists', auth: true },
        { icon: 'lock_open', title: 'Sign in', link: '/login', auth: false },
        { icon: 'lock', title: 'Sign out', link: '/logout', auth: true }
      ]
    }
  },
  methods: {
    navigateHome () {
      this.$router.push('/')
    },
    visible (item) {
      if (item.auth) {
        return this.uid
      } else {
        return !this.uid
      }
    }
  },
  mixins: [snackbarMixin]
}

</script>

<style>

</style>
