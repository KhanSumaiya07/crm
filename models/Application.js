import mongoose from 'mongoose';
import sendEmail from '../lib/sendEmail'; // adjust path if needed
import Lead from './Lead.js'; // adjust path if needed

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
  }],
  status: {
  type: String,
  enum: [
    'New Lead',
    'Application Submitted',
    'Documents Pending',
    'Fee Paid',
    'Visa Applied',
    'Completed',
    'Rejected'
  ],
  default: 'New Lead',
}

}, { timestamps: true });
applicationSchema.pre('save', async function (next) {
  if (!this.isModified('status')) return next();
  this._statusChanged = true;
  next();
});

applicationSchema.post('save', async function (doc) {
  if (doc._statusChanged) {
    const populated = await doc.populate('lead');
    const email = populated.lead.email;
    const name = populated.lead.fullname || 'Applicant';
    const status = doc.status;
    const referenceNo = doc.referenceNo;

    if (email) {
      const subject = `Your application status has changed to: ${status}`;
      const message = `Hi ${name},\n\nYour application (Ref: ${referenceNo}) status has been updated to "${status}".\n\nThank you,\nEduwire Team`;

      try {
        await sendEmail(email, subject, message);
        console.log(`✅ Status update email sent to ${email}`);
      } catch (err) {
        console.error(`❌ Failed to send status update email to ${email}:`, err);
      }
    }
  }
});

export default mongoose.models.Application || mongoose.model("Application", applicationSchema);