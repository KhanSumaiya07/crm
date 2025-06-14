import mongoose from 'mongoose';

const followUpSchema = new mongoose.Schema({
  leadType: {
    type: String,
    enum: ['Hot', 'Warm', 'Cold'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Store as string (e.g., '14:30')
    required: true,
  },
  mode: {
    type: String,
    enum: ['Call', 'Email', 'WhatsApp', 'In-Person'],
    required: true,
  },
  remark: {
    type: String,
    required: true,
  }
}, { _id: false });

const leadSchema = new mongoose.Schema({
  fullname: {
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
  DOB: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  countryofresidence: {
    type: String
  },
  preferencecountry: {
    type: String,
    required: true
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
    type: Number,
    default: 'None'
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
  source: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'In Process', 'Future Lead', 'Completed', 'Not responding', 'Failed'],
    default: 'New'
  },
  leaddate: {
    type: Date,
    default: Date.now
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  counsellorname: {
    type: String
  },
  remarks: {
    type: String
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
