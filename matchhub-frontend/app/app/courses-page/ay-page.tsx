"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddAcademicYearPage() {
  const router = useRouter();
  const [selectedAY, setSelectedAY] = useState<string | undefined>(undefined);

  const AY_OPTIONS = [
    "AY2025/2026 Semester 1",
    "AY2025/2026 Semester 2",
    "AY2026/2027 Semester 1",
    "AY2026/2027 Semester 2",
    "AY2027/2028 Semester 1",
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* left gutter (sidebar placeholder) */}
      <div className="w-1/6 bg-white"></div>

      {/* main content */}
      <div className="flex-1 bg-white px-12 py-16">
        <h1 className="text-4xl font-bold mb-8">My Courses</h1>

        <div className="max-w-md space-y-6">
          <div>
            <label
              htmlFor="ay-select"
              className="block mb-2 text-sm font-medium"
            >
              Academic Year
            </label>
            <Select
              onValueChange={(value: string) => setSelectedAY(value)}
              value={selectedAY}
              defaultValue=""
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select AY & Semester…" />
              </SelectTrigger>
              <SelectContent>
                {AY_OPTIONS.map((ay) => (
                  <SelectItem key={ay} value={ay}>
                    {ay}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button
              onClick={() => {
                // TODO: persist the selection then navigate
                console.log("Continue with", selectedAY);
                router.push("/app/courses-page");
              }}
              disabled={!selectedAY}
            >
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
