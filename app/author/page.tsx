import { AuthorProfileService } from "@/service/author/authorProfile.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getAuthorProfileData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const authorProfileService = await AuthorProfileService.findAll({
      token: token!["value"],
    });

    const responseProblem = authorProfileService.data.data;

    return responseProblem;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}
export default async function Home() {
  const profileData = await getAuthorProfileData();
  return (
    <main className="container">
      <h1>Author page</h1>
      <div className="flex">
        <div>
          <Link className="link" href="/author/contests">
            Manage contest ({profileData.contest_count})
          </Link>
        </div>

        <div className="mx-2">
          <Link className="link" href="/author/problems">
            Manage problem ({profileData.problem_count})
          </Link>
        </div>
      </div>
    </main>
  );
}
