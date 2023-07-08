"use client";

import { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { AuthorContestService } from "@/service/author/authorContest.service";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import { DateHelper } from "@/helper/date.helper";

export default function EditContestClient({
  id,
  contestData,
}: {
  id: number;
  contestData: any;
}) {
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
  const contest_visibilitys = [
    {
      id: 1,
      name: "public",
      value: "Public",
    },
    {
      id: 2,
      name: "private",
      value: "Private",
    },
  ];

  // handle
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const slug = e.target.slug.value;
    const description = e.target.description.value;
    const start_at = e.target.start_at.value;
    const end_at = e.target.end_at.value;
    const contest_visibility = e.target.contest_visibility.value;
    const password = e.target.password.value;
    const participant_type = e.target.participant_type.value;

    const data = {
      name,
      slug,
      description,
      start_at,
      end_at,
      contest_visibility,
      password,
      participant_type,
    };
    setMessage("");
    setErrorMessage(null);
    setLoading(true);
    try {
      const authorContestService = await AuthorContestService.update(id, data);
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
                defaultValue={contestData.name}
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
                defaultValue={contestData.slug}
              />
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="description">
                Contest description
              </label>

              <textarea
                id="description"
                className="input"
                name="description"
                placeholder="description"
                cols={30}
                rows={10}
                defaultValue={contestData.description}
              ></textarea>
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
                  defaultValue={contestData.participant_type}
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
              <label className="w-full" htmlFor="contest_visibility">
                Contest visibility
              </label>

              <div className="w-full">
                <select
                  className="w-full input"
                  name="contest_visibility"
                  id="contest_visibility"
                  defaultValue={contestData.contest_visibility}
                >
                  {contest_visibilitys.map((contest_visibility) => (
                    <option
                      key={contest_visibility.id}
                      value={contest_visibility.name}
                    >
                      {contest_visibility.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="password">
                Contest password
              </label>

              <input
                id="password"
                className="input"
                type="text"
                name="password"
                placeholder="password"
                defaultValue={contestData.password}
              />
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
                defaultValue={DateHelper.format(
                  contestData.start_at,
                  "YYYY-MM-DDTHH:MM"
                )}
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
                defaultValue={DateHelper.format(
                  contestData.end_at,
                  "YYYY-MM-DDTHH:MM"
                )}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
