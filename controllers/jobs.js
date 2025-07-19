const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError,BadRequestError} = require('../errors/index')


const getAllJobs = async(req,res)=>{
  res.send('get all jobs')
}

const getJobs = async(req,res)=>{
  res.send('get jobs')
}

const createJobs = async(req,res)=>{
  req.body.createdBy = req.user.userId
  const job= await Job.create(req.body)
  console.log(req.user.userId)
  res.status(StatusCodes.CREATED).json({job})
}

const updateJobs = async(req,res)=>{
  res.send('update jobs')
}

const deleteJobs = async(req,res)=>{
  res.send('delete jobs')
}

module.exports = {
  getAllJobs,
  getJobs,
  createJobs,
  updateJobs,
  deleteJobs
}