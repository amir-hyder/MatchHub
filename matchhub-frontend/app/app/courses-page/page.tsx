"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">My Courses</h1>

      <div className="space-y-6">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">
              AY2025/2026 Semester 1
            </h2>
            <Button variant="outline">Manage Courses</Button>
          </CardContent>
        </Card>

        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => {
            // replace this path with wherever you mounted your “Add AY” page
            router.push("/app/courses-page/ay-page/");
          }}
        >
          {" "}
          Add an academic year
        </Button>
      </div>
    </div>
  );
}
