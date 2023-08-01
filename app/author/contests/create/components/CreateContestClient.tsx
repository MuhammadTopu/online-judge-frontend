"use client";

import { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { AuthorContestService } from "@/service/author/authorContest.service";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";

export default function CreateContestClient() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const participant_types = [
    {
      id: 1,
      name: "individual",
      value: "Individual",
    },
    {
      id: 2,
      name: "team",
      value: "Team",
    },
  ];

  // handle
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const slug = e.target.slug.value;
    const start_at = e.target.start_at.value;
    const end_at = e.target.end_at.value;
    const participant_type = e.target.participant_type.value;

    const data = {
      name,
      slug,
      start_at,
      end_at,
      participant_type,
    };
    setMessage("");
    setErrorMessage(null);
    setLoading(true);
    try {
      const authorContestService = await AuthorContestService.create(data);
      const response = authorContestService.data;
      if (response.error) {
        CustomToast.show(response.message);
        setErrorMessage(response.message);
        setLoading(false);
      } else {
        CustomToast.show(response.message);
        setMessage(response.message);
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
    <div>
      <main className="flex justify-center container">
        <div className="self-center">
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}

          <form onSubmit={handleSubmit} method="post">
            <CustomToastContainer />
            <button type="submit" className="m-4 btn primary">
              Submit
            </button>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="name">
                Contest name
              </label>

              <input
                id="name"
                className="input"
                type="text"
                name="name"
                placeholder="name"
              />
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="slug">
                Contest slug
              </label>

              <input
                id="slug"
                className="input"
                type="text"
                name="slug"
                placeholder="slug"
              />
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="participant_type">
                Contest participation type
              </label>

              <div className="w-full">
                <select
                  className="w-full input"
                  name="participant_type"
                  id="participant_type"
                >
                  {participant_types.map((participant_type) => (
                    <option
                      key={participant_type.id}
                      value={participant_type.name}
                    >
                      {participant_type.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="start_at">
                Contest start time
              </label>

              <input
                id="start_at"
                className="input"
                type="datetime-local"
                name="start_at"
                placeholder="start time"
              />
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="end_at">
                Contest end time
              </label>

              <input
                id="end_at"
                className="input"
                type="datetime-local"
                name="end_at"
                placeholder="end time"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
