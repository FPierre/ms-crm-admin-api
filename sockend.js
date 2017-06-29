const cote = require('cote')
const app = require('http').createServer(handler)
const io = require('socket.io').listen(app)

app.listen(5555)

function handler () {
  console.log('handler')
}

const sockend = new cote.Sockend(io, { name: 'Sockend' })
