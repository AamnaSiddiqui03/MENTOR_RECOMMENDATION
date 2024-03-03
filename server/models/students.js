const mongoose = require('mongoose');

const studentdetailsschema = new mongoose.Schema({ 

      userid:{
        type:String,
        required:true
      },
      name: {
        type: String,
        required: true
      },
      interests: {
        type: String,
        required: true
      },
      educationalInstitute: {
        type: String,
        required: true
      },
      WorkingOn:{
        type:String
      },
      isMentor:{
        type:Boolean,
        required:true
      }
})

const student= mongoose.model('studentdet',  studentdetailsschema);

module.exports =student;