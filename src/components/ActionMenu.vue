<template>
  <v-list-tile-action class="hidden-sm-and-up">
    <v-menu :ref="group['.key']" :nudge-right="26">
      <v-btn icon slot="activator">
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="action in actions" :key="action.action">
          <v-list-tile-action>
            <v-btn :data-menu-action="action.action" icon @click="doAction(action.action, group)">
              <v-icon>{{action.icon}}</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-list-tile-action>
</template>

<script>
export default {
  name: 'ActionMenu',
  props: ['group', 'actions'],
  methods: {
    doAction (action, group) {
      this.$emit('doAction', {action, group})
    }
  }

}
</script>

<style>

</style>
