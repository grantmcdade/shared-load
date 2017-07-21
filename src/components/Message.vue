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
  <v-snackbar
    :success="type === 'success'"
    :info="type === 'info'"
    :warning="type === 'warning'"
    :error="type === 'error'"
    :primary="type === 'primary'"
    :secondary="type === 'secondary'"
    :multi-line="mode === 'multi-line'"
    :vertical="mode === 'vertical'"
    :top="true"
    v-model="snackbar"
  >
    {{ text }}
    <v-btn v-if="hasDelete" icon dark flat @click.native="snackbar = false"><v-icon>close</v-icon></v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ['type', 'timeout', 'mode', 'hasDelete', 'text'],
  data () {
    return {
      snackbar: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.snackbar = false
    }, this.timeout)
  }
}
</script>

<style>

</style>
