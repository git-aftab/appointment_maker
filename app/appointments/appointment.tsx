"use client";

import React, { ReactHTMLElement } from "react";
import { useRouter } from "next/navigation";

const DelAppointment = (appointmentId) => {
  const router = useRouter();
  const deleteAppointment = async () => {
    console.log("appointment ID:", appointmentId?.id);
    const res = await fetch(`/api/appointments/${appointmentId?.id}`, {
      method: "DELETE",
      headers: {
        Content: "Application/json",
      },
    });
    router.refresh();
  };
  return (
    <button
      onClick={deleteAppointment}
      className="bg-red-500 text-black hover:bg-red-300 active:bg-white"
    >
      Delete Appointment
    </button>
  );
};

export default DelAppointment;
