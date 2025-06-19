import { connectDB } from "../../../../lib/db";
import Application from "../../../../models/Application";

export async function GET() {
  try {
    await connectDB();

    const application = await Application.find().populate("lead", "fullname email phone");

    return new Response(JSON.stringify(application), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error fetching applications:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch applications" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
