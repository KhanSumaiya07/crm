import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id: userId, role } = decoded;

    let leads;
    if (role === "admin") {
      leads = await Lead.find().populate("assignedTo", "name");
    } else if (role === "counsellor") {
      leads = await Lead.find({ assignedTo: userId }).populate("assignedTo", "name");
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(leads, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
