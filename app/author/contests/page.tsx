import { AuthorContestService } from "@/service/author/authorContest.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getContestData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const authorContestService = await AuthorContestService.findAll({
      token: token!["value"],
    });

    const response = authorContestService.data.data;

    return response;
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

      <div>
        <Link href="/author/contests/create" className="link">
          Create new contest
        </Link>
      </div>

      <div className="w-1/2">
        <table className="table">
          <thead>
            <tr>
              <th>Contest</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contestData?.map((contest: any) => (
              <tr key={contest.id}>
                <td>
                  <div className="flex justify-between">
                    <div>
                      <Link className="link" href={`/contests/${contest.id}`}>
                        {contest.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td>
                  <Link
                    href={`/author/contests/edit/${contest.id}`}
                    className="btn primary"
                  >
                    Edit
                  </Link>
                  <button className="ml-2 btn danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
