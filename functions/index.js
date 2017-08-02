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

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.recordUser = functions.auth.user().onCreate(event => {
  // Save the new user's info
  const user = event.data
  const userInfo = {
    uid: user.uid,
    name: user.name || user.email || '',
    email: user.email,
    displayname: user.displayname || user.email || ''
  }

  const ref = admin.database().ref(`/users/${user.uid}`)
  return ref.set(userInfo)
})
