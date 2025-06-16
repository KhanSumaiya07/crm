import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";

export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find(); // Fetch all leads

    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error fetching leads:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch leads" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
