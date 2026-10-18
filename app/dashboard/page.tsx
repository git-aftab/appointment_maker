import { headers } from "next/headers";
import Link  from "next/link";
import { auth } from "@/lib/auth";
import {redirect} from "next/navigation"

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <h1>Welcome, {session.user.email}</h1>
      <h1>Welcome, {session.user.id}</h1>

      <br></br>
      <Link
      href={"/book"}>
        <button className="bg-emerald-600 hover:bg-emerald-300 text-white">
          Book Appointment
        </button>
      </Link>
    </div>
  );
};

export default DashboardPage;
