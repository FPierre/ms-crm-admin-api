const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('Agencies list')
})

module.exports = router
