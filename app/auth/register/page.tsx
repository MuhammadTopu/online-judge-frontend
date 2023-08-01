"use client";

import { Alert } from "@/components/alert/Alert";
import { CookieHelper } from "@/helper/cookie.helper";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Register() {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // handle register
  const handleRegister = async (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password not match");
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password,
    };
    setMessage(null);
    setErrorMessage("");
    setLoading(true);
    try {
      const login = await UserService.register(data);
      const resRegisterData = login.data;
      if (resRegisterData.error) {
        setErrorMessage(resRegisterData.message);
        setLoading(false);
      } else {
        setMessage(resRegisterData.message);
        setLoading(false);

        // router.push(`/auth/login`);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
      } else {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <main className="flex justify-center">
        <div
          style={{
            padding: "50px",
            width: "50%",
          }}
          className="self-center"
        >
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}

          <form onSubmit={handleRegister} method="post">
            <div className="m-4">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="m-4">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email address"
              />
            </div>
            <div className="m-4">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="m-4">
              <input
                className="input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>

            <button type="submit" className="m-4 btn primary">
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
