"use client";

import React, { useState, FormEvent } from "react";
import { createAppointmentSchema } from "@/lib/validators/appointment";

const BookingForm = () => {
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const input = {
      title: formData.get("title"),
      description: formData.get("description"),
      appointDateTime: formData.get("appointDateTime"),
    };

    const result = createAppointmentSchema.safeParse(input);

    if (!result.success) {
      setError(result.error.issues[0].message ?? "Invalid input");
      setLoading(false);
      return;
    }

    const { title, description, appointDateTime } = result.data;

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          appointDateTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to book appointment");
        return;
      }

      console.log(data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#111111] flex flex-col gap-5 justify-center items-center p-10 rounded-2xl">
      <h1 className="text-2xl font-sans">Appointment Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="pl-1 text-sm">Title</label>
          <input
            className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
            type="text"
            name="title"
            placeholder="Fever"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="pl-1 text-sm">Description</label>
          <textarea
            className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
            name="description"
            placeholder="Sever-Fever for the last 2 days"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className="pl-1 text-sm">Appointment Date & Time</label>
          <input
            className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
            type="datetime-local"
            name="appointDateTime"
            required
          />
        </div>

        <button
          className="w-full rounded-md cursor-pointer px-4 py-2 bg-[#424040]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Booking Appointment..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
