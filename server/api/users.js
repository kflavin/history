import { Router } from 'express'

const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

router.post('/set_user', function (req, res, next) {
  console.log('/set_user')
  console.log(req.body)
  console.log(Object.keys(req.body).length)
  if (req.body === {}) {
    console.log('empty object')
    req.session.user = null
  } else {
    console.log('object not empty')
    req.session.user = req.body
  }
  req.session.user = req.body

  // req.session.user = req.body === {} ? null : req.body
  return res.json(req.body)
})

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
