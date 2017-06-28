const express = require('express')
const cote = require('cote')
const router = express.Router()

const requester = new cote.Requester({ name: 'user requester' })

router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/login', (req, res, next) => {
  requester.send({ type: 'login', user: req.body.user }, user => {
    console.log('user connected')
    res.send(user)
  })
})

module.exports = router
