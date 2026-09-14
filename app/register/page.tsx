"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const [error, setError] = useState<null | string>("");
  const [loading, setLoading] = useState<true | false>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error, data } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Registration failed");
      return;
    }

    console.log("Data from auth client res", data);
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="bg-[#111111] flex flex-col gap-5 justify-center items-center p-10 rounded-2xl">
        <h1 className="text-2xl font-sans">Register</h1>
        <form>
          <div className="flex flex-col mb-4">
            <label className="pl-1">Name</label>
            <input
              className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
              type="text"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="">Email</label>
            <input
            className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="">Password</label>
            <input
            className="bg-white text-black placeholder:text-[#574f4f] placeholder:border-none px-4 py-2 rounded-md"
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <button
          className="w-full rounded-md cursor-pointer px-4 py-2 bg-[#424040]" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>

      {error && <p>{error}</p>}
    </main>
  );
};

export default RegisterPage;
