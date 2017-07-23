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
    <v-flex md1 class="hidden-sm-and-down"></v-flex>
    <v-flex md9 sm12 xs12>
      <v-text-field id="inputName" name="inputName" prepend-icon="group" :label="label" :placeholder="label" v-model="text" required :rules="validate()"></v-text-field>
    </v-flex>
    <v-flex md1 sm12 xs12>
      <v-btn block class="primary" :disabled="!valid" @click="nameEntered">Add</v-btn>
    </v-flex>
    <v-flex md1 class="hidden-sm-and-down"></v-flex>
  </v-layout>
</template>

<script>
import v from 'validate.js'

export default {
  props: ['value', 'label'],
  data () {
    return {
      text: '',
      valid: false
    }
  },
  methods: {
    input (event) {
      this.$emit('input', this.text)
    },
    nameEntered () {
      this.$emit('nameEntered', this.text)
      this.text = ''
    },
    validate () {
      const result = v.single(this.text, {presence: true})
      this.valid = result === undefined
      return result
    }
  },
  watch: {
    value (val) {
      this.text = val
    }
  }
}
</script>

<style>

</style>
