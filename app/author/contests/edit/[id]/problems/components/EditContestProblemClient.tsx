"use client";

import { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { AuthorContestService } from "@/service/author/authorContest.service";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import { DateHelper } from "@/helper/date.helper";

export default function EditContestProblemClient({
  id,
  contestData,
}: {
  id: number;
  contestData: any;
}) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const alphabet_lists = [];
  for (let i = 65; i <= 90; i++) {
    alphabet_lists.push({
      id: i,
      value: String.fromCharCode(i),
    });
  }

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
              <label className="w-full" htmlFor="q">
                Find a problem
              </label>

              <input
                id="q"
                className="input"
                type="text"
                name="q"
                placeholder="e.g. Tree"
              />
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="sort_order">
                Problem order on the list
              </label>

              <div className="w-full">
                <select
                  className="w-full input"
                  name="sort_order"
                  id="sort_order"
                  defaultValue={"A"}
                >
                  {alphabet_lists.map((alphabet_list) => (
                    <option key={alphabet_list.id} value={alphabet_list.value}>
                      {alphabet_list.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="max_score">
                Problem score
              </label>

              <input
                id="max_score"
                className="input"
                type="text"
                name="max_score"
                placeholder="Score"
                defaultValue={100}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
