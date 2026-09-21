"use client";
import React, { FormEvent, useState } from "react";
import { loginSchema } from "@/lib/validators/auth";

import { useRouter } from "next/router";
import { authClient } from "@/lib/auth-client";

const LoginPage = async () => {
  const [error, setError] = useState<null | string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(false);

    const formData = new FormData(e.currentTarget);

    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(input);

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid Input");
      setLoading(false);
    }

    const { email, password } = result.data;

    const { error, data } = await authClient.signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message || "Login failed.");
      return;
    }

    console.log("Login successful", data);
    useRouter().push("/dashboard");
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="bg-[#111111] flex flex-col gap-5 justify-center items-center p-10 rounded-2xl">
        <h1 className="text-2xl font-sans">Login</h1>
        <form>
          <div className="flex flex-col mb-4">
            <label className="pl-1 text-sm">Email</label>
            <input
              className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="pl-1 text-sm">Password</label>
            <input
              className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <button
            className="w-full rounded-md cursor-pointer px-4 py-2 bg-[#424040]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
