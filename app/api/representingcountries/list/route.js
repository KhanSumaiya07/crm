import { connectDB } from "../../../../lib/db";
import RepresentingCountry from "../../../../models/RepresentingCountries";
import Country from "../../../../models/Country";

export async function GET() {
  try {
    await connectDB();

    const countries = await RepresentingCountry.find()
      .populate("country", "name")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(countries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching representing countries:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
