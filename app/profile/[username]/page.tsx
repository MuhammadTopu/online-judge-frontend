import { UserService } from "@/service/user/user.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getUserData(username: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const userService = await UserService.findOneByUsername({
      username: username,
      token: token!["value"],
    });

    const responseUser = userService.data.data;

    return responseUser;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

export default async function Home({
  params,
}: {
  params: { username: string };
}) {
  const userData = await getUserData(params.username);
  console.log(userData);

  return (
    <main className="container">
      <div className="flex justify-evenly">
        <div>
          <div>
            <span className="font-bold text-lg text-[2.5rem]">
              <Link href={`/profile/${userData?.username}`}>
                {userData?.username}
              </Link>
            </span>
            <br />
            <span>
              {userData?.fname} {userData?.lname}
              {userData?.city && "," + userData?.city}
              {userData?.country}
            </span>

            {userData?.university && (
              <>
                <br />
                <span>From {userData?.university}</span>
              </>
            )}
          </div>
          <div>
            Contest rating: <span className="font-bold">{userData?.score}</span>
            <br />
            <span>{userData?.email}</span>
            {userData?.availability && (
              <>
                <br />
                <span>Online status: {userData?.availability}</span>
              </>
            )}
            <div>
              Registered:{" "}
              <span className="font-bold">{userData?.created_at}</span>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              float: "right",
              border: "1px solid #B9B9B9",
              width: "300px",
              minHeight: "150px",
              padding: "12.5px",
              position: "relative",
              marginBottom: "1em",
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}
