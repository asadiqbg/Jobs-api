const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError,BadRequestError} = require('../errors/index')


const getAllJobs = async(req,res)=>{
  const allJobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
  res.status(StatusCodes.OK).json({allJobs})
}

const getJobs = async(req,res)=>{
  const {
    user:{userId},
    params:{id:jobId}
  } = req
  const job = await Job.findOne({_id:jobId,createdBy:userId})
  if(!job){
    throw new NotFoundError(`Job with id ${jobId} not found`)
  }

  res.status(StatusCodes.OK).json({job})
}

const createJobs = async(req,res)=>{
  req.body.createdBy = req.user.userId
  const job= await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}

const updateJobs = async(req,res)=>{
  const {
    body:{company,position},
    user:{userId},
    params:{id:jobId}
  } = req
  if(company === '' || position === ''){
    throw new BadRequestError('Company or position field should be provided')
  }
  const job = await Job.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({job})
}

const deleteJobs = async(req,res)=>{

  const {
    user:{userId},
    params:{id:jobId}
  } = req
  
  const job =  await Job.findOneAndDelete({_id:jobId,createdBy:userId})
  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()

}

module.exports = {
  getAllJobs,
  getJobs,
  createJobs,
  updateJobs,
  deleteJobs
}