"use client";
import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import "../styles/Cards.scss";

function Cards(props) {
  const [cards, setCards] = useState(props.cards);
  const [flip, setFlip] = useState(false);

  const handleFlip = (state) => {
    setFlip(state);
  };

  const renderStamps = (card) => {
    const stamps = [];
    for (let i = 0; i < card.cardRef.numberOfStamps; i++) {
      //render add stamp
      if (i === card.currentNumStamps) {
        stamps.push(
          <div
            key={i}
            className="stamp rounded-circle d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: `${card.cardRef.cardTheme}99`,
              border: `2px dashed ${card.cardRef.cardTheme}`,
            }}
          >
            <h2 className="m-0">+</h2>
          </div>
        );
      }
      //render stamped portions
      else if (i < card.currentNumStamps) {
        stamps.push(
          <div
            key={i}
            className="stamp rounded-circle"
            style={{
              backgroundColor: `${card.cardRef.cardTheme}99`,
              border: `2px dashed ${card.cardRef.cardTheme}`,
            }}
          >
            <h2 className="m-0">=</h2>
          </div>
        );
      }
      //render unstamped portions
      else {
        stamps.push(
          <div
            key={i}
            className="stamp rounded-circle"
            style={{
              backgroundColor: `${card.cardRef.cardTheme}99`,
              border: `2px dashed ${card.cardRef.cardTheme}`,
            }}
          ></div>
        );
      }
    }

    return stamps;
  };

  useEffect(() => {
    setCards(props.cards);
  }, [props.cards]);

  return (
    <>
      <div className="cards-wrapper d-flex flex-row gap-4">
        {cards.map((card, index) => (
          <ReactCardFlip
            isFlipped={flip}
            flipDirection="horizontal"
            key={index}
          >
            <div
              className="card-custom d-flex flex-column justify-content-start align-items-center"
              style={
                card.cardRef.cardBackgroundUrl
                  ? {
                      backgroundImage: `url(${card.cardRef.cardBackgroundUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              <div className="logo-container mb-3">
                <img
                  src={card.cardRef.cardLogoUrl}
                  alt="card logo"
                  className="logo rounded-circle "
                />
              </div>
              <h2 className="mb-3" style={{ color: card.cardRef.cardTheme }}>
                {card.cardRef.cardDesc}
              </h2>
              <div className="stamps d-flex flex-wrap justify-content-center gap-3">
                {renderStamps(card)}
              </div>
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flip align-self-end mt-auto"
                style={{ width: "2rem", height: "auto" }}
                onClick={() => {
                  handleFlip(!flip);
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M3 8H16.5C18.9853 8 21 10.0147 21 12.5C21 14.9853 18.9853 17 16.5 17H3M3 8L6 5M3 8L6 11"
                    stroke={card.cardRef.cardTheme}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
            <div
              className="card-custom d-flex flex-column justify-content-start align-items-center"
              style={
                card.cardRef.cardBackgroundUrl
                  ? {
                      backgroundImage: `url(${card.cardRef.cardBackgroundUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              <div className="logo-container  mb-3">
                <img
                  src={card.cardRef.cardLogoUrl}
                  alt="card logo"
                  className="logo rounded-circle"
                />
              </div>

              <h2 className="mb-2" style={{ color: card.cardRef.cardTheme }}>
                {card.cardRef.businessName}
              </h2>
              <p className="m-0" style={{ color: card.cardRef.cardTheme }}>
                website
              </p>
              <p className="m-0" style={{ color: card.cardRef.cardTheme }}>
                instagram
              </p>
              <p className="m-0" style={{ color: card.cardRef.cardTheme }}>
                phonenum
              </p>
              <h6
                className="mb-3 text-start w-100 mt-2"
                style={{ color: card.cardRef.cardTheme }}
              >
                Offer Details :
              </h6>
              <p
                style={{
                  height: "6rem",
                  overflowY: "scroll",
                  fontSize: "0.75rem",
                  color: card.cardRef.cardTheme,
                }}
                className="w-100"
              >
                {card.cardRef.rewardDesc}
              </p>
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flip align-self-end mt-auto"
                style={{ width: "2rem", height: "auto" }}
                onClick={() => {
                  handleFlip(!flip);
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M3 8H16.5C18.9853 8 21 10.0147 21 12.5C21 14.9853 18.9853 17 16.5 17H3M3 8L6 5M3 8L6 11"
                    stroke={card.cardRef.cardTheme}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </>
  );
}

export default Cards;
