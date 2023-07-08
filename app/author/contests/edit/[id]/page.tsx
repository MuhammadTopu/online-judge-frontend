import { cookies } from "next/headers";

import { AuthorContestService } from "@/service/author/authorContest.service";
import EditContestClient from "./components/EditContestClient";

async function getContestData(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const authorContestService = await AuthorContestService.findOne({
      id: id,
      token: token!["value"],
    });

    const responseProblem = authorContestService.data.data;

    return responseProblem;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

export default async function Index({ params }: { params: { id: number } }) {
  const contestData = await getContestData(params.id);
  return (
    <div>
      <EditContestClient id={params.id} contestData={contestData} />
    </div>
  );
}
