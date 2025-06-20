import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { name, email, password, role, phone, whatsapp } = await req.json();

  if (role !== "counsellor") {
    return Response.json({ error: "Only counsellor creation allowed" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return Response.json({ error: "Email already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    phone,
    whatsapp,
  });
  console.log("Received body =>", { name, email, password, role, phone, whatsapp });

  return Response.json({
    message: "Counsellor created successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    whatsapp: user.whatsapp,
  }
);

  

}
