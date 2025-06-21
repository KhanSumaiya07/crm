import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";
import User from "../../../../models/User"; 

export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find()
 .populate('assignedTo', 'name') // only name from User model
  .populate('followUps');
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
