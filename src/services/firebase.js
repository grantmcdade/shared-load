export default class FirebaseService {
  _firebase

  constructor (firebase) {
    this._firebase = firebase
  }

  bindArray(path, items) {
    const ref = this._firebase.database().ref(path)
    ref.on('child_added', snap => {
      const key = snap.key
      const val = snap.val()

      const newItem = {
        '.key': key
      }
      for (let key in val) {
        if (val.hasOwnProperty(key)) {
          Object.assign(newItem[key], val[key])
        }
      }

      items.push(newItem)
    })
  }

  bindObject(path, item) {
    console.log('bindObject')
    const ref = this._firebase.database().ref(path)
    ref.on('value', snap => {
      console.log('value', snap.key)
      const key = snap.key
      const val = snap.val()

      item['.key'] = key
      for (let prop in val) {
        if (val.hasOwnProperty(prop)) {
          item[prop] = val[prop]
        }
      }
    })
    console.log('item', item)
  }
}
