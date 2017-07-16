const express = require('express')
const cote = require('cote')
// const jwt = require('jsonwebtoken')
// const expressJwt = require('express-jwt')
const { createIdToken, createAccessToken, privateKey } = require('../auth')

const router = express.Router()

const requester = new cote.Requester({ name: 'user requester', key: 'user' })

router.get('', (req, res, next) => {
  requester.send({ type: 'index' }, (err, users) => {
    res.send(users)
  })
})

router.get('/:id', (req, res, next) => {
  requester.send({ type: 'show', id: req.params.id })
    .then(user => res.send(user))
    .catch(err => console.log(err))
})

router.post('', (req, res, next) => {
  console.log('create')
  console.log(req.body.user)

  const user = req.body.user

  requester.send({ type: 'create', user: user })
    .then(user => {
      // console.log(user)

      res.send({
        tokenId: createIdToken(user),
        tokenAccess: createAccessToken()
      })
    })
    .catch(err => console.log(err))

  /* WORKS
  const user = req.body.user

  user.password = encrypt(user.password)

  requester.send({ type: 'create', user: user })
    .then(user => {
      // console.log(user)

      const tokenData = {
        email: user.email,
        id: user._id
      }

      res.send(jwt.sign(tokenData, privateKey))
    })
    .catch(err => console.log(err))
  */
})

router.post('/login', (req, res, next) => {
  console.log('login')
  console.log(req.body.credentials)

  requester.send({ type: 'login', email: req.body.credentials.email })
    .then(user => {
      //if (req.body.credentials.password === decrypt(user.password)) {
        // if (!user.isVerified)

        res.status(201).send({
          tokenId: createIdToken(user),
          tokenAccess: createAccessToken()
        })
      //}
    })
    .catch(err => console.log(err))

  /* WORKS
  requester.send({ type: 'login', email: req.body.credentials.email })
    .then(user => {
      if (req.body.credentials.password === decrypt(user.password)) {
        // if (!user.isVerified)
        const tokenData = {
          email: user.email,
          scope: [user.scope],
          id: user._id
        }

        res.send({
          email: user.email,
          scope: user.scope,
          token: jwt.sign(tokenData, privateKey)
        })
      }
    })
    .catch(err => console.log(err))
    */
})

module.exports = router
