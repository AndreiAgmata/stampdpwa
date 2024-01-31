"use client";
import { useSession } from "next-auth/react";
import "../styles/Home.scss";
import { FaSearch } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import Scanner from "./Scanner";
import "../styles/Modal.scss";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { Power3 } from "gsap";
import gsap from "gsap";

import { IoClose } from "react-icons/io5";

function Home(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [businessList, setBusinessList] = useState(props.businesses);
  const [searchString, setSearchString] = useState("");
  const [scanTrigger, setScanTrigger] = useState("");
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(true);
  //animations
  const tl = new gsap.timeline();
  let searchModalRef = useRef();
  let scanModalRef = useRef();

  const handleScanModal = (action) => {
    if (action === "open") {
      setScanModalOpen(true);
      if (window.innerWidth <= 767) {
        tl.to(scanModalRef, 0.3, { y: 0, ease: Power3.easeInOut });
      } else {
        tl.to(scanModalRef, 0.5, { y: "-25%", ease: Power3.easeInOut });
      }
      setTimeout(function () {
        setScanTrigger("open");
      }, 1);
    } else if (action === "close") {
      setScanModalOpen(false);
      if (window.innerWidth <= 767) {
        tl.to(scanModalRef, 0.3, {
          y: "100%",
          ease: Power3.easeInOut,
        });
      } else {
        tl.to(scanModalRef, 0.3, { y: "100%", ease: Power3.easeInOut });
      }
      setTimeout(function () {
        setScanTrigger("");
      }, 1);
    }
  };

  const handleSearchModal = (action) => {
    if (action === "open") {
      // setSearchModalOpen(true);
      if (window.innerWidth <= 767) {
        tl.to(searchModalRef, 0.3, { y: 0, ease: Power3.easeInOut });
      } else {
        tl.to(searchModalRef, 0.3, {
          y: "-25%",
          ease: Power3.easeInOut,
        });
      }
    } else if (action === "close") {
      if (window.innerWidth <= 767) {
        tl.to(searchModalRef, 0.3, {
          y: "100%",
          ease: Power3.easeInOut,
        });
      } else {
        tl.to(searchModalRef, 0.3, { y: "100%", ease: Power3.easeInOut });
      }
    }
  };

  const handleCloseModal = () => {
    handleSearchModal("close");
    handleScanModal("close");
  };

  const handleAddCard = async (id) => {
    handleSearchModal("close");
    try {
      const res = await fetch(`/api/cards/add`, {
        method: "POST",
        body: JSON.stringify({ businessId: id }),
      });

      if (!res.ok) {
        switch (res.status) {
          case 409:
            console.log("This card already exists");
            break;
          case 400:
            console.log("No card found");
            break;
        }
      } else {
        router.refresh();
        console.log("Added Card");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = async () => {
    console.log(searchString);
  };

  const handleQRCodeScanned = (decodedText) => {
    handleScanModal("close");
    handleAddCard(decodedText);
  };

  return (
    <section className="home-section">
      <div className="container-fluid">
        <div className="header d-none d-sm-block">
          {props.cards.length !== 0 ? (
            <div className="d-flex flex-column flex-md-row justify-content-start align-items-start mb-2">
              <h2 className="dark fw-bold mb-0 me-3">
                Hello {session?.user?.userName} 👋🏻!
              </h2>
              <div className="buttons d-flex flex-md-row gap-2">
                <button
                  type="button"
                  className="btn-custom d-flex align-items-center gap-2"
                  onClick={() => {
                    handleSearchModal("open");
                  }}
                >
                  <FaSearch />
                  Search
                </button>
                <button
                  type="button"
                  className="btn-custom d-flex align-items-center gap-2"
                  onClick={() => {
                    handleScanModal("open");
                  }}
                >
                  <IoQrCode />
                  Scan QR Code
                </button>
              </div>
            </div>
          ) : (
            <div className="row d-flex align-items-center mb-2">
              <div>
                <h2 className="dark fw-bold mb-0">
                  Hello {session?.user?.userName} 👋🏻!
                </h2>
              </div>
            </div>
          )}
          {props.cards.length !== 0 ? (
            <p>
              Ready to earn rewards? Scan a QR code and start collecting stamps!
            </p>
          ) : (
            <p>Start collecting rewards by adding a card below.</p>
          )}
        </div>
        {props.cards.length === 0 ? (
          <>
            <Cards
              userCards={props.cards}
              handleSearchModalCard={handleSearchModal}
              handleScanModalCard={handleScanModal}
              className="d-block d-sm-none"
            />
            <div className="row no-card-container d-none d-sm-flex">
              <div className="col-md-6 mock-card">
                <div className="logo"></div>
                <div className="text"></div>
                <div className="stamps">
                  <div className="stamp"></div>
                  <div className="stamp"></div>
                  <div className="stamp"></div>
                  <div className="stamp"></div>
                  <div className="stamp"></div>
                  <div className="stamp"></div>
                </div>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                <h2>Add a Card</h2>
                <button
                  type="button"
                  className="btn-custom mb-3 d-flex justify-content-center align-items-center gap-1 no-card"
                  onClick={() => {
                    handleSearchModal("open");
                  }}
                >
                  <FaSearch />
                  Search
                </button>
                <button
                  type="button"
                  className="btn-custom mb-3 d-flex justify-content-center align-items-center gap-1 no-card"
                  onClick={() => {
                    handleScanModal("open");
                  }}
                >
                  <IoQrCode />
                  Scan QR Code
                </button>
                <img
                  src="/arrow.png"
                  alt="arrow"
                  className="align-self-start w-50"
                />
              </div>
            </div>
          </>
        ) : (
          <Cards
            userCards={props.cards}
            handleSearchModalCard={handleSearchModal}
            handleScanModalCard={handleScanModal}
          />
        )}
      </div>

      <>
        <div
          className="custom-modal-background"
          onClick={handleCloseModal}
        ></div>
        <div className="custom-modal" ref={(el) => (scanModalRef = el)}>
          <div className="custom-modal-header d-flex justify-content-between align-align-items-center">
            <h2 className="title coloured m-0 fw-bold fs-2  ">Scan QR Code</h2>
            <IoClose
              size={"2em"}
              color="#393939"
              onClick={() => handleScanModal("close")}
            />
          </div>
          <div className="custom-modal-body">
            {scanModalOpen && (
              <Scanner
                triggerScan={scanTrigger}
                onQRCodeScanned={handleQRCodeScanned}
              />
            )}
          </div>
          <div className="custom-modal-footer d-flex justify-content-end">
            <button
              type="button"
              className="btn-custom"
              onClick={() => {
                handleScanModal("close");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </>

      {searchModalOpen && (
        <>
          <div
            className="custom-modal-background"
            onClick={handleCloseModal}
          ></div>
          <div className="custom-modal" ref={(el) => (searchModalRef = el)}>
            <div className="custom-modal-header d-flex justify-content-between align-items-center">
              <h2 className="title coloured m-0 fw-bold fs-2">Search</h2>
              <IoClose
                size={"2em"}
                color="#393939"
                onClick={() => handleSearchModal("close")}
              />
            </div>
            <div className="custom-modal-body p-3">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control rounded-pill mb-3"
                    placeholder="Enter a business name"
                  ></input>
                </div>
              </div>

              <div className="list">
                {businessList.map((business, index) => (
                  <div
                    key={index}
                    className="list-item d-flex justify-content-start align-items-center gap-3 mb-3 p-2 rounded border border-secondary-subtle"
                  >
                    <div
                      className="logo-container rounded-circle"
                      style={{ height: "5.5rem", width: "5.5rem" }}
                    >
                      <img
                        src={business.cardLogoUrl}
                        alt="business logo"
                        style={{
                          height: "100%",
                          width: "100%",
                          backgroundColor: "black",
                          objectFit: "cover",
                        }}
                      ></img>
                    </div>

                    <div className="col">
                      <h5 className="m-0 text-dark">
                        {" "}
                        {business.businessName}
                      </h5>
                      <p className="m-0">{business.cardDesc}</p>
                    </div>

                    <button
                      type="button"
                      className="btn-custom ms-auto w-25 p-1 "
                      style={{ height: "2.5rem" }}
                      onClick={() => {
                        handleAddCard(business.businessId);
                      }}
                    >
                      Add Card
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="custom-modal-footer d-flex justify-content-end">
              <button
                type="button"
                className="btn-custom"
                onClick={() => {
                  handleSearchModal("close");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
