"use client";
import "@/app/styles/Rewards.scss";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

function RewardsPage() {
  const router = useRouter();
  return (
    <section className="rewards-section">
      <div
        className="back-btn mb-4 d-flex"
        onClick={() => router.push("/home")}
      >
        <IoIosArrowBack size={"1.5em"} color="#393939" />
        <p className="dark m-0 fw-medium">Back</p>
      </div>
      <h1 className="dark">Rewards</h1>
    </section>
  );
}

export default RewardsPage;
