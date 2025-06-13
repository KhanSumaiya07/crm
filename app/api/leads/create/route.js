import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  try {
    const lead = await Lead.create(data);
    return Response.json(lead);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}