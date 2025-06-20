// api/leads/assign/route.js
import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";

export async function POST(req) {
  await connectDB();
  const { leadIds, counsellorId } = await req.json();

  if (!Array.isArray(leadIds) || leadIds.length === 0) {
    return Response.json({ error: "No leads provided" }, { status: 400 });
  }

  const updatedLeads = await Promise.all(
    leadIds.map((leadId) =>
      Lead.findByIdAndUpdate(
        leadId,
        {
          assignedTo: counsellorId,
          assignDate: new Date(), // ✅ set assign date to current time
        },
        { new: true }
      )
    )
  );

  return Response.json({ message: "Leads assigned", updatedLeads });
}
