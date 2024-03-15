import { ContestService } from "@/service/contest/contest.service";
import { cookies } from "next/headers";
import { AppConfig } from "@/config/app.config";
import { Metadata } from "next";
import Link from "next/link";

async function getContestData(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const contestService = await ContestService.findOne({
      id: id,
      token: token!["value"],
    });

    const responseData = contestService.data.data;

    return responseData;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { contest_id: number };
}): Promise<Metadata> {
  const contestData = await getContestData(params.contest_id);
  return {
    title: `${contestData.name} - ${AppConfig().app.name}`,
    description: AppConfig().app.meta.description,
  };
}
export default async function Index({
  params,
}: {
  params: { contest_id: number };
}) {
  const contestData = await getContestData(params.contest_id);

  return (
    <div>
      <main className="flex justify-center m-2">
        <div className="flex-col">
          <div className="title text-center">{contestData.name}</div>
          <div>
            <p>{contestData.description}</p>
          </div>
          <div>
            <h3 className="font-bold">Problems</h3>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {contestData.ContestProblem?.map((problemData: any) => (
                    <tr key={problemData.id}>
                      <td>
                        <div>
                          <Link
                            className="link"
                            href={`/problems/${problemData.problem.id}`}
                          >
                            {problemData.sort_order}. {problemData.problem.name}
                          </Link>
                        </div>
                      </td>
                      <td>{problemData.max_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
