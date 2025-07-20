const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, Please try again later'
  }

  if(err.code || err.code === 11000){
    customError.msg = `Duplicate value provided for ${Object.keys(err.keyValue)} field, please provide other value`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware
