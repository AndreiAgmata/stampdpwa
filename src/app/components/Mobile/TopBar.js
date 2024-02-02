"use client";
import "@/app/styles/styles.scss";
import "./TopBar.scss";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiScan } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Scanner from "../Scanner";
import "@/app/styles/Modal.scss";
import { useRouter } from "next/navigation";
import { Power3 } from "gsap";
import gsap from "gsap";

function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/home";

  const [businessList, setBusinessList] = useState();
  const [searchString, setSearchString] = useState("");
  const [scanTrigger, setScanTrigger] = useState("");
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(true);
  const tl = new gsap.timeline();
  let searchModalRef = useRef();
  let scanModalRef = useRef();
  let modalBgRef = useRef();

  const handleScanModal = (action) => {
    if (action === "open") {
      setScanModalOpen(true);
      tl.to(modalBgRef, 0.05, {
        opacity: 1,
        zIndex: 999,
        ease: Power3.easeInOut,
      });
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
      tl.to(modalBgRef, 0.05, {
        opacity: 0,
        zIndex: -1,
        ease: Power3.easeInOut,
      });
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
      tl.to(modalBgRef, 0.05, {
        opacity: 1,
        zIndex: 999,
        ease: Power3.easeInOut,
      });
      if (window.innerWidth <= 767) {
        tl.to(searchModalRef, 0.3, { y: 0, ease: Power3.easeInOut });
      } else {
        tl.to(searchModalRef, 0.3, {
          y: "-25%",
          ease: Power3.easeInOut,
        });
      }
    } else if (action === "close") {
      tl.to(modalBgRef, 0.05, {
        opacity: 0,
        zIndex: -1,
        ease: Power3.easeInOut,
      });
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

  useEffect(() => {
    const getBusinessList = async () => {
      try {
        const res = await fetch(`api/businesses`, {
          method: "GET",
        });

        if (res.ok) {
          const result = await res.json();
          setBusinessList(result.businesses);
        } else {
          console.log("fetch error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBusinessList();
  }, []);

  if (!isHome) {
    return null;
  }

  return (
    <>
      <section className="topbar-section rounded-bottom-4 ps-4 pe-4">
        <div className="d-flex justify-content-start align-items-center h-100">
          <h1 className="m-0 fs-1" style={{ fontWeight: "800" }}>
            stampd
          </h1>
          <div className="add-card-actions ms-auto d-flex flex-row gap-2">
            <div
              className="action-wrapper d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "2.25em",
                height: "2.25em",
                backgroundColor: "#6e72fc",
              }}
              onClick={() => handleSearchModal("open")}
            >
              <IoSearch size={"1.25em"} color="#f4f4f4" />
            </div>
            <div
              className="action-wrapper d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "2.25em",
                height: "2.25em",
                backgroundColor: "#6e72fc",
              }}
              onClick={() => handleScanModal("open")}
            >
              <PiScan size={"1.25em"} color="#f4f4f4" />
            </div>
          </div>
        </div>
      </section>
      <div
        className="custom-modal-background"
        ref={(el) => (modalBgRef = el)}
        onClick={handleCloseModal}
      ></div>
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
                {businessList?.map((business, index) => (
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
                      <h5 className="m-0 dark">{business.businessName}</h5>
                      <p className="m-0 dark">{business.cardDesc}</p>
                    </div>
                    <button
                      type="button"
                      className="btn-custom ms-auto w-25 p-1 "
                      style={{ height: "2.5rem" }}
                      onClick={() => {
                        handleAddCard(business.businessId);
                      }}
                    >
                      Add
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
    </>
  );
}

export default TopBar;
