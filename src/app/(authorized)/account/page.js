import MyAccount from "@/app/components/Account/MyAccount";
import React from "react";
import { headers } from "next/headers";

const getAccountDetails = async () => {
  const headersList = headers();
  const cookie = headersList.get("cookie");
  try {
    const res = await fetch(`${process.env.API_URL}/api/my-account`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      console.log("An error occurred while fetching user details");
    } else {
      const data = await res.json();
      return data.user;
    }
  } catch (error) {
    console.log(error);
  }
};

async function AccountPage() {
  const user = await getAccountDetails();
  return <MyAccount props={user} />;
}

export default AccountPage;
