import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";
import sendEmail from "../../../../lib/sendEmail";
import sendWhatsApp from "../../../../lib/sendWhatsapp";
import renderTemplate from "../../../utils/renderTemplate";

export async function POST(req) {
  await connectDB();

  const { leadIds, subject, messageTemplate } = await req.json();

  if (!Array.isArray(leadIds) || !messageTemplate || !subject) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
  }

  const leads = await Lead.find({ _id: { $in: leadIds } });

  for (const lead of leads) {
    console.log("Sending to lead:", lead);

    const finalMessage = renderTemplate(messageTemplate, lead);

    if (lead.email) {
      try {
        await sendEmail(lead.email, subject, finalMessage);
      } catch (err) {
        console.error(`❌ Failed to send email to ${lead.email}:`, err);
      }
    } else {
      console.warn(`⚠️ Skipped email: no email for lead ${lead.fullname}`);
    }

    if (lead.phone) {
      await sendWhatsApp(lead.phone, finalMessage);
    } else {
      console.warn(`⚠️ Skipped WhatsApp: no phone for lead ${lead.fullname}`);
    }
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
