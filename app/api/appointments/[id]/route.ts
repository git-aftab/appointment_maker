import { pool } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { apiHandler } from "@/lib/api-handler";
import { ApiError } from "@/lib/api-error";
import { ApiResponse } from "@/lib/api-res";

export const DELETE = apiHandler(
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ApiError(401, "Unathorized");
    }

    const { id } = await params;
    const appointmentId = Number(id);

    if (!Number.isSafeInteger(appointmentId) || appointmentId <= 0) {
      throw new ApiError(400, "Invalid Appointment ID");
    }

    const query = `delete from appointments where id = $1 and user_id = $2 returning id;`;
    const result = await pool.query(query, [appointmentId, session.user.id]);

    if (result.rowCount === 0) {
      throw new ApiError(404, "Appointment not found");
    }

    return Response.json(
      new ApiResponse(
        200,
        { id: result.rows[0].id },
        "Appointment deleted successfully.",
      ),
    );
  },
);
