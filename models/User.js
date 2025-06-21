import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['admin', 'counsellor'],
    required: true,
  },

  phone: {
    type: String,
    
  },

  whatsapp: {
    type: String,
   
  }
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
