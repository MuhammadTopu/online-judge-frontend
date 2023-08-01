import { TagService } from "@/service/tag/tag.service";
import CreateProblemClient from "./components/CreateProblemClient";

async function getTagData() {
  try {
    const problemService = await TagService.findAll();

    const responseProblem = problemService.data.data;

    return responseProblem;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}
export default async function Index() {
  const tagData = await getTagData();
  return (
    <div>
      <CreateProblemClient tagData={tagData} />
    </div>
  );
}
