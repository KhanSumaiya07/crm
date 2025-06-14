import mongoose  from "mongoose";

const leadSchema = new mongoose.Schema({
  fullname: String,
  DOB: Date,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  email: String,
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
  },
  countryofresidence: String,
  highestQualification: String,
  passoutYear: Number,
  academicScore: Number, // or String if %/CGPA text is needed
  assignedCounsellor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);