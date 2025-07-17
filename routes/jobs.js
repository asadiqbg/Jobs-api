const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJobs,
  createJobs,
  updateJobs,
  deleteJobs
} = require('../controllers/jobs.js')

module.exports = router


