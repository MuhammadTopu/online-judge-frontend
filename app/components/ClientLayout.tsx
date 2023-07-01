"use client";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";

export default function ClientLayout({
  userData,
  children,
}: {
  userData: any;
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    try {
      const userService = UserService.logout();
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        // console.log(error.response.data.message);
      }
      return null;
    }
  };

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
              <div className="dropdown">
                <button className="dropbtn nav-item">
                  {userData?.username}
                </button>
                <div className="dropdown-content">
                  <Link
                    className="dropdown-item"
                    href={`/profile/${userData?.username}`}
                  >
                    Profile
                  </Link>
                  <Link className="dropdown-item" href={`/settings`}>
                    Settings
                  </Link>
                  <Link className="dropdown-item" href={`/administration`}>
                    Administration
                  </Link>
                  <button
                    className="dropdown-item w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="dropdown">
                <button className="dropbtn nav-item">Account</button>
                <div className="dropdown-content">
                  <Link className="dropdown-item" href="/auth/login">
                    Login
                  </Link>
                  <Link className="dropdown-item" href="/auth/register">
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}
        </nav>

        <div className="mt-6"></div>

        {children}
      </body>
    </html>
  );
}
