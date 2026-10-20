import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db"
import DelAppointment from "./appointment";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // -------------- This didn't worked as fetch work only in client comp--------
  // intead use direct postgres query as this is a server component or an absoulte url.

  // const response = await fetch("/api/appointments", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "Application/json"
  //   }
  // });

  // __________ going with the psql query_________
  const query = `SELECT id, title, description, appointment_date, created_at FROM appointments where user_id = $1 ORDER BY appointment_date ASC;`;

  const DBresult = await pool.query(query, [session.user.id]);
  const bookedAppointments = DBresult.rows
  console.log("Booked Appointments:\n", bookedAppointments);

  return (
    <main>
      <h1>My Appointments</h1>

      {bookedAppointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        bookedAppointments.map((appointment) => (
          <article key={appointment.id}>
            <h2>{appointment.title}</h2>
            <p>{appointment.description || "No description"}</p>
            <p>{new Date(appointment.appointment_date).toLocaleString()}</p>
            <DelAppointment id={appointment.id}/>
          </article>
        ))
      )}
    </main>
  );
};

export default page;
