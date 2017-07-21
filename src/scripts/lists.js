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

export function getList (db, key, cb) {
  const ref = db.ref(`/lists/${key}`)
  ref.once('value', snap => {
    const list = snap.val()
    console.log('Found Group ', list)
    cb(list)
  })
}
