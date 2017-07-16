// const crypto = require('crypto')

const jwt = require('jsonwebtoken')

const algorithm = 'aes-256-ctr'
const privateKey = '37LvDSm4XvjYOh9Y'
const issuer = 'ms-crm'
const audience = 'audience'

// Generate Unique Identifier for the access token
function genJti () {
  let jti = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 16; i++) {
    jti += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return jti
}

module.exports = {
  /*
  encrypt: password => {
    const cipher = crypto.createCipher(algorithm, privateKey)
    let crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex')

    return crypted
  },

  decrypt: password => {
    const decipher = crypto.createDecipher(algorithm, privateKey)
    let dec = decipher.update(password, 'hex', 'utf8')
    dec += decipher.final('utf8')

    return dec
  },
  */

  createIdToken: user => {
    delete user.password

    return jwt.sign(
      user,
      privateKey,
      { expiresIn: 60 * 60 * 5 }
    )
  },

  createAccessToken: () => {
    return jwt.sign({
      iss: issuer,
      aud: audience,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      scope: 'full_access',
      sub: 'lalaland|gonto',
      jti: genJti(), // unique identifier for the token
      alg: 'HS256'
    }, privateKey)
  },

  // Validate tokenAccess
  jwtCheck: () => {
    return expressJwt({
      secret: privateKey,
      issuer: issuer,
      audience: audience
    })
  },

  // Check for scope
  requireScope: scope => {
    return (req, res, next) => {
      const hasScopes = req.user.scope === scope

      if (!hasScopes) {
        res.sendStatus(401)

        return
      }

      next()
    }
  },

  issuer: issuer,
  audience: audience,
  privateKey: privateKey
}
