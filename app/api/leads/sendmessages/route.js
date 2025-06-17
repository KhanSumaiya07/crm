import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";
import sendEmail from "../../../../lib/sendEmail"; // custom utility
import sendWhatsApp from "../../../../lib/sendWhatsapp"; // custom utility

export async function POST(req) {
  await connectDB();
  const { leadIds, messageTemplate } = await req.json();

  if (!Array.isArray(leadIds) || !messageTemplate) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
  }

  const leads = await Lead.find({ _id: { $in: leadIds } });

  for (const lead of leads) {
    if (lead.email) await sendEmail(lead.email, messageTemplate);
    if (lead.phone) await sendWhatsApp(lead.phone, messageTemplate);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
