import { connectDB } from "../../../../lib/db";
import Lead from "../../../../models/Lead";
import sendEmail from "../../../../lib/sendEmail";
import sendWhatsApp from "../../../../lib/sendWhatsapp";
import renderTemplate from "../../../utils/renderTemplate";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();

  const token = req.headers.get("cookie")?.split(';').find(c => c.trim().startsWith("token="))?.split("=")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }

  const { leadIds, subject, messageTemplate } = await req.json();

  if (!Array.isArray(leadIds) || !messageTemplate || !subject) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
  }

  // 🔒 Counsellor Access Check
  let leads = [];
  if (decoded.role === "admin") {
    leads = await Lead.find({ _id: { $in: leadIds } });
  } else if (decoded.role === "counsellor") {
    leads = await Lead.find({ _id: { $in: leadIds }, assignedTo: decoded.id });
    if (leads.length !== leadIds.length) {
      return new Response(JSON.stringify({ error: "Some selected leads are not assigned to you" }), { status: 403 });
    }
  }

  for (const lead of leads) {
    const templateData = {
      ...lead.toObject(),
      name: lead.fullname,
      consultancy_name: "Eduwire",
    };

    const finalMessage = renderTemplate(messageTemplate, templateData);

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
