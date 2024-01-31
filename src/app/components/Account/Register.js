"use client";
import Link from "next/link";
import "../../styles/account/register.scss";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../Toast";
import { notifySuccess } from "../Toast";

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    password: "",
  });
  const [running, setRunning] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRunning(true);
    setEmailError(false);
    setPasswordError(false);

    if (user.password.length < 8) {
      setPasswordError(true);
      setEmailError(false);
      setRunning(false);
    } else {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (res.ok) {
          setUser({
            firstName: "",
            lastName: "",
            email: "",
            phoneNum: "",
            password: "",
          });
          setRunning(false);
          notifySuccess("Registration Successful");
          console.log("Account Created");
        } else {
          setRunning(false);
          setEmailError(true);
          notifyError("An error occurred. Please try again.");
          console.log("Error Ocurred");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="register-section d-flex flex-column ">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container header mt-4">
        <h1 className="coloured">stampd</h1>
      </div>
      <div className="container mt-5">
        <div className="row d-flex gap-5">
          <div className="col d-flex flex-column justify-content-center ">
            <h2>Start collecting rewards, Register now! </h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col mb-3">
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
                <div className="col mb-3">
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
                <div className="col mb-3">
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
                <div className="col mb-3">
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                {passwordError && (
                  <div className="form-text">
                    Password must have at least 8 characters.
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-custom w-100"
                disabled={running}
              >
                {running ? "Signing Up" : "Sign Up"}
              </button>
            </form>
            <div className="redirects mt-4">
              <p>
                Already using stampd?{" "}
                <Link href={"/account/login"}>Log in here</Link>
              </p>
              <p>
                Not a client?{" "}
                <Link href={"https://stampd.ca/console/account/register"}>
                  Register Business Here
                </Link>
              </p>
            </div>
          </div>
          <div className="col d-lg-block d-none">
            <img src="/hero-image.png" alt="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
