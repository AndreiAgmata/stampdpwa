"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Image from "next/image";
import "../styles/Cards.scss";
import "../styles/Modal.scss";
import { useRouter } from "next/navigation";
import Scanner from "./Scanner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { EffectCards } from "swiper/modules";
import { Pagination } from "swiper/modules";

import { RiDeleteBin6Line } from "react-icons/ri";

import { FaSearch } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaGift } from "react-icons/fa6";

import gsap from "gsap";
import { Power3 } from "gsap";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Cards(props) {
  const { userCards, handleSearchModalCard, handleScanModalCard } = props;
  const router = useRouter();
  const [cards, setCards] = useState(userCards);
  const [scanTrigger, setScanTrigger] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [stampDetails, setStampDetails] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [redeemed, setRedeemed] = useState(false);

  let addStampModalRef = useRef();
  let claimRewardModalRef = useRef();
  let voucherModalRef = useRef();
  let tl = new gsap.timeline();

  //CALLBACKS
  const openScanModal = () => {
    handleScanModalCard("open");
  };

  const openSearchModal = () => {
    handleSearchModalCard("open");
  };
  //

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/cards/${id}`, { method: "DELETE" });
      if (!res.ok) {
        console.log("An error occurred");
      } else {
        console.log("Card Deleted");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlip = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === id ? { ...card, flip: !card.flip } : card
      )
    );
  };

  const handleQRCodeScanned = (decodedText) => {
    handleScanModal("close");
    handleAddStamp(stampDetails, decodedText);
  };

  const handleScanModal = (action, id, businessId) => {
    if (action === "open") {
      setStampDetails({ ...stampDetails, cardId: id, businessId: businessId });
      setModalOpen(true);
      if (window.innerWidth <= 767) {
        tl.to(addStampModalRef, 0.3, { y: 0, ease: Power3.easeInOut });
      } else {
        tl.to(addStampModalRef, 0.3, {
          y: "-25%",
          ease: Power3.easeInOut,
        });
      }
      setTimeout(function () {
        setScanTrigger("open");
      }, 1);
    } else if (action === "close") {
      setStampDetails({});
      setModalOpen(false);
      if (window.innerWidth <= 767) {
        tl.to(addStampModalRef, 0.3, {
          y: "100%",
          ease: Power3.easeInOut,
        });
      } else {
        tl.to(addStampModalRef, 0.3, { y: "100%", ease: Power3.easeInOut });
      }
      setTimeout(function () {
        setScanTrigger("");
      }, 1);
    }
  };

  const handleAddStamp = async (stampDetails, code) => {
    const reqBody = {
      ...stampDetails,
      code: code,
    };
    try {
      const res = await fetch(`/api/cards/stamp/${stampDetails.cardId}`, {
        method: "PUT",
        body: JSON.stringify(reqBody),
      });
      if (!res.ok) {
        if (res.status === 422) {
          console.log("Invalid QR Code");
        } else {
          console.log("An error occured");
        }
      } else {
        console.log("Card Stamped");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaimModal = async (card, action) => {
    if (action === "open") {
      setSelectedCard(card);
      if (window.innerWidth <= 767) {
        tl.to(claimRewardModalRef, 0.3, { y: 0, ease: Power3.easeInOut });
      } else {
        tl.to(claimRewardModalRef, 0.3, {
          y: "-25%",
          ease: Power3.easeInOut,
        });
      }
    } else if (action === "close") {
      setSelectedCard(null);
      if (window.innerWidth <= 767) {
        tl.to(claimRewardModalRef, 0.3, {
          y: "100%",
          ease: Power3.easeInOut,
        });
      } else {
        tl.to(claimRewardModalRef, 0.3, { y: "100%", ease: Power3.easeInOut });
      }
    } else if (action === "redeem") {
      if (window.innerWidth <= 767) {
        tl.to(claimRewardModalRef, 0.3, {
          y: "100%",
          ease: Power3.easeInOut,
        });
        handleVoucherModal("open");
      } else {
        tl.to(claimRewardModalRef, 0.3, { y: "100%", ease: Power3.easeInOut });
        handleVoucherModal("open");
      }
    }
  };

  const handleVoucherModal = async (action) => {
    if (action === "open") {
      handleClaimVoucher();
      setRedeemed(true);
      if (window.innerWidth <= 767) {
        tl.to(voucherModalRef, 0.3, { y: 0, ease: Power3.easeInOut });
      } else {
        tl.to(voucherModalRef, 0.3, {
          y: "-25%",
          ease: Power3.easeInOut,
        });
      }
    } else if (action === "close") {
      setRedeemed(false);
      setSelectedCard(null);
      if (window.innerWidth <= 767) {
        tl.to(voucherModalRef, 0.3, {
          y: "100%",
          ease: Power3.easeInOut,
        });
      } else {
        tl.to(voucherModalRef, 0.3, { y: "100%", ease: Power3.easeInOut });
      }
      router.refresh();
    }
  };

  const handleClaimVoucher = async () => {
    try {
      const res = await fetch("/api/rewards", {
        method: "POST",
        body: JSON.stringify(selectedCard),
      });

      if (!res.ok) {
        console.log("An error occurred");
      } else {
        console.log("Reward Claimed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="text-dark">Expires in: </div>
        <div className="value text-dark text-center fw-bold fs-1">
          {remainingTime}
        </div>
        <div className="text-dark">seconds</div>
      </div>
    );
  };

  const renderStamps = (card) => {
    const stamps = [];
    for (let i = 0; i < card.cardRef.numberOfStamps; i++) {
      //render add stamp
      if (i === card.currentNumStamps) {
        stamps.push(
          <div
            key={i}
            className="stamp add-stamp rounded-circle d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: `${card.cardRef.cardTheme}99`,
              border: `2px dashed ${card.cardRef.cardTheme}`,
            }}
            onClick={() =>
              handleScanModal("open", card._id, card.cardRef.businessId)
            }
          >
            <Image
              src="/add-stamp.svg"
              height={35}
              width={35}
              alt="ad-stamp"
            ></Image>
          </div>
        );
      }
      //render stamped portions
      else if (i < card.currentNumStamps) {
        stamps.push(
          <div
            key={i}
            className="stamp rounded-circle d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: `${card.cardRef.cardTheme}99`,
              border: `2px dashed ${card.cardRef.cardTheme}`,
            }}
          >
            <div
              style={{
                height: "2rem",
                width: "2rem",
                backgroundColor: card.cardRef.cardTheme,
              }}
              className="rounded-circle"
            ></div>
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
    setCards(props.userCards);
  }, [props.userCards]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      if (index === 0) {
        return (
          '<span class="' +
          className +
          ' add-bullet" >' +
          "<p>[+]</p>" +
          "</span>"
        );
      } else {
        return '<span class="' + className + '">' + "</span>";
      }
    },
  };

  return (
    <>
      <>
        <div
          className="custom-modal-background"
          onClick={() => handleScanModal("close")}
        ></div>
        <div className="custom-modal" ref={(el) => (addStampModalRef = el)}>
          <div className="custom-modal-header d-flex justify-content-between align-items-center">
            <h2 className="title coloured m-0 fw-bold fs-2">Scan QR Code</h2>
            <IoClose
              size={"2em"}
              color="#393939"
              onClick={() => handleScanModal("close")}
            />
          </div>
          <div className="custom-modal-body">
            {modalOpen && (
              <Scanner
                triggerScan={scanTrigger}
                onQRCodeScanned={handleQRCodeScanned}
              />
            )}
          </div>
          <div className="custom-modal-footer d-flex justify-content-end"></div>
        </div>
      </>

      <>
        <div
          className="custom-modal-background"
          onClick={() => handleClaimModal(null, "close")}
        ></div>
        <div className="custom-modal" ref={(el) => (claimRewardModalRef = el)}>
          <div className="custom-modal-header d-flex justify-content-between align-items-center">
            <h2 className="title coloured m-0 fw-bold fs-2">Claim Reward</h2>
            <IoClose
              size={"2em"}
              color="#393939"
              onClick={() => handleClaimModal(null, "close")}
            />
          </div>
          <div className="custom-modal-body p-3 d-flex flex-column justify-content-start justify-content-sm-center align-items-center">
            <FaGift
              size={"5em"}
              color="#393939"
              className="mb-3 mt-4 mt-sm-0"
            />
            <h2 className="dark fw-bold ">
              {selectedCard?.cardRef.businessName}
            </h2>
            <h5 className="dark text-center">
              Do you want to redeem this reward now?
            </h5>
            <p>Your reward voucher will only be available for</p>
            <p className="fs-4">
              <b>60 seconds</b>
            </p>
            <p className="text-center">
              After the alloted time, your voucher will be removed.
            </p>
            <p className="text-center">
              Please wait until you are at the business location before pressing
              Redeem.
            </p>
            <button
              type="button"
              className="btn-custom"
              onClick={() => handleClaimModal(null, "redeem")}
            >
              Redeem
            </button>
          </div>
          <div className="custom-modal-footer d-flex justify-content-end"></div>
        </div>
      </>

      <>
        <div
          className="custom-modal-background"
          onClick={() => handleVoucherModal("close")}
        ></div>
        <div className="custom-modal" ref={(el) => (voucherModalRef = el)}>
          <div className="custom-modal-header d-flex justify-content-between align-items-center">
            <h2 className="title coloured m-0 fw-bold fs-2">Reward Voucher</h2>
            <IoClose
              size={"2em"}
              color="#393939"
              onClick={() => handleVoucherModal("close")}
            />
          </div>
          <div className="custom-modal-body p-3 d-flex flex-column justify-content-start justify-content-sm-center align-items-center">
            <h2 className="dark fw-medium m-0 fs-4">
              Thank you for your loyalty with:
            </h2>
            <h2 className="dark fw-bold mb-3">
              {selectedCard?.cardRef.businessName}
            </h2>
            <p className="text-center text-dark">
              Please show this reward voucher to <br /> claim your reward.
            </p>
            {redeemed && (
              <CountdownCircleTimer
                isPlaying
                duration={60}
                colors={["#6e72fc", "#ad1deb", "#6e72fc", "#ad1deb"]}
                colorsTime={[60, 40, 20, 0]}
                className="text-dark"
              >
                {renderTime}
              </CountdownCircleTimer>
            )}
            <button
              className="btn-custom w-100 mt-5"
              type="button"
              onClick={() => handleVoucherModal("close")}
            >
              Complete
            </button>
          </div>
          <div className="custom-modal-footer d-flex justify-content-end"></div>
        </div>
      </>

      {/* MOBILE VIEW */}

      <div className="cards-wrapper d-flex d-sm-none align-items-center justify-content-center">
        <Swiper
          effect={"cards"}
          pagination={pagination}
          grabCursor={true}
          modules={[EffectCards, Pagination]}
          initialSlide={props.userCards.length === 0 ? 0 : 1}
        >
          <SwiperSlide>
            <div className="react-card-front ">
              <div className="add-card d-flex flex-column justify-content-center align-items-center">
                <Image
                  src={"/Mobile-Assets/add-card.svg"}
                  alt="add card"
                  height={70}
                  width={70}
                ></Image>
                <p>Add a card</p>
                <button
                  className="btn-custom mb-2"
                  type="button"
                  style={{ width: "13rem" }}
                  onClick={openSearchModal}
                >
                  <FaSearch className="me-2" />
                  Search
                </button>
                <button
                  className="btn-custom"
                  type="button"
                  style={{ width: "13rem" }}
                  onClick={openScanModal}
                >
                  <IoQrCode className="me-2" />
                  Scan QR Code
                </button>
              </div>
            </div>
          </SwiperSlide>
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <ReactCardFlip
                isFlipped={card.flip}
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
                  <div className="dropdown">
                    <a
                      href=""
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ outline: "none" }}
                    >
                      <svg
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "2rem", height: "auto" }}
                      >
                        <path
                          d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"
                          fill={card.cardRef.cardTheme}
                        />
                        <path
                          d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
                          fill={card.cardRef.cardTheme}
                        />
                        <path
                          d="M12 22.5C13.3807 22.5 14.5 21.3807 14.5 20C14.5 18.6193 13.3807 17.5 12 17.5C10.6193 17.5 9.5 18.6193 9.5 20C9.5 21.3807 10.6193 22.5 12 22.5Z"
                          fill={card.cardRef.cardTheme}
                        />
                      </svg>
                    </a>
                    <ul className="dropdown-menu">
                      <li onClick={() => handleDelete(card._id)}>
                        <a className="dropdown-item" href="">
                          <RiDeleteBin6Line
                            color="red"
                            size="1.5em"
                            className="me-2"
                          />
                          <p className="m-0">Delete Card</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="logo-container mb-3">
                    <img
                      src={card.cardRef.cardLogoUrl}
                      alt="card logo"
                      className="logo rounded-circle "
                    />
                  </div>
                  <h2
                    className="mb-3"
                    style={{ color: card.cardRef.cardTheme }}
                  >
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
                      handleFlip(card._id);
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
                  {card.currentNumStamps === card.cardRef.numberOfStamps && (
                    <div
                      className="claim-reward-btn p-2 rounded-top-3"
                      style={{ backgroundColor: "white" }}
                      onClick={() => handleClaimModal(card, "open")}
                    >
                      <p className="text-dark m-0 fw-bold text-center">
                        Claim Reward
                      </p>
                    </div>
                  )}
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
                  <h2
                    className="mb-2"
                    style={{ color: card.cardRef.cardTheme }}
                  >
                    {card.cardRef.businessName}
                  </h2>
                  <div className="links w-100">
                    <div className="d-flex justify-content-start align-items-center gap-1">
                      <svg
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          fill={card.cardRef.cardTheme}
                        />
                      </svg>
                      <p
                        className="m-0 link-text"
                        style={{ color: card.cardRef.cardTheme }}
                      >
                        {card.cardRef.websiteUrl === ""
                          ? "Your Website"
                          : card.cardRef.websiteUrl}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start align-items-center gap-1">
                      <svg
                        fill={card.cardRef.cardTheme}
                        width="800px"
                        height="800px"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <g id="SVGRepo_iconCarrier">
                          <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />

                          <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
                        </g>
                      </svg>
                      <p
                        className="m-0 link-text"
                        style={{ color: card.cardRef.cardTheme }}
                      >
                        {card.cardRef.instagramUrl === ""
                          ? "Your Instagram"
                          : card.cardRef.instagramUrl}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start align-items-center gap-1">
                      <svg
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                      >
                        <path
                          d="M4 7L10.94 11.3375C11.5885 11.7428 12.4115 11.7428 13.06 11.3375L20 7M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
                          stroke={card.cardRef.cardTheme}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p
                        className="m-0 link-text"
                        style={{ color: card.cardRef.cardTheme }}
                      >
                        {card.cardRef.email}
                      </p>
                    </div>
                  </div>
                  <h6
                    className="mb-3 text-start w-100 mt-2"
                    style={{ color: card.cardRef.cardTheme }}
                  >
                    Offer Details :
                  </h6>
                  <p
                    style={{
                      height: "6.25rem",
                      overflowY: "scroll",
                      fontSize: "0.75rem",
                      color: card.cardRef.cardTheme,
                      scrollbarWidth: "thin", // For Firefox
                      scrollbarColor: "transparent transparent", // For Firefox
                    }}
                    className="w-100 offer-details"
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
                      handleFlip(card._id);
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MD - LG VIEW */}
      <div className="cards-wrapper d-none d-sm-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-4">
        {cards.map((card, index) => (
          <ReactCardFlip
            isFlipped={card.flip}
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
              <div className="dropdown dropstart">
                <a
                  href=""
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ outline: "none" }}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "2rem", height: "auto" }}
                  >
                    <path
                      d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"
                      fill={card.cardRef.cardTheme}
                    />
                    <path
                      d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
                      fill={card.cardRef.cardTheme}
                    />
                    <path
                      d="M12 22.5C13.3807 22.5 14.5 21.3807 14.5 20C14.5 18.6193 13.3807 17.5 12 17.5C10.6193 17.5 9.5 18.6193 9.5 20C9.5 21.3807 10.6193 22.5 12 22.5Z"
                      fill={card.cardRef.cardTheme}
                    />
                  </svg>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href=""
                      onClick={() => handleDelete(card._id)}
                    >
                      <RiDeleteBin6Line
                        color="red"
                        size="1.5em"
                        className="me-2"
                      />
                      <p className="m-0">Delete Card</p>
                    </a>
                  </li>
                </ul>
              </div>
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
                  handleFlip(card._id);
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
              {card.currentNumStamps === card.cardRef.numberOfStamps && (
                <div
                  className="claim-reward-btn p-2 rounded-top-3"
                  style={{ backgroundColor: "white" }}
                  onClick={() => handleClaimModal(card, "open")}
                >
                  <p className="text-dark m-0 fw-bold text-center">
                    Claim Reward
                  </p>
                </div>
              )}
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
              <div className="links w-100">
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.83824 18.4467C10.0103 18.7692 10.1826 19.0598 10.3473 19.3173C8.59745 18.9238 7.07906 17.9187 6.02838 16.5383C6.72181 16.1478 7.60995 15.743 8.67766 15.4468C8.98112 16.637 9.40924 17.6423 9.83824 18.4467ZM11.1618 17.7408C10.7891 17.0421 10.4156 16.1695 10.1465 15.1356C10.7258 15.0496 11.3442 15 12.0001 15C12.6559 15 13.2743 15.0496 13.8535 15.1355C13.5844 16.1695 13.2109 17.0421 12.8382 17.7408C12.5394 18.3011 12.2417 18.7484 12 19.0757C11.7583 18.7484 11.4606 18.3011 11.1618 17.7408ZM9.75 12C9.75 12.5841 9.7893 13.1385 9.8586 13.6619C10.5269 13.5594 11.2414 13.5 12.0001 13.5C12.7587 13.5 13.4732 13.5593 14.1414 13.6619C14.2107 13.1384 14.25 12.5841 14.25 12C14.25 11.4159 14.2107 10.8616 14.1414 10.3381C13.4732 10.4406 12.7587 10.5 12.0001 10.5C11.2414 10.5 10.5269 10.4406 9.8586 10.3381C9.7893 10.8615 9.75 11.4159 9.75 12ZM8.38688 10.0288C8.29977 10.6478 8.25 11.3054 8.25 12C8.25 12.6946 8.29977 13.3522 8.38688 13.9712C7.11338 14.3131 6.05882 14.7952 5.24324 15.2591C4.76698 14.2736 4.5 13.168 4.5 12C4.5 10.832 4.76698 9.72644 5.24323 8.74088C6.05872 9.20472 7.1133 9.68686 8.38688 10.0288ZM10.1465 8.86445C10.7258 8.95042 11.3442 9 12.0001 9C12.6559 9 13.2743 8.95043 13.8535 8.86447C13.5844 7.83055 13.2109 6.95793 12.8382 6.2592C12.5394 5.69894 12.2417 5.25156 12 4.92432C11.7583 5.25156 11.4606 5.69894 11.1618 6.25918C10.7891 6.95791 10.4156 7.83053 10.1465 8.86445ZM15.6131 10.0289C15.7002 10.6479 15.75 11.3055 15.75 12C15.75 12.6946 15.7002 13.3521 15.6131 13.9711C16.8866 14.3131 17.9412 14.7952 18.7568 15.2591C19.233 14.2735 19.5 13.1679 19.5 12C19.5 10.8321 19.233 9.72647 18.7568 8.74093C17.9413 9.20477 16.8867 9.6869 15.6131 10.0289ZM17.9716 7.46178C17.2781 7.85231 16.39 8.25705 15.3224 8.55328C15.0189 7.36304 14.5908 6.35769 14.1618 5.55332C13.9897 5.23077 13.8174 4.94025 13.6527 4.6827C15.4026 5.07623 16.921 6.08136 17.9716 7.46178ZM8.67765 8.55325C7.61001 8.25701 6.7219 7.85227 6.02839 7.46173C7.07906 6.08134 8.59745 5.07623 10.3472 4.6827C10.1826 4.94025 10.0103 5.23076 9.83823 5.5533C9.40924 6.35767 8.98112 7.36301 8.67765 8.55325ZM15.3224 15.4467C15.0189 16.637 14.5908 17.6423 14.1618 18.4467C13.9897 18.7692 13.8174 19.0598 13.6527 19.3173C15.4026 18.9238 16.921 17.9186 17.9717 16.5382C17.2782 16.1477 16.3901 15.743 15.3224 15.4467ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      fill={card.cardRef.cardTheme}
                    />
                  </svg>
                  <p
                    className="m-0 link-text"
                    style={{ color: card.cardRef.cardTheme }}
                  >
                    {card.cardRef.websiteUrl === ""
                      ? "Your Website"
                      : card.cardRef.websiteUrl}
                  </p>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <svg
                    fill={card.cardRef.cardTheme}
                    width="800px"
                    height="800px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />

                      <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
                    </g>
                  </svg>
                  <p
                    className="m-0 link-text"
                    style={{ color: card.cardRef.cardTheme }}
                  >
                    {card.cardRef.instagramUrl === ""
                      ? "Your Instagram"
                      : card.cardRef.instagramUrl}
                  </p>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path
                      d="M4 7L10.94 11.3375C11.5885 11.7428 12.4115 11.7428 13.06 11.3375L20 7M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
                      stroke={card.cardRef.cardTheme}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    className="m-0 link-text"
                    style={{ color: card.cardRef.cardTheme }}
                  >
                    {card.cardRef.email}
                  </p>
                </div>
              </div>
              <h6
                className="mb-3 text-start w-100 mt-2"
                style={{ color: card.cardRef.cardTheme }}
              >
                Offer Details :
              </h6>
              <p
                style={{
                  height: "6.25rem",
                  overflowY: "scroll",
                  fontSize: "0.75rem",
                  color: card.cardRef.cardTheme,
                  scrollbarWidth: "thin", // For Firefox
                  scrollbarColor: "transparent transparent", // For Firefox
                }}
                className="w-100 offer-details"
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
                  handleFlip(card._id);
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
