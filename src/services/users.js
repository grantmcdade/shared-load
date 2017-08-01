export default class UserService {
  _database;

  constructor(db) {
    this._database = db
  }

  getUsers () {
    let users = []
    return new Promise((resolve, reject) => {
      this._database.ref('/users').once('value', snap => {
        try {
          const userList = snap.val()
          for (var key in userList) {
            if (userList.hasOwnProperty(key)) {
              var user = userList[key]
              user.uid = key
              users.push(user)
            }
          }
        } catch (error) {
          reject(error)
        }
      })
      .then(() => {
        console.log(users)
        resolve(users)
      })
    })
  }
}
