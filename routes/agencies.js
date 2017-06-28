const express = require('express')
const cote = require('cote')
const router = express.Router()

const requester = new cote.Requester({ name: 'agency requester' })

router.get('', (req, res, next) => {
  requester.send({ type: 'index' }, agencies => {
    console.log('agencies list')
    res.send(agencies)
  })
})

module.exports = router
