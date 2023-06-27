import { ProblemService } from "@/service/problem/problem.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getProblemData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const problemService = await ProblemService.findAll({
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
export default async function Home() {
  const problemData = await getProblemData();

  console.log(problemData);

  return (
    <main className="container">
      <h1>Problem</h1>
      <Link className="link" href="/problems/new">
        Create new problem
      </Link>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {problemData?.map((problem: any) => (
              <tr key={problem.id}>
                <td>{problem.name}</td>
                <td>
                  <Link href={`/problems/${problem.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
