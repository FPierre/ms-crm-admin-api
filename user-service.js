const cote = require('cote')
const responder = new cote.Responder({ name: 'user responder' })
// const subscriber = new cote.Subscriber({ name: 'user subscriber' })

// DB mocking
const users = [
  { id: 1, name: 'pierre', password: 'pierre' }
]

responder.on('login', ({ type, user }, cb) => {
  cb(users.find(u => u.name === user.name && user.password === user.password))
})

/*
subscriber.on('update user', update => {
  users.push(update.user)
  console.log(`received user ${update.user}`)
})
*/
