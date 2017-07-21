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

export function getGroup (db, uid, key) {
  const ref = db.ref(`/users/${uid}/my_groups/${key}`)
  return new Promise((resolve, reject) => {
    ref.once('value', snap => {
      const group = snap.val()
      console.log('Found Group ', group)
      resolve(group)
    })
  })
}
