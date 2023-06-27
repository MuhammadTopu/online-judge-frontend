import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Sojeb oj",
  description: "Participate in contests and win exciting prizes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <Link className="nav-item" href="/auth/login">
            Login
          </Link>
          <Link className="nav-item" href="/auth/register">
            Register
          </Link>
        </nav>

        <div className="mt-6"></div>

        {children}
      </body>
    </html>
  );
}
