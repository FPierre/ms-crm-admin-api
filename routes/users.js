const express = require('express')
const cote = require('cote')
const router = express.Router()

const requester = new cote.Requester({ name: 'user requester', key: 'user' })

router.get('', (req, res, next) => {
  requester.send({ type: 'index' }, (err, users) => res.send(users))
})

router.post('/login', (req, res, next) => {
  requester.send({ type: 'login', user: req.body.user }, user => res.send(user))
})

module.exports = router
