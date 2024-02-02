import React from "react";
import "../styles/LandingPage.scss";
import NavBar from "./NavBar";
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";

function LandingPage() {
  return (
    <>
      <NavBar />
      <section className="landing-page d-flex justify-content-center align-items-center">
        <div className="custom-shape-divider-bottom-1703661391">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
              fill="#f4f4f4"
            ></path>
          </svg>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center align-items-start order-2 order-md-1">
              <h1 className="fw-bold hero-header">
                Embrace ease: <br /> Our streamlined loyalty program is here!
              </h1>
              <p className="hero-description">
                Say goodbye to missing loyalty cards with our hassle-free,
                streamlined loyalty program solution. Simplify rewards, no cards
                needed.
              </p>
              <div className="get-app d-flex flex-column flex-sm-row gap-3">
                <div
                  className="ios ps-2 pt-2 rounded-pill d-flex flex-row justify-content-start align-items-center "
                  style={{
                    backgroundColor: "#ffffff4d",
                    width: "15rem",
                    height: "4.75rem",
                  }}
                >
                  <FaApple size={"3.5em"} style={{ marginTop: "-0.5rem" }} />
                  <div className="text d-flex flex-column justify-content-center">
                    <p className="m-0 fw-light">Get the app on</p>
                    <p
                      className="mb-0 fs-2 fw-medium"
                      style={{ marginTop: "-0.5rem" }}
                    >
                      iOS
                    </p>
                  </div>
                </div>
                <div
                  className="ios ps-2 pt-2 rounded-pill d-flex flex-row justify-content-start align-items-center "
                  style={{
                    backgroundColor: "#ffffff4d",
                    width: "15rem",
                    height: "4.75rem",
                  }}
                >
                  <IoLogoAndroid
                    size={"3.5em"}
                    style={{ marginTop: "-0.5rem" }}
                  />
                  <div className="text d-flex flex-column justify-content-center">
                    <p className="m-0 fw-light">Get the app on</p>
                    <p
                      className="mb-0 fs-2 fw-medium"
                      style={{ marginTop: "-0.5rem" }}
                    >
                      Android
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center order-1 order-md-2">
              <img
                className="hero-image"
                src="/hero-image.png"
                alt="hero-image"
              ></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
