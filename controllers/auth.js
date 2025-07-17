const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index')
const jwt = require('jsonwebtoken')

const register =  async(req,res)=>{
  const user = await User.create({...req.body})
  console.log('user created')
  const token = jwt.sign({userId:user._id, name:user.name},'jwtsecret')
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

const login = async(req,res)=>{
  res.send('login')
}

module.exports = {
  register,
  login
}