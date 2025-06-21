import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password, role } = await req.json(); // role bhi le rahe hain

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // ✅ Match selected role with DB-stored role
  if (user.role !== role) {
    return Response.json({ error: `You are not logged in as a ${role}` }, { status: 403 });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

  return Response.json({
    token,
    userId: user._id,
    role: user.role,
    name: user.name, 
  });
}
