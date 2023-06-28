"use client";
import { Alert } from "@/components/alert/Alert";
import CodeEditor from "@/components/editor/CodeEditor";
import { JudgeService } from "@/service/judge/judge.service";
import React, { useState } from "react";

export default function CodeEditorSection({
  problem_id,
}: {
  problem_id: number;
}) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [result, setResult] = useState<any>();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (op: string = "run", e: any) => {
    e.preventDefault();

    const data = {
      code: code,
      language: language,
      problem_id: problem_id,
      op: op,
    };
    setMessage(null);
    setErrorMessage(null);
    setLoading(true);
    setResult(null);
    try {
      const judgeService = await JudgeService.create(data);
      const resJudgeService = judgeService.data;
      if (resJudgeService.error) {
        setErrorMessage(resJudgeService.message);
        setLoading(false);
      } else {
        console.log(resJudgeService.data);
        setResult(resJudgeService.data);

        setMessage(resJudgeService.data.verdict);
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

  const handleEditorChange = (value: any, event: any) => {
    setCode(value);
  };

  return (
    <>
      <div className="m-2">
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          <option value="cpp" selected>
            C++
          </option>
          <option value="java">Java</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div style={{ border: "solid 1px" }} className="codeeditor m-2">
        <CodeEditor
          language={language}
          handleEditorChange={handleEditorChange}
        />
      </div>

      <div className="m-2">
        <button onClick={(e) => submit("run", e)} className="btn warning">
          Run
        </button>
        <button
          onClick={(e) => submit("submit", e)}
          className="btn danger mx-2"
        >
          Submit
        </button>
      </div>

      <div className="m-2">
        <h2>Result:</h2>
        <div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
        </div>
        <div>
          {result &&
            result.result.map((item: any, index: any) => (
              <div key={index}>
                <div>Test Case: {index + 1}</div>
                <div>Actual output: {item.actualOutput}</div>
                <div>Verdict: {item.verdict}</div>
                <div>Time: {item.time}</div>
                <div>Memory: {item.memory}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
