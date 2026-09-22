import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { pool } from "@/lib/db";
import { ApiResponse } from "@/lib/api-res";
import { ApiError } from "@/lib/api-error";
import { handleApiError } from "@/lib/api-error-handler";
import { createAppointmentSchema } from "@/lib/validators/appointment";

export async function POST(req: Request) {
  try {
    //get the loggedIn user session;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ApiError(401, "Unauthorized!");
    }

    const body: unknown = await req.json();

    const result = createAppointmentSchema.safeParse(body);

    if (!result.success) {
      throw new ApiError(
        400,
        "Invalid appointment data",
        result.error.issues.map((issue) => issue.message),
      );
    }

    const { title, appointmentDate, description } = result.data;

    const query = `
    Insert into appointments(
    user_id,
    title,
    description,
    appointment_date
    )
    Values($1, $2, $3, $4)
    Returning
    id,
    user_id,
    title,
    description,
    appointment_date,
    created_at;
    `;
  } catch (error) {}
}
