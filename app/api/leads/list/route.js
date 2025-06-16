// app/api/counsellor/list/route.js
import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";

export async function GET() {
  await connectDB();

  const leads = await Lead.find();

  return Response.json(leads);
}
