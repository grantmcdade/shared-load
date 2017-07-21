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
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  _uid: '',
  _email: '',
  _selectedGroup: null,
  _selectedList: null
}

const getters = {
  uid: state => state._uid,
  email: state => state._email,
  selectedGroup: state => state._selectedGroup,
  selectedList: state => state._selectedList
}

const mutations = {
  CLEAR_STATE: state => {
    state._uid = ''
    state._email = ''
  },
  SET_UID: (state, value) => {
    state._uid = value
  },
  SET_EMAIL: (state, value) => {
    state._email = value
  },
  SET_SELECTED_GROUP: (state, value) => {
    state._selectedGroup = value
  },
  SET_SELECTED_LIST: (state, value) => {
    state._selectedList = value
  }
}

const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
