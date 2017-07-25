<template>
  <v-list-tile>
    <v-list-tile-action class="hidden-xs-only" @click="$emit('selectGroup', group)">
      <v-icon>group</v-icon>
    </v-list-tile-action>
    <v-list-tile-content @click="selectOrEdit(group)">
      <v-list-tile-title v-if="editGroup !== group['.key']">{{group.name}}</v-list-tile-title>
      <v-text-field v-else v-model="group.name" @keydown.enter="$emit('editName', group)"></v-text-field>
    </v-list-tile-content>
    <v-list-tile-action v-for="action in actions" :key="action.action" class="hidden-xs-only list__tile__action--stack">
      <v-btn icon flat @click.stop="$emit('doAction', { action: action.action, key: group['.key'] })">
        <v-icon>{{action.icon}}</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action class="hidden-sm-and-up">
      <v-menu :nudge-right="26">
        <v-btn icon slot="activator">
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="action in actions" :key="action.action">
            <v-list-tile-action>
              <v-btn icon @click.stop="doAction(action.action, group['.key'])">
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
  props: ['group', 'actions', 'editGroup'],
  methods: {
    selectOrEdit (group) {
      if (this.editGroup !== group['.key']) {
        this.$emit('selectGroup', group)
      }
    }
  }
}
</script>

<style>

</style>
