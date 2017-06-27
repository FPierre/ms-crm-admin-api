const cote = require('cote')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const requester = new cote.Requester({ name: 'user requester' })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  next()
})

app.post('/login', (req, res) => {
  requester.send({ type: 'login', user: req.body.user }, user => {
    console.log('user connected')
    console.log(user)
    res.send(user)
  })
})

app.listen(4000)
