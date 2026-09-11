import { pool } from "@/lib/db";

export async function GET() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const result = await pool.query("SELECT NOW()");

  return Response.json({
    success: true,
    data: result.rows[0],
  });
}
