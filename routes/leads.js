const express = require('express')
const cote = require('cote')

const router = express.Router()

const requester = new cote.Requester({ name: 'lead requester', key: 'lead' })

router.get('', (req, res, next) => {
  requester.send({ type: 'index' })
    .then(leads => res.send(leads))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
  requester.send({ type: 'show', id: req.params.id })
    .then(lead => res.send(lead))
    .catch(err => console.log(err))
})

module.exports = router
