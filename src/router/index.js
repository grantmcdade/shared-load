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
import Router from 'vue-router'
import firebase from 'firebase'
const Home = resolve => require(['../components/Home'], resolve)
const Groups = resolve => require(['../components/Groups'], resolve)
const Login = resolve => require(['../components/Login'], resolve)
const Logout = resolve => require(['../components/Logout'], resolve)
const GroupDetails = resolve => require(['../components/GroupDetails'], resolve)
const ListDetails = resolve => require(['../components/ListDetails'], resolve)
const ItemDetails = resolve => require(['../components/ItemDetails'], resolve)
const UnknownPage = resolve => require(['../components/UnknownPage'], resolve)
const AllLists = resolve => require(['../components/AllLists'], resolve)
const AllListItems = resolve => require(['../components/AllListItems'], resolve)
const GroupUsers = resolve => require(['../components/GroupUsers'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/groups',
      component: Groups
    },
    {
      path: '/all_lists',
      component: AllLists,
      children: [{
        path: ':listId',
        component: AllListItems,
        props: true
      }]
    },
    {
      path: '/groups/:groupId',
      component: GroupDetails,
      props: true,
      beforeEnter(to, from, next) {
        const unsub = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            next()
          } else {
            next('/login')
          }
          unsub()
        })
      }
    },
    {
      path: '/lists/:listId',
      component: ListDetails,
      props: true
    },
    {
      path: '/items/:itemId',
      component: ItemDetails,
      props: true
    },
    {
      path: '/group_users/:groupId',
      component: GroupUsers,
      props: true
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      component: Logout
    },
    {
      path: '*',
      component: UnknownPage
    }
  ]
})
