const path = require('path')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const expressJwt = require('express-jwt')

const { jwtCheck, requireScope } = require('./auth')
const index = require('./routes/index')
const agencies = require('./routes/agencies')
const leads = require('./routes/leads')
const users = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  next()
})

// app.use('/agencies', jwtCheck, requireScope('full_access'))

// Routes
app.use('/', index)
app.use('/agencies', agencies)
app.use('/leads', leads)
app.use('/users', users)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404

  next(err)
})

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
