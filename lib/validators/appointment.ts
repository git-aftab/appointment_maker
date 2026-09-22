import { z } from "zod";

export const createAppointmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional(),

  appointmentDate: z.string().datetime({ message: "Invalid appointment date" }),
});

export type createAppointmentInput = z.infer<typeof createAppointmentSchema>;
