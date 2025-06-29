// app/my-courses/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MyCoursesPage() {
  // 1) your initial, hard-coded list of courses
  const initialCourses = ["CS2030S", "CS2040S"];
  const [courses, setCourses] = useState<string[]>(initialCourses);

  // 2) editing toggles the inline form
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState("");

  // 3) when entering edit mode, copy courses into draft
  const startEditing = () => {
    setDraft(courses);
    setEditing(true);
  };

  // 4) save pulls draft into courses
  const saveChanges = () => {
    setCourses(draft);
    setEditing(false);
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>My Courses</CardTitle>

        {editing ? (
          <Button onClick={saveChanges} variant="default">
            Save
          </Button>
        ) : (
          <Button onClick={startEditing} variant="outline">
            Update Courses
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {editing ? (
          <>
            {/* Draft list with remove buttons */}
            <ul className="space-y-2 mb-4">
              {draft.map((code, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{code}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setDraft((d) => d.filter((_, i) => i !== idx))
                    }
                  >
                    ✕
                  </Button>
                </li>
              ))}
            </ul>

            {/* Add-new-course form */}
            <div className="flex space-x-2">
              <Input
                placeholder="Module Code (e.g. CS2030S)"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button
                variant="secondary"
                disabled={!newCourse}
                onClick={() => {
                  setDraft((d) => [...d, newCourse.trim()]);
                  setNewCourse("");
                }}
              >
                Add
              </Button>
            </div>
          </>
        ) : (
          /* Display saved courses */
          <ul className="list-disc pl-5 space-y-1">
            {courses.map((code, idx) => (
              <li key={idx}>{code}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
