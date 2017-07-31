<template>
  <v-list-tile>
    <v-list-tile-action class="hidden-xs-only" @click="selectOrEdit(group)">
      <v-icon>group</v-icon>
    </v-list-tile-action>
    <v-list-tile-content @click="selectOrEdit(group)">
      <v-list-tile-title v-if="editGroup !== group['.key']">{{group.name}}</v-list-tile-title>
      <v-text-field v-else v-model="group.name" autofocus @keydown.enter="doActionInternal('editName', group)"></v-text-field>
    </v-list-tile-content>
    <v-list-tile-action v-for="action in actions" :key="action.action" class="hidden-xs-only list__tile__action--stack">
      <v-btn :data-action="action.action" icon flat @click="doActionInternal(action.action, group)">
        <v-icon>{{action.icon}}</v-icon>
      </v-btn>
    </v-list-tile-action>
    <app-action-menu :actions="actions" :group="group" @doAction="menuAction"></app-action-menu>
  </v-list-tile>
</template>

<script>
import appActionMenu from './ActionMenu'

export default {
  name: 'GroupListTile',
  components: {
    appActionMenu
  },
  props: ['group', 'actions'],
  data () {
    return {
      editGroup: ''
    }
  },
  methods: {
    selectOrEdit (group) {
      if (this.editGroup !== group['.key']) {
        this.$emit('selectGroup', group)
      }
    },
    doActionInternal (action, group) {
      switch (action) {
        case 'edit':
          if (this.editGroup) {
            this.$emit('editName', group)
            this.editGroup = ''
          } else {
            this.editGroup = group['.key']
          }
          break
        case 'editName':
          this.$emit('editName', group)
          this.editGroup = ''
          break
        default:
          const params = { action, key: group['.key'] }
          this.$emit('doAction', params)
          break
      }
    },
    menuAction (payload) {
      this.doActionInternal(payload.action, payload.group)
    }
  }
}
</script>

<style>

</style>
