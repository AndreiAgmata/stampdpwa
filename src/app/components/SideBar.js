"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import "../styles/SideBar.scss";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoGiftOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";

function SideBar() {
  const { data: session } = useSession();
  return (
    <section className="sideBar-section">
      <div className="container d-flex flex-column justify-content-center mt-5">
        <h1 className="title mb-4">stampd</h1>
        <div className="links col ms-4 d-flex flex-column gap-4 justify-content-start align-items-start">
          <Link href={""}>
            <FaHome size={"1.5em"} />
            Home
          </Link>
          <Link href={""}>
            <IoGiftOutline size={"1.5em"} />
            Rewards
          </Link>
          <Link href={""}>
            <MdAccountCircle size={"1.5em"} />
            My Account
          </Link>
          <Link href={""}>
            <IoIosHelpCircle size={"1.6em"} />
            Help & Support
          </Link>
        </div>
        <button
          type="button"
          className="btn btn-light mt-4 align-self-center"
          onClick={signOut}
        >
          Log Out
        </button>
        <p
          style={{
            fontSize: "0.75rem",
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
          }}
        >
          &copy; Stampd Technologies 2024
        </p>
      </div>
    </section>
  );
}

export default SideBar;
