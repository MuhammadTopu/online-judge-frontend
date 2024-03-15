import { cookies } from "next/headers";

import EditProblemClient from "./Components/EditProblemClient";
import { TagService } from "@/service/tag/tag.service";
import { AuthorProblemService } from "@/service/author/authorProblem.service";

async function getProblemData(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const authorProblemService = await AuthorProblemService.findOne({
      id: id,
      token: token!["value"],
    });

    const responseProblem = authorProblemService.data.data;

    return responseProblem;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}
async function getTagData() {
  try {
    const authorProblemService = await TagService.findAll();

    const responseProblem = authorProblemService.data.data;

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

  const tagData = await getTagData();
  return (
    <div>
      <EditProblemClient
        id={params.id}
        problemData={problemData}
        tagData={tagData}
      />
    </div>
  );
}
