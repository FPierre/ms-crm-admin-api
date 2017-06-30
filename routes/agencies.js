const express = require('express')
const cote = require('cote')
const router = express.Router()

const requester = new cote.Requester({ name: 'agency requester', key: 'agency' })

router.get('', (req, res, next) => {
  requester.send({ type: 'index' }, agencies => {
    res.send(agencies)
  })
})

router.post('/create', (req, res, next) => {
  requester.send({ type: 'create', agency: req.body.agency }, agency => {
    res.send(agency)
  })
})

router.post('/update', (req, res, next) => {
  requester.send({ type: 'update', agency: req.body.agency }, agency => res.send(agency))
})

router.post('/delete', (req, res, next) => {
  requester.send({ type: 'delete', agency: req.body.agency }, agency => res.send(agency))
})

module.exports = router
