"use client"

import * as React from "react"
import {
    Home,
    BookOpen,
    Bot,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Home",
            url: "/app",
            icon: Home,
        },
        {
            title: "My Info",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "My Courses",
                    url: "#",
                },
                {
                    title: "My Mentors",
                    url: "#",
                },
                {
                    title: "My Interests",
                    url: "#",
                },
                {
                    title: "My CCAs",
                    url: "#",
                },
            ],
        },
        {
            title: "Mentors",
            url: "/app",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "View Matches",
                    url: "#",
                },
                {
                    title: "Mentors Available",
                    url: "#",
                },
                {
                    title: "Apply for Mentorship",
                    url: "#",
                }

            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/app">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Documentation</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {user && <NavUser user={user} />}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
