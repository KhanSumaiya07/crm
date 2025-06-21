import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";

export async function GET(req, { params }) {
  await connectDB();
  const lead = await Lead.findById(params.id);
  if (!lead) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(lead), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    console.log("Incoming PUT body", body);
      console.log("params.id:", params.id) 

   const updatedLead = await Lead.findByIdAndUpdate(
  params.id,
  { $set: body }, // ✅ wrap in $set
  { new: true, runValidators: true }
);


    if (!updatedLead) {
      return new Response("Lead not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedLead), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Update Error:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return new Response(JSON.stringify({ error: "Lead not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Lead deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete lead error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete lead" }), {
      status: 500,
    });
  }
}

