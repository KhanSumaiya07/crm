import mongoose from 'mongoose'





const leadSchema = new mongoose.Schema({
   fullname :{
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/
    },
    DOB:{
        type: Date
        
    },
    gender:{
        type: String,
        enum:['Male','Female','Other'],
        
    },
    countryofresidence:{
        type: String,
        
    },
    preferencecountry:{
        type: String,
        required: true
    },
    prefferredcourse:{
        type: String,
        
    },
    intake:{
        type: String,
        
        
    },
    percentage:String,
    qualification:{
        type: String,
    
    },
    score:{
        type: Number,
        
        default: 'None'
    },
    budget:{
        type: String,
        
    },
    passOutyear:{
        type : String
    },

 editRequest: {
  type: String,
  default: '',
},

   

   
    source:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['New', 'In Process', 'Future Lead', 'Completed', 'Not responding','Failed'],
        default: 'New'
    },
    leaddate:{
        type: Date,
        default: Date.now
    },

   assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null
},
counsellorname: {
  type: String,  // can be optional if you use assignedTo ref
}
,
  remarks: {
    type: String,
  },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);