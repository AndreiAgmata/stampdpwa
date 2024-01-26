import Image from "next/image";
import "@/app/styles/styles.scss";
import "./TopBar.scss";

function TopBar() {
  return (
    <section className="topbar-section">
      <div className="ps-3 pe-3 pt-4 d-flex justify-content-between">
        <Image
          src={"/Mobile-Assets/reward.svg"}
          height={35}
          width={35}
          alt="rewards"
        ></Image>
        <h1 className="m-0" style={{ fontSize: "2.25rem", fontWeight: "800" }}>
          stampd
        </h1>
        <Image
          src={"/Mobile-Assets/account.svg"}
          height={35}
          width={35}
          alt="account"
        ></Image>
      </div>
    </section>
  );
}

export default TopBar;
