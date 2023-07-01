"use client";
import React, { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { DateHelper } from "@/helper/date.helper";
import { UserService } from "@/service/user/user.service";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import ClientAvatarSettingPage from "./ClientAvatarSettingPage";

export default function ClientSettingsPage({ userData }: { userData: any }) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const date_of_birth = e.target.date_of_birth.value;
    const city = e.target.city.value;
    const country = e.target.country.value;
    const organization = e.target.organization.value;

    const recipient_name = e.target.recipient_name.value;
    const recipient_zip_code = e.target.recipient_zip_code.value;
    const recipient_country = e.target.recipient_country.value;
    const recipient_state = e.target.recipient_state.value;
    const recipient_city = e.target.recipient_city.value;
    const recipient_address = e.target.recipient_address.value;
    const recipient_phone_number = e.target.recipient_phone_number.value;

    const data = {
      fname: fname,
      lname: lname,
      date_of_birth: date_of_birth,
      city: city,
      country: country,
      organization: organization,
      recipient_name: recipient_name,
      recipient_zip_code: recipient_zip_code,
      recipient_country: recipient_country,
      recipient_state: recipient_state,
      recipient_city: recipient_city,
      recipient_address: recipient_address,
      recipient_phone_number: recipient_phone_number,
    };
    setMessage("");
    setErrorMessage("");
    setLoading(true);
    try {
      const problemService = await UserService.update(data);
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
        setErrorMessage(error.response.data.message);
        setLoading(false);
      } else {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <main className="flex justify-center container">
      <div>
        <ClientAvatarSettingPage userData={userData} />
      </div>
      <div className="self-center">
        {loading && <div>Please wait...</div>}
        {message && <Alert type={"success"}>{message}</Alert>}
        {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit} method="post">
          <CustomToastContainer />
          <button type="submit" className="m-4 btn primary">
            Save
          </button>

          <div className="m-4 flex">
            <label className="w-full" htmlFor="fname">
              First name
            </label>
            <input
              id="fname"
              className="input"
              type="text"
              name="fname"
              placeholder="First name"
              defaultValue={userData.fname}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="lname">
              Last name
            </label>
            <input
              id="lname"
              className="input"
              type="text"
              name="lname"
              placeholder="Last name"
              defaultValue={userData.lname}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="date_of_birth">
              Date of birth
            </label>
            <input
              id="date_of_birth"
              className="input"
              type="date"
              name="date_of_birth"
              placeholder="Date of birth"
              defaultValue={DateHelper.format(
                userData.profile.date_of_birth,
                "YYYY-MM-DD"
              )}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="city">
              City
            </label>
            <input
              id="city"
              className="input"
              type="text"
              name="city"
              placeholder="City"
              defaultValue={userData.profile.city}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              className="input"
              type="text"
              name="country"
              placeholder="Country"
              defaultValue={userData.profile.country}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="organization">
              Organization
            </label>
            <input
              id="organization"
              className="input"
              type="text"
              name="organization"
              placeholder="Organization"
              defaultValue={userData.profile.organization}
            />
          </div>
          <p>
            *This address will be used to send you t-shirts, certificates, etc.
            Please, keep it actual and valid.
          </p>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_name">
              Recipient name
            </label>
            <input
              id="recipient_name"
              className="input"
              type="text"
              name="recipient_name"
              placeholder="Recipient name"
              defaultValue={userData.profile.recipient_name}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_zip_code">
              Recipient zip code
            </label>
            <input
              id="recipient_zip_code"
              className="input"
              type="text"
              name="recipient_zip_code"
              placeholder="Recipient zip code"
              defaultValue={userData.profile.recipient_zip_code}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_country">
              Recipient country
            </label>
            <input
              id="recipient_country"
              className="input"
              type="text"
              name="recipient_country"
              placeholder="Recipient country"
              defaultValue={userData.profile.recipient_country}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_state">
              Recipient state
            </label>
            <input
              id="recipient_state"
              className="input"
              type="text"
              name="recipient_state"
              placeholder="Recipient state"
              defaultValue={userData.profile.recipient_state}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_city">
              Recipient city
            </label>
            <input
              id="recipient_city"
              className="input"
              type="text"
              name="recipient_city"
              placeholder="Recipient city"
              defaultValue={userData.profile.recipient_city}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_address">
              Recipient address
            </label>
            <input
              id="recipient_address"
              className="input"
              type="text"
              name="recipient_address"
              placeholder="Recipient address"
              defaultValue={userData.profile.recipient_address}
            />
          </div>
          <div className="m-4 flex">
            <label className="w-full" htmlFor="recipient_phone_number">
              Recipient phone number
            </label>
            <input
              id="recipient_phone_number"
              className="input"
              type="tel"
              name="recipient_phone_number"
              placeholder="Recipient phone number"
              defaultValue={userData.profile.recipient_phone_number}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
