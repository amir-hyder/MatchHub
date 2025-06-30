"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    setCourses(["CS2030S", "CS2040S", "CS1010"]);
  }, []);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center">
              {/* Title + description on the left */}
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>View my current courses</CardDescription>
              </div>

              {/* Button on the right */}
              <div className="ml-auto">
                <Button
                  size="sm"
                  onClick={() => router.push("/app/courses-page/")}
                >
                  Update courses
                </Button>
              </div>
            </CardHeader>

            {/* … rest of your CardContent … */}
            {courses.map((course) => (
              <CardContent key={course}>
                <p>{course}</p>
              </CardContent>
            ))}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Mentors</CardTitle>
              <CardDescription>View my current mentors</CardDescription>
              <CardAction>Find mentor</CardAction>
            </CardHeader>
            <CardContent>
              <p>Darius Wong</p>
            </CardContent>
            <CardFooter>
              <p>Daniel Zhou</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Interests/CCAs</CardTitle>
              <CardDescription>View my current interests/CCAs</CardDescription>
              <CardAction>Update interests/CCAs</CardAction>
            </CardHeader>
            <CardContent>
              <p>Ultimate Frisbee</p>
            </CardContent>
            <CardFooter>
              <p>Tchoukball</p>
            </CardFooter>
          </Card>
        </div>

        {/*
      <Card> 
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Content</p>
        </CardFooter>
      </Card>
      */}
      </div>
    </>
  );
}
