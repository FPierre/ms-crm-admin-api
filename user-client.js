const cote = require('cote')
const requester = new cote.Requester({ name: 'user requester' })
const request = { type: 'user', id: 1 }

requester.send(request, res => console.log(res))
