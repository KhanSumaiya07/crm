// /api/leads/random-assign/route.js

import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";
import User from "../../../../models/User";

export async function POST(req) {
  await connectDB();
  const { leadIds } = await req.json();

  if (!Array.isArray(leadIds) || leadIds.length === 0) {
    return Response.json({ error: "No leads provided" }, { status: 400 });
  }

  // ✅ Fetch all counsellors
  const counsellors = await User.find({ role: "counsellor" });

  if (counsellors.length === 0) {
    return Response.json({ error: "No counsellors found" }, { status: 404 });
  }

  const updatedLeads = [];

  for (let i = 0; i < leadIds.length; i++) {
    const leadId = leadIds[i];
    const randomCounsellor = counsellors[i % counsellors.length]; // 👈 fair round-robin distribution

    const updated = await Lead.findByIdAndUpdate(
      leadId,
      {
        assignedTo: randomCounsellor._id,
        assignDate: new Date(), // ✅ save current timestamp
      },
      { new: true }
    );

    updatedLeads.push(updated);
  }

  return Response.json({ message: "Random assignment done", updatedLeads });
}
