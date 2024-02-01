"use client";
import "@/app/styles/styles.scss";
import "./TopBar.scss";
import { usePathname } from "next/navigation";

function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/home";

  if (!isHome) {
    return null;
  }

  return (
    <section className="topbar-section rounded-bottom-4 ">
      <div className="d-flex justify-content-center align-items-center h-100">
        <h1 className="m-0" style={{ fontSize: "2.25rem", fontWeight: "800" }}>
          stampd
        </h1>
      </div>
    </section>
  );
}

export default TopBar;
