import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { pool } from "@/lib/db";
import { ApiResponse } from "@/lib/api-res";
import { apiHandler } from "@/lib/api-handler";
import { ApiError } from "@/lib/api-error";
import { handleApiError } from "@/lib/api-error-handler";
import { createAppointmentSchema } from "@/lib/validators/appointment";

export const POST = apiHandler(async (req: Request) => {
  //get the loggedIn user session;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new ApiError(401, "Unauthorized");
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

  const values = [session.user.id, title, description ?? null, appointmentDate];

  const dbResult = await pool.query(query, values);
  console.log(dbResult);

  return Response.json(
    new ApiResponse(201, dbResult.rows[0], "Appointment booked successfully"),
  );
});

export const GET = apiHandler(async(req: Request)=>{
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session){
    throw new ApiError(401, "Unauthorized");
  }

  const query = `
  select id, user_id, title, description, appointment_date, created_at from appointments where user_id = $1 order by appointment_date ASC;
  `;

  const result = await pool.query(query, [session.user.id]);
  return Response.json(
    new ApiResponse(200, result.rows, "Aappointment fetched successfully")
  )
})