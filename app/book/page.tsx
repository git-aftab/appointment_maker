import Router, { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingForm from "./book-form";

const BookAppointment = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <BookingForm />
    </main>
  );
};

export default BookAppointment;
