"use client";

import { useState } from "react";
import { Alert } from "@/components/alert/Alert";
import TextEditor from "@/components/editor/TextEditor";
import { AuthorProblemService } from "@/service/author/authorProblem.service";
import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { CustomToast } from "@/util/Toast/CustomToast";
import CustomSelect from "@/components/CustomSelect/CustomSelect";

export default function CreateProblemClient({ tagData }: { tagData: any }) {
  const [statement, setStatement] = useState("");
  const [input_format, setInputFormat] = useState("");
  const [output_format, setOutputFormat] = useState("");
  const [note, setNote] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState<string[]>([]);

  const handleStatementChange = (value: string) => {
    setStatement(value);
  };
  const handleInputFormatChange = (value: string) => {
    setInputFormat(value);
  };
  const handleOutputFormatChange = (value: string) => {
    setOutputFormat(value);
  };
  const handleNoteChange = (value: string) => {
    setNote(value);
  };

  const handleTagChange = (e: any) => {
    const values = e.map((option: any) => {
      return option.value;
    });
    setTags(values);
  };

  const difficultes = [
    {
      id: 1,
      name: "easy",
      value: "Easy",
    },
    {
      id: 2,
      name: "medium",
      value: "Medium",
    },
    {
      id: 3,
      name: "hard",
      value: "Hard",
    },
  ];

  // handle
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const time_limit = e.target.time_limit.value;
    const memory_limit = e.target.memory_limit.value;
    const difficulty = e.target.difficulty.value;

    const sample_test_cases_input = e.target.sample_test_cases_input.value;
    const sample_test_cases_output = e.target.sample_test_cases_output.value;
    const system_test_cases_input = e.target.system_test_cases_input.value;
    const system_test_cases_output = e.target.system_test_cases_output.value;

    const data = {
      name: name,
      statement: statement,
      tags: tags,
      time_limit: time_limit,
      memory_limit: memory_limit,
      input_format: input_format,
      output_format: output_format,
      note: note,
      difficulty: difficulty,

      sample_test_cases_input: sample_test_cases_input,
      sample_test_cases_output: sample_test_cases_output,
      system_test_cases_input: system_test_cases_input,
      system_test_cases_output: system_test_cases_output,
    };
    setMessage("");
    setErrorMessage(null);
    setLoading(true);
    try {
      const authorProblemService = await AuthorProblemService.create(data);
      const resProblemData = authorProblemService.data;
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
                Problem name
              </label>

              <input
                id="name"
                className="input"
                type="text"
                name="name"
                placeholder="Problem name"
              />
            </div>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="difficulty">
                Problem difficulty
              </label>

              <div className="w-full">
                <select
                  className="w-full input"
                  name="difficulty"
                  id="difficulty"
                >
                  {difficultes.map((difficulty) => (
                    <option key={difficulty.id} value={difficulty.name}>
                      {difficulty.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="time_limit">
                Time limit (seconds)
              </label>
              <input
                className="input"
                type="text"
                name="time_limit"
                id="time_limit"
                defaultValue={1}
                placeholder="Time limit"
              />
            </div>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="memory_limit">
                Memory limit (megabytes)
              </label>
              <input
                className="input"
                type="text"
                name="memory_limit"
                defaultValue={64}
                placeholder="Memory limit"
              />
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="statement">
                Statement
              </label>
              <div className="w-full">
                <TextEditor
                  id="statement"
                  value={statement}
                  onChange={handleStatementChange}
                />
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="input_format">
                Input format
              </label>
              <div className="w-full">
                <TextEditor
                  id="input_format"
                  value={input_format}
                  onChange={handleInputFormatChange}
                />
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="output_format">
                Output format
              </label>
              <div className="w-full">
                <TextEditor
                  id="output_format"
                  value={output_format}
                  onChange={handleOutputFormatChange}
                />
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="note">
                Note
              </label>
              <div className="w-full">
                <TextEditor
                  id="note"
                  value={note}
                  onChange={handleNoteChange}
                />
              </div>
            </div>

            <div className="m-4 flex">
              <label className="w-full" htmlFor="sample_test_cases_input">
                Sample test cases input
              </label>

              <textarea
                className="input"
                name="sample_test_cases_input"
                id="sample_test_cases_input"
                placeholder="Sample test cases input"
              ></textarea>
            </div>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="sample_test_cases_output">
                Sample test cases output
              </label>
              <textarea
                className="input"
                name="sample_test_cases_output"
                id="sample_test_cases_output"
                placeholder="Sample test cases output"
              ></textarea>
            </div>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="system_test_cases_input">
                System test cases input
              </label>
              <textarea
                className="input"
                name="system_test_cases_input"
                id="system_test_cases_input"
                placeholder="System test cases input"
              ></textarea>
            </div>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="system_test_cases_output">
                System test cases output
              </label>
              <textarea
                className="input"
                name="system_test_cases_output"
                id="system_test_cases_output"
                placeholder="System test cases output"
              ></textarea>
            </div>
            <div className="m-4 flex">
              <label className="w-full" htmlFor="tags">
                Tags
              </label>

              <div className="w-full">
                <CustomSelect
                  onChange={handleTagChange}
                  options={tagData.map((tag: any) => {
                    return {
                      value: tag.name,
                      label: tag.name,
                    };
                  })}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
