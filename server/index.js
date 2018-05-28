import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
import session from 'express-session'
import ConnectRedis from 'connect-redis'

import api from './api'

const app = express()
app.use(bodyParser.json())

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const RedisStore = ConnectRedis(session)
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

app.set('port', port)

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  // maxAge: 36000,
  cookie: { maxAge: 36000000 },
  store: new RedisStore({url: redisUrl})
}))

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
