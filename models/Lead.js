import mongoose from 'mongoose';

const followUpSchema = new mongoose.Schema({
  leadType: {
    type: String,
    
  },
  date: {
    type: Date,
    
  },
  time: {
    type: String, // Store as string (e.g., '14:30')
    
  },
  mode: {
    type: String,
    
    
  },
  status: {
    type: String,
    enum: ['New', 'In Process', 'Future Lead', 'Completed', 'Not responding', 'Failed'],
    default: 'New'
  },
  remark: {
    type: String,
    
  }
}, { timestamps: true });

const leadSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    
    match: /.+\@.+\..+/
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },
  DOB: {
    type: Date
  },
  gender: {
    type: String,
  },
  countryofresidence: {
    type: String
  },
  preferencecountry: {
    type: String,
    
  },
  prefferredcourse: {
    type: String
  },
  intake: {
    type: String
  },
  percentage: String,
  qualification: {
    type: String
  },
  score: {
    type: String,
  },
  budget: {
    type: String
  },
  passOutyear: {
    type: String
  },
  editRequest: {
    type: String,
    default: ''
  },
 
  
  leaddate: {
    type: Date,
    default: Date.now
  },
 
  
  followUps: [followUpSchema], // 🆕 Added follow-up details here
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {

    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);
