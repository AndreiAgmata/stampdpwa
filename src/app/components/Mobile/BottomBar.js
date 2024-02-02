import "./BottomBar.scss";
import Link from "next/link";
import { TbCards } from "react-icons/tb";
import { FiGift } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

function BottomBar() {
  return (
    <section className="bottom-bar-wrapper">
      <div className="bottom-bar">
        <div
          className="links h-100 w-100 d-flex justify-content-evenly align-items-center"
          style={{ color: "#f4f4f4" }}
        >
          <Link href={"/home"}>
            <TbCards size={"2em"} color="#f4f4f4" />
            <p style={{ fontSize: "0.75rem", margin: "0" }}>Cards</p>
          </Link>
          <Link href={"/rewards"}>
            <FiGift size={"1.75em"} color="#f4f4f4" />
            <p style={{ fontSize: "0.75rem", margin: "0" }}>Rewards</p>
          </Link>
          <Link href={"/account"}>
            <RiAccountCircleLine size={"2em"} color="#f4f4f4" />
            <p style={{ fontSize: "0.75rem", margin: "0" }}>Account</p>
          </Link>
          <Link href={"/settings"}>
            <FiSettings size={"1.65em"} color="#f4f4f4" />
            <p style={{ fontSize: "0.75rem", margin: "0" }}>Settings</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BottomBar;
