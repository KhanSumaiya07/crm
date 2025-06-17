import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";

export async function GET(req, { params }) {
  await connectDB();
  const lead = await Lead.findById(params.id);
  if (!lead) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(lead), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updatedLead = await Lead.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return new Response(JSON.stringify(updatedLead), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
