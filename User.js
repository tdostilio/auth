const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

UserSchema.statics.createUser = async function(params) {
  if (!params.email || !params.password) {
    throw new Error('Missing required params')
  }
  let user
  try {
    let password = await bcrypt.hash(params.password, 10)
    user = new User({
      email: params.email,
      password,
    })
    await user.save()
  } catch (err) {
    throw err
  }
  return user
}

UserSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw new Error('missing required params')
  }
  let user
  try {
    user = await User.findOne({
      email: email,
    })
    if (!user) {
      throw new Error('No user found')
    }
    const match = await bcrypt.compare(password, user.password)
    //TODO - add session stuff
    return match
  } catch (err) {
    throw new Error('Unable to verify user')
  }
}
const User = mongoose.model('User', UserSchema)

module.exports = User
