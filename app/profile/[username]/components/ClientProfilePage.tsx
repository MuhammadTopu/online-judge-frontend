"use client";
import { DateHelper } from "@/helper/date.helper";
import Link from "next/link";
import React from "react";
import CustomImage from "@/components/reusable/CustomImage";
import { LineChart } from "@/components/Chart/LineChart";

export default function ClientProfilePage({ userData }: { userData: any }) {
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
              {userData?.profile?.city && ", " + userData?.profile?.city}
              {userData?.profile?.country && ", " + userData?.profile?.country}
            </span>

            {userData?.profile?.organization && (
              <>
                <br />
                From{" "}
                <span className="font-bold">
                  {userData?.profile?.organization}
                </span>
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
              <span className="font-bold">
                {DateHelper.diff({
                  date1: userData?.created_at,
                  unit: "years",
                }).toLocaleString()}{" "}
                years ago
              </span>
            </div>
          </div>
          <div style={{ width: "600px" }}>
            <LineChart
              labels={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ]}
              data={[10, 12, 14, 16, 18, 20, 22]}
              label="Submissions"
            />
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
          >
            <CustomImage
              src={userData.avatar}
              alt="avatar"
              style={{
                width: "275px",
                height: "125px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
