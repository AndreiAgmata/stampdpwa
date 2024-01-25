"use client";
import { useSession } from "next-auth/react";
import "../styles/Home.scss";
import { FaSearch } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { useEffect, useState } from "react";
import Scanner from "./Scanner";
import "../styles/Modal.scss";
import Cards from "./Cards";
import { useRouter } from "next/navigation";

function Home(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [businessList, setBusinessList] = useState(props.businesses);
  const [searchString, setSearchString] = useState("");
  const [scanTrigger, setScanTrigger] = useState("");
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleScanModal = (action) => {
    if (action === "open") {
      setScanModalOpen(true);
      setTimeout(function () {
        setScanTrigger("open");
      }, 1);
    } else if (action === "close") {
      setScanModalOpen(false);
      setTimeout(function () {
        setScanTrigger("");
      }, 1);
    }
  };

  const handleSearchModal = (action) => {
    if (action === "open") {
      setSearchModalOpen(true);
    } else if (action === "close") {
      setSearchModalOpen(false);
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
      <div className="container-fluid pt-5 ms-5">
        <div className="header">
          {props.cards.length !== 0 ? (
            <div className="row d-flex align-items-center mb-2">
              <div className="col-md-3">
                <h2 className="dark fw-bold mb-0">
                  Hello {session?.user?.userName} 👋🏻!
                </h2>
              </div>
              <div className="col-md-6 d-flex gap-2">
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
              <div className="col-md-3">
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
          <div className="row no-card-container">
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
        ) : (
          <div className="cards-container">
            <Cards cards={props.cards} />
          </div>
        )}
      </div>
      {scanModalOpen && (
        <>
          <div
            className="custom-modal-background"
            onClick={handleCloseModal}
          ></div>
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h2 className="title coloured m-0 fw-bold fs-2">Scan QR Code</h2>
            </div>
            <div className="custom-modal-body">
              <Scanner
                triggerScan={scanTrigger}
                onQRCodeScanned={handleQRCodeScanned}
              />
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
      )}
      {searchModalOpen && (
        <>
          <div
            className="custom-modal-background"
            onClick={handleCloseModal}
          ></div>
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h2 className="title coloured m-0 fw-bold fs-2">Search</h2>
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
                    <img
                      src={business.cardLogoUrl}
                      alt="business logo"
                      style={{
                        height: "50px",
                        width: "50px",
                        backgroundColor: "black",
                      }}
                      className="rounded-circle"
                    ></img>
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
