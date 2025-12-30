"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/events"); // redirect if not logged in
    }
  }, [session, router]);

  if (!session) return <p>Redirecting...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Create Event Page</h1>
      <p>Form for creating a new event will go here.</p>
    </div>
  );
}
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