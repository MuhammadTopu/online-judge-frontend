import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Contest page</h1>
      <Link className="link" href="/contests/create">
        Create new contest
      </Link>
      <br />
      <Link className="link" href="/problems/create">
        Create new problem
      </Link>
    </main>
  );
}
