const cote = require('cote')
const responder = new cote.Responder({ name: 'user responder' })
// DB mocking
const users = [
  { id: 1, name: 'Pierre' }
]

responder.on('user', (req, cb) => {
  const user = users.find(u => u.id === req.id)
  cb(user)
})
