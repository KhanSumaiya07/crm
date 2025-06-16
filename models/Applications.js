import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  referenceNo: { type: String, unique: true },
  passportDetails: {
    number: String,
    issueDate: Date,
    expiryDate: Date,
    valid: Boolean,
  },
  address: {
    permanent: {
      address: String, city: String, state: String, zip: String, country: String
    },
    correspondence: {
      address: String, city: String, state: String, zip: String, country: String
    }
  },
  feeDetails: {
    scholarship: String,
    proof: String,
    tuitionFee: Number,
    paidAmount: Number,
    dueFirstYear: Number,
    totalFee: Number,
    paymentMethod: String,
    paymentReference: String,
    paymentDate: Date
  },
  courseDetails: [{
    country: String,
    institute: String,
    course: String,
    intakeMonth: String,
    intakeYear: String,
    applicationFee: Number,
    currency: String,
    paymentMethod: String,
    paymentReference: String,
    paymentDate: Date,
    remarks: String
  }]
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model("Application", applicationSchema);