const getAllJobs = async(req,res)=>{
  res.send('get all jobs')
}

const getJobs = async(req,res)=>{
  res.send('get jobs')
}

const createJobs = async(req,res)=>{
  res.json(req.user)
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