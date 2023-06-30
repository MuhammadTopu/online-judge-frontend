"use client";
import { Alert } from "@/components/alert/Alert";
import { DateHelper } from "@/helper/date.helper";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import CustomImage from "@/components/reusable/CustomImage";

export default function ClientProfilePage({ userData }: { userData: any }) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<any>();
  const [image, setImage] = useState("");

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      const image_as_base64 = URL.createObjectURL(e.target.files[0]);
      setImage(image_as_base64);
      setFile(e.target.files[0]);
    }
  };
  // handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    if (file) {
      data.append("avatar", file, file.name);
    }

    setMessage("");
    setErrorMessage("");
    setLoading(true);
    try {
      const problemService = await UserService.updateAvatar(data);
      const resProblemData = problemService.data;
      if (resProblemData.error) {
        CustomToast.show(resProblemData.message);
        setErrorMessage(resProblemData.message);
        setLoading(false);
      } else {
        CustomToast.show(resProblemData.message);
        setMessage(resProblemData.message);
        setLoading(false);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        CustomToast.show(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setLoading(false);
      } else {
        CustomToast.show(error.message);
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <main className="container">
      {loading && <div>Please wait...</div>}
      {message && <Alert type={"success"}>{message}</Alert>}
      {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
      <CustomToastContainer />
      <div className="flex justify-evenly">
        <div>
          <div>
            <span className="font-bold text-lg text-[2.5rem]">
              <Link href={`/profile/${userData?.username}`}>
                {userData?.username}
              </Link>
            </span>
            <br />
            <span>
              {userData?.fname} {userData?.lname}
              {userData?.profile?.city && ", " + userData?.profile?.city}
              {userData?.profile?.country && ", " + userData?.profile?.country}
            </span>

            {userData?.profile?.organization && (
              <>
                <br />
                From{" "}
                <span className="font-bold">
                  {userData?.profile?.organization}
                </span>
              </>
            )}
          </div>
          <div>
            Contest rating: <span className="font-bold">{userData?.score}</span>
            <br />
            <span>{userData?.email}</span>
            {userData?.availability && (
              <>
                <br />
                <span>Online status: {userData?.availability}</span>
              </>
            )}
            <div>
              Registered:{" "}
              <span className="font-bold">
                {DateHelper.diff({
                  date1: userData?.created_at,
                  unit: "years",
                }).toLocaleString()}{" "}
                years ago
              </span>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              float: "right",
              border: "1px solid #B9B9B9",
              width: "300px",
              minHeight: "150px",
              padding: "12.5px",
              position: "relative",
              marginBottom: "1em",
            }}
          >
            <CustomImage
              src={image}
              alt="avatar"
              style={{
                width: "275px",
                height: "125px",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <span className="font-bold">Upload profile picture</span>
            <br />
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleFileChange}
            />
            <br />
            <div>
              <button
                className="btn primary"
                type="button"
                onClick={handleSubmit}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
