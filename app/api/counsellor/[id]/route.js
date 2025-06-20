import { connectDB } from '../../../../lib/db';
import User from '../../../../models/User';



export async function GET(req, { params }) {
  await connectDB();
  const user = await User.findById(params.id);

  if (!user || user.role !== 'counsellor') {
    return Response.json({ error: 'Counsellor not found' }, { status: 404 });
  }

  return Response.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    whatsapp: user.whatsapp,
    role: user.role,
  });
}
export async function PUT(req, { params }) {
  await connectDB();
  const { name, email, phone, whatsapp } = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { name, email, phone, whatsapp },
    { new: true }
  );

  if (!updatedUser) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json(updatedUser);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const deletedUser = await User.findByIdAndDelete(params.id);

  if (!deletedUser) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({ message: 'User deleted successfully' });
}
