const cote = require('cote')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const requester = new cote.Requester({ name: 'user login requester', key: 'login' })

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  next()
})

app.post('/', (req, res) => requester.send({ type: 'login', user: req.body }, user => {
  console.log('user connected')
  res.send('ok')
}))

app.listen(4000, () => console.log('user-admin port 4000'))
