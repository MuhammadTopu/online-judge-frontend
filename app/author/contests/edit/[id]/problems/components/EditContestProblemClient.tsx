"use client";

import { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { AuthorContestService } from "@/service/author/authorContest.service";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import { DateHelper } from "@/helper/date.helper";
import { UtilHelper } from "@/helper/util.helper";
import { AuthorProblemService } from "@/service/author/authorProblem.service";

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

  const [searchLoading, setSearchLoading] = useState(false);
  const [problemSearchResults, setproblemSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [problemId, setProblemId] = useState(0);

  const handleOnInput = async (e: any) => {
    if (e.target.value) {
      setSearchText(e.target.value);
      setShowSearch(true);
      try {
        const authorProblemService = await AuthorProblemService.search(
          e.target.value
        );
        const response = authorProblemService.data;
        const responseData = response.data;
        if (response.error) {
          setSearchLoading(false);
        } else {
          setproblemSearchResults(responseData);
          setSearchLoading(false);
        }
      } catch (error: any) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
          setSearchLoading(false);
        } else {
          setErrorMessage(error.message);
          setSearchLoading(false);
        }
      }
    } else {
      setShowSearch(false);
    }
  };
  const showResult = (e: any) => {
    e.preventDefault();
    handleOnInput(e);
    // return UtilHelper.debounce(handleOnInput, 300);
  };

  const alphabet_lists = [];
  for (let i = 65; i <= 90; i++) {
    alphabet_lists.push({
      id: i,
      value: String.fromCharCode(i),
    });
  }

  const handleSelectProblem = (problem_id: number, problem_name: string) => {
    setProblemId(problem_id);
    setSearchText(problem_name);
    setShowSearch(false);
  };

  // handle
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const problem_id: number = problemId;
    const max_score: number = e.target.max_score.value;
    const sort_order: string = e.target.sort_order.value;

    const data = {
      problem_id,
      max_score,
      sort_order,
    };
    setMessage("");
    setErrorMessage(null);
    setLoading(true);
    try {
      const authorContestService = await AuthorContestService.addProblem(
        id,
        data
      );
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
                onInput={(e) => showResult(e)}
                className="input"
                type="text"
                name="q"
                value={searchText}
                placeholder="e.g. Tree"
              />
            </div>
            {showSearch && (
              <div>
                Showing results for <strong>{searchText}</strong>
                {problemSearchResults &&
                  problemSearchResults.map((problemSearchResult: any) => (
                    <div
                      key={problemSearchResult.id}
                      className="border border-gray-200 rounded-md p-2 m-2"
                    >
                      <div
                        onClick={() =>
                          handleSelectProblem(
                            problemSearchResult.id,
                            problemSearchResult.name
                          )
                        }
                        className="flex justify-between"
                      >
                        <div>{problemSearchResult.name}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

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
