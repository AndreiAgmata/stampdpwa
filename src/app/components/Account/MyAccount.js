"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import "../../styles/account/my-account.scss";
import { useState } from "react";

function MyAccount({ props }) {
  const [user, setUser] = useState(props.user);
  const [running, setRunning] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("updating account");
  };

  return (
    <section className="my-account-section">
      <h1 className="dark fw-bold">My Account</h1>
      <div className="usage mt-5">
        <h3 className="dark fw-medium pb-2 border-bottom">Usage</h3>
        <div className="activity-wrapper pt-1">
          <div className="row">
            <div className="col-12 col-sm-6 d-flex justify-content-evenly align-items-center">
              <div
                className="border d-flex flex-column justify-content-center align-items-center"
                style={{
                  width: " 40%",
                  height: "6rem",
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                }}
              >
                <h2
                  className="m-0"
                  style={{ fontSize: "2.5rem", color: "#6e72fc" }}
                >
                  {props.stampCount}
                </h2>
                <p className="dark m-0">Total Stamps</p>
              </div>
              <div
                className="border d-flex flex-column justify-content-center align-items-center"
                style={{
                  width: " 40%",
                  height: "6rem",
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                }}
              >
                <h2
                  className="m-0"
                  style={{ fontSize: "2.5rem", color: "#6e72fc" }}
                >
                  {props.rewardsCount}
                </h2>
                <p className="dark m-0">Total Redeems</p>
              </div>
              {/* <p
                className="dark mt-2 mb-0 text-center"
                style={{ fontSize: "0.75rem" }}
              >
                Data may not reflect recent activity.
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="personal-details mt-5">
        <h3 className="dark fw-medium pb-2 border-bottom">Account Details</h3>
        <div className="row d-flex gap-5">
          <div className="col d-flex flex-column justify-content-center ">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="firstName"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  {emailError && (
                    <div className="form-text text-danger">
                      This Email Address is already in use.
                    </div>
                  )}
                </div>
                <div className="col-6 col-sm-3 mb-3">
                  <label htmlFor="phoneNum" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNum"
                    name="phoneNum"
                    value={user.phoneNum}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <button type="button" className="btn-custom ms-auto">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="mt-3">
        <div className="fw-bold pb-2 border-bottom"></div>
        <h3 className="text-dark mt-2">Log Out</h3>
      </div> */}
    </section>
  );
}

export default MyAccount;
