import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();

  const hashed = await bcrypt.hash("admin123", 10);

  const exists = await User.findOne({ email: "admin@example.com" });
  if (exists) return Response.json({ message: "Already exists" });

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashed,
    role: "admin",
  });

  return Response.json({ message: "Admin created", admin });
}
