// app/api/countries/route.js
import { connectDB } from "../../../lib/db";
import Country from "../../../models/Country";

export async function GET() {
  try {
    await connectDB();
    const countries = await Country.find().sort({ name: 1 });
    return Response.json(countries);
  } catch (err) {
    console.error("Error fetching countries:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch countries" }), { status: 500 });
  }
}
