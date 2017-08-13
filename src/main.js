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
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import injector from 'vue-inject'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './service'
import config from '../temp-settings'

Vue.use(VueFire)
Vue.use(injector)
Vue.use(Vuetify)

function setUser(user) {
  if (user) {
    store.commit('SET_UID', user.uid)
    store.commit('SET_EMAIL', user.email)
  } else {
    store.commit('CLEAR_STATE')
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  fb: null,
  render: h => h(App),
  created() {
    this.fb = firebase.initializeApp(config.firebase)

    firebase.auth().onAuthStateChanged(u => {
      const user = {
        id: u.uid,
        name: u.displayName || u.name || u.email,
        email: u.email
      }
      setUser(user)
    })
  }
})

export {
  app,
  router,
  store,
  setUser
}
