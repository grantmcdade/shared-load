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
      <h4>Item Details</h4>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex xs12>
          <strong>Item Id:</strong> {{itemId}}
        </v-flex>
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
      item: null
    }
  },
  methods: {
  },
  watch: {
    itemId () {

    }
  },
  created () {
    this.$bindAsObject('item', firebase.database().ref(`/item/${this.itemId}`))
  }
}
</script>

<style>

</style>
