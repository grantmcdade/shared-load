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
      <v-btn icon flat @click="doActionInternal(action.action, group)">
        <v-icon>{{action.icon}}</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action class="hidden-sm-and-up">
      <v-menu :ref="group['.key']" :nudge-right="26">
        <v-btn icon slot="activator">
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="action in actions" :key="action.action">
            <v-list-tile-action>
              <v-btn icon @click="doActionInternal(action.action, group)">
                <v-icon>{{action.icon}}</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
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
            console.log('In doAction completeEdit', action, group)
            this.$emit('editName', group)
            this.editGroup = ''
          } else {
            console.log('In doAction startEdit', action, group)
            this.editGroup = group['.key']
            console.log(this.$refs[group['.key']])
          }
          break
        case 'editName':
          this.$emit('editName', group)
          this.editGroup = ''
          break
        default:
          this.$emit('doAction', { action, key: group['.key'] })
          break
      }
    }
  }
}
</script>

<style>

</style>
