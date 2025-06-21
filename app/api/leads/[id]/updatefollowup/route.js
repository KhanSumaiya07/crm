// app/api/leads/[id]/updatefollowup/route.js

import { connectDB } from "../../../../../lib/db";
import Lead from "../../../../../models/Lead";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const id = params.id;
  await connectDB();

  try {
    const body = await req.json();
    const { followUpId, updatedData } = body;

    const lead = await Lead.findById(id);
    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    const followUp = lead.followUps.id(followUpId);
    if (!followUp) {
      return NextResponse.json({ message: "Follow-up not found" }, { status: 404 });
    }

    Object.keys(updatedData).forEach((key) => {
      followUp[key] = updatedData[key];
    });

    lead.markModified("followUps");
    await lead.save();

    return NextResponse.json(lead, { status: 200 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ message: "Server Error", error: err.message }, { status: 500 });
  }
}
