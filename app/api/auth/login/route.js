// import { connectDB } from "@/lib/db";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
// import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

  // ✅ Send token, userId, and role
  return Response.json({
    token,
    userId: user._id,
    role: user.role
  });
}
