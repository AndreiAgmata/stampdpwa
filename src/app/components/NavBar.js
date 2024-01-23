"use client";

import Link from "next/link";
import "../styles/NavBar.scss";
import { useRouter } from "next/navigation";
function NavBar() {
  const router = useRouter();
  return (
    <section className="navbar-section">
      <div className="container-md h-100 d-flex align-items-center justify-content-between">
        <h1 className="title">stampd</h1>
        <div className="links d-lg-flex d-md-flex gap-3 align-items-center d-sm-none d-none ">
          <Link href={"https://stampd.ca"}>About</Link>
          <Link href={"./account/login"}>Client Login</Link>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => router.push("/account/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
