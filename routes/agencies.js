const express = require('express')
const cote = require('cote')

const router = express.Router()

const requester = new cote.Requester({ name: 'agency requester', key: 'agency' })
const userRequester = new cote.Requester({ name: 'user requester', key: 'user' })

router.get('', (req, res, next) => {
  const promises = []

  requester.send({ type: 'index', page: req.query.page, limit: 1 })
    .then(paginatedAgencies => {
      for (const agency of paginatedAgencies.docs) {
        const promise = userRequester.send({ type: 'show', id: agency._responsibleId })
          .then(user => agency['responsible'] = user)
          .catch(err => console.log(err))

        promises.push(promise)
      }

      Promise.all(promises)
        .then(() => res.send(paginatedAgencies))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
  requester.send({ type: 'show', id: req.params.id })
    .then(agency => res.send(agency))
    .catch(err => console.log(err))
})

router.post('', (req, res, next) => {
  requester.send({ type: 'create', agency: req.body.agency, user: req.body.user })
    .then(agency => res.send(agency))
    .catch(err => console.log(err))
})

router.patch('', (req, res, next) => {
  requester.send({ type: 'update', agency: req.body.agency })
    .then(agency => res.send(agency))
    .catch(err => console.log(err))
})

router.delete('', (req, res, next) => {
  requester.send({ type: 'delete', agency: req.body.agency })
    .then(agency => res.send(agency))
})

module.exports = router
