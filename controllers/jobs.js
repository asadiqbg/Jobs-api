const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError,BadRequestError} = require('../errors/index')


const getAllJobs = async(req,res)=>{
  const {userId} = req.user
  const {
    page = 1,
    limit = 10,
    sort= '-createdAt',
    search = '',
    status,
    company = '',
    position = '',
  } = req.query

  const queryObject = {createdBy:userId}
  //General search functionality
  if(search){
    queryObject.$or= [
      {position:{$regex:search,$options:'i'}},
      {company:{$regex:search,$options:'i'}}
    ]
  }

  if (status && status!=='all'){
    queryObject.status = status

  }
  //company and postition filter
  if(company && company!=='all'){
    queryObject.company = company
  }
  if(position && position !== 'all'){
    queryObject.position = position
  }
  let result = Job.find(queryObject)
  //Handle Sorting
  if(sort){
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }
    // Pagination calculations
  const pageNum = Number(page)
  const limitNum = Number(limit)
  const skip = (pageNum - 1) * limitNum
  
  // Apply pagination
  result = result.skip(skip).limit(limitNum)
  
  // Execute query
  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limitNum);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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