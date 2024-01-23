"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function MyAccount() {
  const { data: session } = useSession();
  return (
    <>
      <section>
        <h1 className="coloured">My Account</h1>
        <button
          type="button"
          className="btn btn-primary m-5"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      </section>
    </>
  );
}

export default MyAccount;
