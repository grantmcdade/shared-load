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
          <div class="headline">{{ headline || 'Confirm' }}</div>
        </v-card-title>
        <v-card-text>{{message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="closeDialog(false)">Cancel</v-btn>
          <v-btn flat="flat" @click.native="closeDialog(true)">OK</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
  props: ['dialog', 'headline', 'message'],
  methods: {
    closeDialog (confirm) {
      this.$emit('confirm', confirm)
    }
  }
}
</script>

<style>

</style>
