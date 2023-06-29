import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Administration page</h1>
      <div className="flex">
        <div>
          <Link className="link" href="/administration/contests/create">
            Create new contest
          </Link>
        </div>

        <div className="mx-2">
          <Link className="link" href="/administration/problems/create">
            Create new problem
          </Link>
        </div>
      </div>
    </main>
  );
}
