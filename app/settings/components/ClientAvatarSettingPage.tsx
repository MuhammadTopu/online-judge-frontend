"use client";
import { Alert } from "@/components/alert/Alert";
import { DateHelper } from "@/helper/date.helper";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";
import React, { useState } from "react";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import CustomImage from "@/components/reusable/CustomImage";

export default function ClientAvatarSettingPage({
  userData,
}: {
  userData: any;
}) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showEditAvatar, setshowEditAvatar] = useState(false);

  const [file, setFile] = useState<any>();
  const [image, setImage] = useState(userData.avatar);

  const handleEditShowAvatar = (e: any) => {
    setshowEditAvatar(!showEditAvatar);
  };

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
    if (!file) {
      CustomToast.show("Please select an image.");
      setErrorMessage("Please select an image.");
      return;
    }
    data.append("avatar", file, file.name);

    setMessage("");
    setErrorMessage("");
    setLoading(true);
    try {
      const userService = await UserService.updateAvatar(data);
      const resData = userService.data;
      if (resData.error) {
        CustomToast.show(resData.message);
        setErrorMessage(resData.message);
        setLoading(false);
      } else {
        CustomToast.show(resData.message);
        setMessage(resData.message);
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
            <div onClick={handleEditShowAvatar}>Change avatar</div>
            {showEditAvatar && (
              <>
                <div>
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
