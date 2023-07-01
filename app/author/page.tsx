import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Author page</h1>
      <div className="flex">
        <div>
          <Link className="link" href="/author/contests">
            Manage contest
          </Link>
        </div>

        <div className="mx-2">
          <Link className="link" href="/author/problems">
            Manage problem
          </Link>
        </div>
      </div>
    </main>
  );
}
