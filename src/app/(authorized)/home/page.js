import Home from "@/app/components/Home";
import { headers } from "next/headers";
import React from "react";

const getBusinesses = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/businesses`, {
      method: "GET",
    });

    if (res.ok) {
      const result = await res.json();
      return result.businesses;
    } else {
      console.log("fetch error");
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserCards = async () => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  try {
    const res = await fetch(`${process.env.API_URL}/api/cards`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Card Detailssss");
    }
    const data = await res.json();
    return data.cards;
  } catch (error) {
    console.log(error);
  }
};

async function HomePage() {
  const businesses = await getBusinesses();
  const cards = await getUserCards();
  return (
    <>
      <Home businesses={businesses} cards={cards} />
    </>
  );
}

export default HomePage;
