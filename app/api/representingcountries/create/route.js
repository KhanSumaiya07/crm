// app/api/representing-countries/create/route.js
import { connectDB } from "../../../../lib/db";
import RepresentingCountry from "../../../../models/RepresentingCountries";
import { getTokenFromHeader, verifyToken } from "../../../utils/auth"; // custom middleware

export async function POST(req) {
  await connectDB();

  const token = getTokenFromHeader(req);
  const user = verifyToken(token);
  if (user?.role !== "admin") {
    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  const {
    country,
    monthlyLivingCost,
    visaRequirements,
    partTimeWorkDetails,
    countryBenefits,
    applicationProcess,
    status,
  } = await req.json();

  const data = await RepresentingCountry.create({
    country,
    monthlyLivingCost,
    visaRequirements,
    partTimeWorkDetails,
    countryBenefits,
    applicationProcess,
    status,
  });

  return Response.json(data);
}
