import { connectDB } from '../../../../lib/db';
import Lead from '../../../../models/Lead';
import { NextResponse } from 'next/server';



// /app/api/lead-sources/route.js


export async function GET() {
  await connectDB();

  const sources = await Lead.aggregate([
    {
      $addFields: {
        firstMode: { $arrayElemAt: ["$followUps.mode", 0] }
      }
    },
    {
      $group: {
        _id: "$firstMode",
        count: { $sum: 1 },
        lastUpdated: { $max: "$updatedAt" }
      }
    },
    { $sort: { count: -1 } }
  ]);
  console.log(sources)

  const formatted = sources.map((s) => ({
    name: s._id || "Unknown",
    count: s.count,
    lastUpdated: s.lastUpdated,
    addedBy: "Edu Wire Overseas Consultant Pvt Ltd",
    isActive: true
  }));

  return NextResponse.json(formatted);
}
