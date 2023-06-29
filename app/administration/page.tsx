import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Administration page</h1>
      <div className="flex">
        <div>
          <Link className="link" href="/administration/contests">
            Manage contest
          </Link>
        </div>

        <div className="mx-2">
          <Link className="link" href="/administration/problems">
            Manage problem
          </Link>
        </div>
      </div>
    </main>
  );
}
