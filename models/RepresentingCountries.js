// models/RepresentingCountry.js
import mongoose from "mongoose";

const representingCountrySchema = new mongoose.Schema({
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  monthlyLivingCost: {
    type: String,
    required: true,
  },
  visaRequirements: {
    type: String,
    required: true,
  },
  partTimeWorkDetails: {
    type: String,
    required: true,
  },
  countryBenefits: {
    type: String,
    required: true,
  },
  applicationProcess: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RepresentingCountries || mongoose.model("RepresentingCountries", representingCountrySchema);