import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // add more fields if needed
});

export default mongoose.models.Country || mongoose.model("Country", countrySchema);
