import Link from "next/link";
import "./globals.css";
import { UserService } from "@/service/user/user.service";
import { cookies } from "next/headers";

export const metadata = {
  title: "Sojeb oj",
  description: "Participate in contests and win exciting prizes",
};

// async function getUserDetailsData() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }
async function getUserDetailsData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const userService = await UserService.getUserDetails({
      token: token!["value"],
    });

    const userData = userService.data.data;

    return userData;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserDetailsData();

  return (
    <html lang="en">
      <body>
        <header className="flex m-4">
          <div>
            <Link href="/">
              <h1 className="text-center text-4xl font-bold text-red-600">
                SojebOJ
              </h1>
            </Link>
          </div>
        </header>

        <nav className="navbar">
          <Link className="nav-item" href="/">
            Home
          </Link>
          <Link className="nav-item" href="/contests">
            Contest
          </Link>
          <Link className="nav-item" href="/problems">
            Problems
          </Link>

          {userData ? (
            <>
              <Link className="nav-item" href="/profile">
                {userData?.username}
              </Link>
              <Link className="nav-item" href="/administration/contests">
                Administration
              </Link>
              <Link className="nav-item" href="/auth/logout">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-item" href="/auth/login">
                Login
              </Link>
              <Link className="nav-item" href="/auth/register">
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="mt-6"></div>

        {children}
      </body>
    </html>
  );
}
