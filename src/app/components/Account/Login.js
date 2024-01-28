"use client";
import Link from "next/link";
import "../../styles/account/login.scss";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(false);
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
    setError(false);
    const email = user.email;
    const password = user.password;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.ok) {
        setRunning(false);
        setError(false);
        router.push("/home");
      } else {
        setRunning(false);
        setError(true);
        console.log("Error Logging In");
      }
    } catch (error) {
      console.log("An Error Occurred: ", error);
    }
  };

  return (
    <section className="login-section d-flex flex-sm-row flex-column">
      <div
        className="image-wrapper"
        style={{
          backgroundImage: `url(${"/login-image.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      ></div>
      <img
        src="/mobile-login-image.png"
        alt="login-image"
        className="mobile-login-image"
      />
      <div className="mobile-login-header mt-4">
        <div className="container">
          <h1>stampd</h1>
        </div>
      </div>
      <div className="container right">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <h2 className="d-none d-sm-block">
              Start collecting rewards with{" "}
              <span className="span-text">stampd</span>
            </h2>
            <h2 className="d-block d-sm-none">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
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
              </div>
              {error && (
                <p className="text-danger">Incorrect Email or Password.</p>
              )}
              <button
                type="submit"
                className="btn-custom w-100"
                disabled={running}
              >
                {running ? "Logging In" : "Log In"}
              </button>
            </form>
            <div className="redirects mt-4">
              <p>
                Dont have an account?{" "}
                <Link href={"/account/register"}>Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
