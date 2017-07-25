/*
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
*/

import Vue from 'vue'
import * as vts from 'vue-typescript-component'
import validate from 'validate.js'

@vts.component()
export default class NameInput extends Vue {

  // dependencies = ['GroupService']

  @vts.prop() value = 'test'
  @vts.prop() label = ''

  text = ''
  valid = false
  input () {
    this.$emit('input', this.text)
  }

  nameEntered () {
    this.$emit('nameEntered', this.text)
    this.text = ''
  }
  validate () {
    if (validate) {
      const result = validate.single(this.text, { presence: true })
      this.valid = result === undefined
      return result
    }
  }

  @vts.watch('value') onValueChange (val: string, oldVal: string) {
    this.text = val
  }
}
