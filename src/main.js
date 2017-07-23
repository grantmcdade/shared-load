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
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB-qAtdvDojruWBVzGWDXapvOv4SYlxQfo',
  authDomain: 'menal-load-test.firebaseapp.com',
  databaseURL: 'https://menal-load-test.firebaseio.com',
  projectId: 'menal-load-test',
  storageBucket: 'menal-load-test.appspot.com',
  messagingSenderId: '479864308461'
}
const firebaseApp = firebase.initializeApp(config)

Vue.use(VueFire)
Vue.use(Vuetify)

function setUser(user) {
  if (user) {
    store.commit('SET_UID', user.uid)
    store.commit('SET_EMAIL', user.email)
  } else {
    store.commit('CLEAR_STATE')
  }
}

firebase.auth().onAuthStateChanged(u => {
  setUser(u)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export {
  app,
  router,
  store,
  firebaseApp,
  setUser
}
