import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/app/components/Account/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");
  return <Login />;
}

export default LoginPage;
