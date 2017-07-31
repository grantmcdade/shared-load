<template>
  <v-list-tile>
    <v-list-tile-action @click="setSelectedList(list)" class="hidden-xs-only">
      <v-icon>list</v-icon>
    </v-list-tile-action>
    <v-list-tile-content @click="setSelectedList(list)">
      <v-list-tile-title>{{list.name}}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action @click="deleteList(list['.key'])">
      <v-btn icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import appActionMenu from './ActionMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'ListListTile',
  props: ['list'],
  computed: {
    ...mapGetters(['uid', 'selectedGroup'])
  },
  components: {
    appActionMenu
  },
  methods: {
    deleteList (key) {
      this.$emit('deleteList', key)
    },
    setSelectedList (list) {
      this.$store.commit('SET_SELECTED_LIST', list)
      this.$router.push(`/lists/${list['.key']}`)
    }
  }
}
</script>

<style>

</style>
