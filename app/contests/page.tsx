import { ContestService } from "@/service/contest/contest.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getContestData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const contestService = await ContestService.findAll({
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

export default async function Home() {
  const contestData = await getContestData();

  return (
    <main className="container flex flex-col justify-center items-center">
      <div>
        <h1 className="font-bold m-2">Contests</h1>
      </div>

      <div className="w-1/2">
        <table className="table">
          <thead>
            <tr>
              <th>Contest</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {contestData?.map((contest: any) => (
              <tr key={contest.id}>
                <td>
                  <div>
                    <Link className="link" href={`/contests/${contest.id}`}>
                      {contest.name}
                    </Link>
                  </div>
                </td>
                <td>{contest.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
