"use client";
import "@/app/styles/Settings.scss";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function SettingsPage() {
  const router = useRouter();
  return (
    <section className="settings-section dark">
      <div
        className="back-btn mb-4 d-flex"
        onClick={() => router.push("/home")}
      >
        <IoIosArrowBack size={"1.5em"} color="#393939" />
        <p className="dark m-0 fw-medium">Back</p>
      </div>
      <h1 className="dark mb-4">Settings</h1>
      <div className="links d-flex flex-column gap-2 fs-5 border-bottom mb-4">
        <Link href={""}>Change Password</Link>
        <Link href={""} className="text-danger mb-2">
          Delete Account
        </Link>
      </div>
      <div className="links d-flex flex-column gap-2 fs-5 border-bottom mb-4">
        <Link href={""}>FAQs</Link>
        <Link href={""}>Privacy Policy</Link>
        <Link href={""} className="mb-2">
          Terms & Conditions
        </Link>
      </div>
      <div className="links d-flex flex-column gap-2 fs-5 border-bottom">
        <Link href={""}>Want to register your business?</Link>
        <Link href={""} className="mb-2">
          Contact Stampd
        </Link>
      </div>
      <button type="button" className="btn-custom mt-3 w-100" onClick={signOut}>
        Log Out
      </button>
    </section>
  );
}

export default SettingsPage;
