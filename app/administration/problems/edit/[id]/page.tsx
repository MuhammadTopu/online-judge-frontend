import { cookies } from "next/headers";

import { ProblemService } from "@/service/problem/problem.service";
import EditProblemClient from "./components/EditProblemClient";

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
      <EditProblemClient id={params.id} problemData={problemData} />
    </div>
  );
}
