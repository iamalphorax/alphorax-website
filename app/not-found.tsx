import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
