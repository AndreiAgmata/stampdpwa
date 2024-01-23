import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Register from "@/app/components/Account/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");
  return <Register />;
}

export default RegisterPage;
