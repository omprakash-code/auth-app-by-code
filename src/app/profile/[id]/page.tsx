"use client";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        User Profile Page
      </h1>
      <h2 className="text-lg text-gray-300">{params.id}</h2>
    </div>
  );
}
