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
  <div>
    <app-message v-for="message in messages"
      :timeout="6000"
      :key="message.id"
      :type="message.type"
      :has-delete="message.hasDelete"
      :text="message.text"
    ></app-message>
  </div>
</template>

<script>
import appMessage from './Message'

export default {
  components: {
    appMessage
  },
  data () {
    return {
      messages: [
        {id: 1, hasDelete: true, text: 'Some message', type: 'primary'},
        {id: 1, hasDelete: true, text: 'Some message', type: 'info'},
        {id: 1, hasDelete: true, text: 'Some message', type: 'warning'},
        {id: 1, hasDelete: true, text: 'Some message', type: 'error'}
      ]
    }
  },
  methods: {
    addMessage (body, header, type) {
      this.messages.push({
        id: this.messages.length,
        type,
        hasDelete: true,
        header: header || 'Message',
        body
      })
    },
    removeMessage (body, header) {
      const msgIdx = this.messages.findIndex(elem => {
        return elem.header === header && elem.body === body
      })
      if (msgIdx !== -1) {
        this.messages.splice(msgIdx, 1)
      }
    },
    deleteMessage (payload) {
      this.removeMessage(payload.body, payload.header)
    }
  }
}
</script>

<style>

</style>
