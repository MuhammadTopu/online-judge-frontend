"use client";

import { Alert } from "@/components/alert/Alert";
import { ProblemService } from "@/service/problem/problem.service";

import { useState } from "react";
export default async function Index() {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle login
  const handlelogin = async (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const statement = e.target.statement.value;
    const explanation = e.target.explanation.value;
    const constraint = e.target.constraint.value;
    const time = e.target.time.value;
    const memory = e.target.memory.value;

    const sample_test_cases = e.target.sample_test_cases.value;
    const system_test_cases = e.target.system_test_cases.value;

    const data = {
      name: name,
      statement: statement,
      explanation: explanation,
      constraint: constraint,
      time: time,
      memory: memory,

      sample_test_cases: sample_test_cases,
      system_test_cases: system_test_cases,
    };
    setMessage(null);
    setErrorMessage(null);
    setLoading(true);
    try {
      const problemService = await ProblemService.create(data);
      const resProblemData = problemService.data;
      if (resProblemData.error) {
        setErrorMessage(resProblemData.message);
        setLoading(false);
      } else {
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

          <form onSubmit={handlelogin} method="post">
            <div className="m-4">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Problem name"
              />
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="statement"
                id=""
                cols={30}
                rows={10}
                placeholder="Problem statement"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="explanation"
                id=""
                cols={30}
                rows={10}
                placeholder="Problem explanation"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="constraint"
                id=""
                cols={30}
                rows={10}
                placeholder="Problem constraint"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="sample_test_cases"
                id=""
                cols={30}
                rows={10}
                placeholder="Sample test cases"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="system_test_cases"
                id=""
                cols={30}
                rows={10}
                placeholder="System test cases"
              ></textarea>
            </div>
            <div className="m-4">
              <input
                className="input"
                type="text"
                name="time"
                defaultValue={1}
                placeholder="Time limit"
              />
            </div>
            <div className="m-4">
              <input
                className="input"
                type="text"
                name="memory"
                // defaultValue={256}
                defaultValue={100}
                placeholder="Memory limit"
              />
            </div>

            <button type="submit" className="m-4 btn primary">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
