import { connectDB } from "../../../lib/db";
import Application from "../../../models/Application";
import Lead from "../../../models/Lead";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  body.referenceNo = uuidv4();
  const app = await Application.create(body);
  return new Response(JSON.stringify(app), { status: 201 });
}

export async function GET() {
  await connectDB();
  const apps = await Application.find().populate('lead');
  return new Response(JSON.stringify(apps), { status: 200 });
}
