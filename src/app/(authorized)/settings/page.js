import "@/app/styles/Settings.scss";
import Link from "next/link";

function SettingsPage() {
  return (
    <section className="settings-section dark">
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
    </section>
  );
}

export default SettingsPage;
