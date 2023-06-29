import { Alert } from "@/components/alert/Alert";
import CodeEditor from "@/components/editor/CodeEditor";
import { ProblemService } from "@/service/problem/problem.service";
import { cookies } from "next/headers";
import CodeEditorSection from "./components/CodeEditorSection";

async function getProblemData(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const problemService = await ProblemService.findOne({
      id: id,
      token: token!["value"],
    });

    const responseProblem = problemService.data.data;

    return responseProblem;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}
export default async function Index({ params }: { params: { id: number } }) {
  const problemData = await getProblemData(params.id);

  return (
    <div>
      <main className="flex justify-between m-2">
        <div className="flex-col">
          <div className="title text-center">{problemData.name}</div>
          <div className="text-center">
            time limit per test: {problemData.time} seconds
          </div>
          <div className="text-center">
            memory limit per test: {problemData.memory} megabytes
          </div>
          <br />
          {problemData.statement && (
            <>
              <div
                className="statement"
                dangerouslySetInnerHTML={{ __html: problemData.statement }}
              ></div>
              <br />
            </>
          )}

          <div className="flex justify-around">
            {problemData.input_format && (
              <div className="flex-col">
                <div className="font-bold">Input</div>
                <div
                  dangerouslySetInnerHTML={{ __html: problemData.input_format }}
                ></div>
              </div>
            )}
            {problemData.output_format && (
              <div className="flex-col">
                <div className="font-bold">Output</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: problemData.output_format,
                  }}
                ></div>
              </div>
            )}
          </div>
          <br />
          {problemData.sample_test_cases && (
            <>
              <div>
                <h1 className="font-bold">Examples</h1>
                <div
                  style={{ border: "solid 1px" }}
                  className="flex justify-around"
                >
                  <div className="flex-col">
                    <div className="font-bold">Input</div>
                    {problemData.sample_test_cases.map((item: any) => {
                      return (
                        <>
                          <div>{item.input}</div>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex-col">
                    <div className="font-bold">Output</div>
                    {problemData.sample_test_cases.map((item: any) => {
                      return (
                        <>
                          <div>{item.output}</div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <br />
            </>
          )}

          {problemData.note && (
            <div>
              <h1 className="font-bold">Note</h1>
              <div
                className="note"
                dangerouslySetInnerHTML={{ __html: problemData.note }}
              ></div>
            </div>
          )}
        </div>
        <div>
          <CodeEditorSection problem_id={problemData.id} />
        </div>
      </main>
    </div>
  );
}
