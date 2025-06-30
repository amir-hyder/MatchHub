'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation";


export default function mentorpage() {
  const router = useRouter();
    
  return (<>
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
              <BreadcrumbLink href="/app">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Mentors</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>My Matches</CardTitle>
              <CardDescription>View all matches</CardDescription>
            </div>
            <Button className="ml-auto" onClick= {() => router.push("/app/mentorpage/matchespage")}>
              <CardAction>Manage matches</CardAction>
            </Button>
          </CardHeader>
          <CardContent>Vaikesh Manimaran</CardContent>
          <CardContent>Syazwan Bin Sazali</CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Mentors Available</CardTitle>
              <CardDescription>View all available mentors</CardDescription>
            </div>
              <Button className="ml-auto" onClick={() => router.push("/app/mentorpage/availablementorpage")}>
                <CardAction>Browse mentors</CardAction>
              </Button>
          </CardHeader>
          <CardContent>Jack Neo</CardContent>
          <CardContent>Timothy Lee</CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Apply for Mentorship</CardTitle>
              <CardDescription>Share your expertise and guide junior students</CardDescription>
            </div>
            <Button className="ml-auto" onClick={() => router.push("/app/mentorpage/applicationpage")}>
              <CardAction>Apply now</CardAction>
            </Button>
          </CardHeader>
          <CardContent>Help students by mentoring them in your areas of interests such as modules or CCAs. You’ll be matched with mentees based on your profile.</CardContent>
        </Card>
      </div>
    </div>
  </>
  )
}
