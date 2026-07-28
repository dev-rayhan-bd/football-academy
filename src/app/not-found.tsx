"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center space-y-6 max-w-md">
        
        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-primary">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="text-gray-400 text-sm">
          The page you are looking for doesn’t exist or has been moved.
          Please check the URL or go back to the homepage.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center pt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
          >
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="bg-primary text-black hover:opacity-90"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}