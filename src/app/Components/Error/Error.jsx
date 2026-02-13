"use client";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Error Image */}
      <img
        src="/Images/Error.png"
        alt="error"
        className="w-full max-w-md mb-8"
      />

      {/* Text Container */}
      <div className="flex flex-col items-center gap-6 max-w-lg">
        <h3 className="text-3xl sm:text-4xl font-semibold text-black">
          Oops! Page not found
        </h3>
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
          The page you are looking for might have been removed or temporarily unavailable.
        </p>

        {/* Back to Home Button */}
        <Button
          type="primary"
          size="large"
          className="bg-purple-600 border-none hover:bg-purple-700"
          onClick={() => router.push("/")}
        >
          Back to HomePage
        </Button>
      </div>
    </div>
  );
};

export default Error;
