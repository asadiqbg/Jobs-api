const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company:{
    type:String,
    required: [true,'Please provide company name'],
    maxlength: 20
  },

  position:{
    type:String,
    required: [true,'Please provide position'],
    maxlength: 20
  },
  status:{
    type:String,
    enum:[
      'interview','pending','rejected'
    ]

  },

  createdBy:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true,'Please provide User'],
  },

},
  {timestamps: true}
)

module.exports = mongoose.model('Job',JobSchema)