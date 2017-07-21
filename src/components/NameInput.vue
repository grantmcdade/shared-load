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
  <v-layout row wrap class="pl-2 pr-2">
    <v-flex sm1 class="hidden-sm-and-down"></v-flex>
    <v-flex sm9 xs12>
      <v-text-field id="inputName" name="inputName" :label="label" :value="value" @input="input"></v-text-field>
    </v-flex>
    <v-flex sm1 xs12>
      <v-btn raised block @click="nameEntered">Add</v-btn>
    </v-flex>
    <v-flex sm1 class="hidden-sm-and-down"></v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['value', 'label'],
  methods: {
    input (event) {
      this.$emit('input', event.target.value)
    },
    nameEntered () {
      this.$emit('nameEntered')
    }
  }
}
</script>

<style>

</style>
