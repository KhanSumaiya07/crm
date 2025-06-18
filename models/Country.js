import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  flag: { type: String, required: true }, // URL or base64 of flag image
  // add more fields if needed
});

export default mongoose.models.Country || mongoose.model("Country", countrySchema);
