import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

export async function POST(req) {
  await connectDB();
  const { leadId, counsellorId } = await req.json();
  const updated = await Lead.findByIdAndUpdate(leadId, { assignedTo: counsellorId });
  return Response.json(updated);
}