// app/api/counsellor/list/route.js
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET() {
  await connectDB();

  const counsellors = await User.find({ role: "counsellor" }).select("-password");

  return Response.json(counsellors);
}
