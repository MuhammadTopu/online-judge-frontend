"use client";
import Link from "next/link";
import React from "react";

export default function MenuClient({ contest_id }: { contest_id: number }) {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link
              href={`/author/contests/edit/${contest_id}/dashboard`}
              className="link"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={`/author/contests/edit/${contest_id}`} className="link">
              Basic
            </Link>
          </li>
          <li>
            <Link
              href={`/author/contests/edit/${contest_id}/problems`}
              className="link"
            >
              Problems
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
