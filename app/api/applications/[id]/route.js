import { connectDB } from "../../../../lib/db";
import Application from "../../../../models/Application";
import Lead from "../../../../models/Lead";

export async function GET(req, { params }) {
  await connectDB();
  const app = await Application.findById(params.id).populate('lead');
  if (!app) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(app), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Application.findByIdAndUpdate(params.id, body, { new: true }).populate('lead');
  return new Response(JSON.stringify(updated), { status: 200 });
}
