// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Live Stock App!</h1>
      <div className="space-x-4">
        <Link href="/dashboard">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">Go to Dashboard</button>
        </Link>
        <Link href="/about">
          <button className="bg-green-500 text-white px-6 py-2 rounded">Go to About</button>
        </Link>
      </div>
    </div>
  );
}
