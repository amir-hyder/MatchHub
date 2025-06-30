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
/* import { Link } from "lucide-react" */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  /* Dynamic for courses */
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    setCourses(["CS2030S", "CS2040S"]);
  }, []);

  /* Dynamic for mentors */
  const [mentors, setMentors] = useState<string[]>([]);

  useEffect(() => {
    setMentors(["Darius Wong", "Daniel Zhou"]);
  }, []);

  /* Dynamic for interests/CCAs */
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    setInterests(["Ultimate Frisbee", "Tchoukball"]);
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
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>View my current courses</CardDescription>
              <CardAction>Update courses</CardAction>
            </CardHeader>
            {courses.map((course) => {
              return (
                <CardContent key={course}>
                  <p>{course}</p>
                </CardContent>
              );
            })}
          </Card>

          <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>My Mentors</CardTitle>
                <CardDescription>View my current mentors</CardDescription>
              </div>
              <Button
                className="ml-auto"
                onClick={() => router.push("/app/mentorpage")}
              >
                Find mentor
              </Button>
            </CardHeader>
            {mentors.map((mentor) => {
              return (
                <CardContent key={mentor}>
                  <p>{mentor}</p>
                </CardContent>
              );
            })}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Interests/CCAs</CardTitle>
              <CardDescription>View my current interests/CCAs</CardDescription>
              <CardAction>Update interests/CCAs</CardAction>
            </CardHeader>
            {interests.map((interest) => {
              return (
                <CardContent key={interest}>
                  <p>{interest}</p>
                </CardContent>
              );
            })}
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
