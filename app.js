const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const path = require('path')

// const { jwtCheck, requireScope } = require('./auth')
const index = require('./routes/index')
const agencies = require('./routes/agencies')
const leads = require('./routes/leads')
const users = require('./routes/users')

const app = express()

/*
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}
*/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

// app.use('/agencies', jwtCheck, requireScope('full_access'))

app.use('/', index)
app.use('/agencies', agencies)
app.use('/leads', leads)
app.use('/users', users)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404

  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
