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
          <div
            className="statement"
            dangerouslySetInnerHTML={{ __html: problemData.statement }}
          ></div>
        </div>
        <div>
          <CodeEditorSection problem_id={problemData.id} />
        </div>
      </main>
    </div>
  );
}
