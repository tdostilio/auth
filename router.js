const express = require('express')
const router = express.Router()
const User = require('./User').schema

router.post('/register', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send(500)
  }
  let user
  try {
    let params = {
      email: req.body.email,
      password: req.body.password,
    }
    user = await User.statics.createUser(params)
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    })
  }
  res.send(user)
})

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(500).send({
      message: 'Email and password are required',
    })
  }
  let verified
  try {
    verified = await User.statics.login(req.body.email, req.body.password)
    if (verified) {
      res.send(verified)
    } else {
      res.status(401).send({
        message: 'Unauthorized',
      })
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    })
  }
})

module.exports = router
