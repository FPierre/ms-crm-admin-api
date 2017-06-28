const express = require('express')
const router = express.Router()
const cote = require('cote')

const requester = new cote.Requester({ name: 'user requester' })

// GET users listing
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

app.post('/login', (req, res, next) => {
  requester.send({ type: 'login', user: req.body.user }, user => {
    console.log('user connected')
    res.send(user)
  })
})

module.exports = router
