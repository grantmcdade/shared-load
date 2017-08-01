const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.recordUser = functions.auth.user().onCreate(event => {
  // Save the new user's info
  const user = event.data
  const userInfo = {
    uid: user.uid,
    name: user.name || '',
    email: user.email,
    displayname: user.displayname || ''
  }

  const ref = admin.database().ref(`/users/${user.uid}`)
  return ref.set(userInfo)
})

// exports.userAddGroup = functions.database.ref('/group_users/{groupId}/{userId}').onWrite(event => {
//   const user = event.data.val()
//   console.log('Received: ', event)
//   if (user) {
//     // User was added
//     const ref = event.data.ref.root.child(`/users/${user.uid}/group_memberships`)
//     return ref.push(event.params.groupId)
//       .then(resolve => {
//         console.log('Done!')
//         resolve()
//       })
//   } else {
//     // User was removed
//     const oldUser = event.data.previous.val()
//     console.log('Removing membership for...', oldUser)
//     const ref = event.data.ref.root.child(`/users/${oldUser.uid}/group_memberships`)
//     ref.once('value', snap => {
//       const groupMemberships = snap.val()
//       for (var key in groupMemberships) {
//         if (groupMemberships.hasOwnProperty(key)) {
//           var groupId = groupMemberships[key]
//           console.log('Processing...', key, ' with group id ', groupId)
//           if (groupId === event.params.groupId) {
//             console.log('Removing...', key)
//             return ref.child(key).remove()
//               .then(resolve => {
//                 console.log('Done!')
//                 resolve()
//               })
//           }
//         }
//       }
//     })
//   }
// })

// exports.groupCreated = functions.database.ref('/users/{uid}/my_groups/{groupId}').onCreate(event => {
//   console.log(event)
//   // TODO: Add the current user as a group user
// })
