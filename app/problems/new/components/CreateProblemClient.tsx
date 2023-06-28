"use client";

import { Alert } from "@/components/alert/Alert";
import TextEditor from "@/components/editor/TextEditor";
import { ProblemService } from "@/service/problem/problem.service";
import { useState } from "react";

export default function CreateProblemClient() {
  const [statement, setStatement] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStatementChange = (value: string) => {
    console.log(value);
    setStatement(value);
  };

  // handle login
  const handlelogin = async (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    // const statement = e.target.statement.value;
    const explanation = e.target.explanation.value;
    const constraint = e.target.constraint.value;
    const time = e.target.time.value;
    const memory = e.target.memory.value;

    // const sample_test_cases = e.target.sample_test_cases.value;
    // const system_test_cases = e.target.system_test_cases.value;

    const sample_test_cases_input = e.target.sample_test_cases_input.value;
    const sample_test_cases_output = e.target.sample_test_cases_output.value;
    const system_test_cases_input = e.target.system_test_cases_input.value;
    const system_test_cases_output = e.target.system_test_cases_output.value;

    const data = {
      name: name,
      statement: statement,
      explanation: explanation,
      constraint: constraint,
      time: time,
      memory: memory,

      // sample_test_cases: sample_test_cases,
      // system_test_cases: system_test_cases,
      sample_test_cases_input: sample_test_cases_input,
      sample_test_cases_output: sample_test_cases_output,
      system_test_cases_input: system_test_cases_input,
      system_test_cases_output: system_test_cases_output,
    };
    setMessage("");
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
              <TextEditor value={statement} onChange={handleStatementChange} />
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="explanation"
                id=""
                placeholder="Problem explanation"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="constraint"
                id=""
                placeholder="Problem constraint"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="sample_test_cases_input"
                id=""
                placeholder="Sample test cases input"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="sample_test_cases_output"
                id=""
                placeholder="Sample test cases output"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="system_test_cases_input"
                id=""
                placeholder="System test cases input"
              ></textarea>
            </div>
            <div className="m-4">
              <textarea
                className="input"
                name="system_test_cases_output"
                id=""
                placeholder="System test cases output"
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
