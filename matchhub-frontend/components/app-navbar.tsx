import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    logo?: {
        url: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
}

const AppNavbar = ({
    logo = {
        url: "/app",
        alt: "logo",
        title: "Pornhub",
    },
    menu = [
        { title: "Home", url: "#" },
        {
            title: "Courses",
            url: "#",
            items: [
                {
                    title: "Add Courses",
                    description: "The latest industry news, updates, and info",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "View my Courses",
                    description: "The latest industry news, updates, and info",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Swap tutorials",
                    description: "Our mission is to innovate and empower the world",
                    icon: <Trees className="size-5 shrink-0" />,
                    url: "#",
                },
            ],
        },
        {
            title: "Peer Matching",
            url: "#",
            items: [
                {
                    title: "Help Center",
                    description: "Get all the answers you need right here",
                    icon: <Zap className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Contact Us",
                    description: "We are here to help you with any questions you have",
                    icon: <Sunset className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Status",
                    description: "Check the current status of our services and APIs",
                    icon: <Trees className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Terms of Service",
                    description: "Our terms and conditions for using our services",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "#",
                },
            ],
        },
        {
            title: "Buddy Finder",
            url: "#",
            items: [
                {
                    title: "View my buddies",
                    description: "Get all the answers you need right here",
                    icon: <Zap className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Contact Us",
                    description: "We are here to help you with any questions you have",
                    icon: <Sunset className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Status",
                    description: "Check the current status of our services and APIs",
                    icon: <Trees className="size-5 shrink-0" />,
                    url: "#",
                },
                {
                    title: "Terms of Service",
                    description: "Our terms and conditions for using our services",
                    icon: <Book className="size-5 shrink-0" />,
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "/app/settings",
        },
    ]
}: NavbarProps) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 shadow">
            <section className="py-4 flex justify-center">
                <div className="container">
                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex justify-between items-center w-full">
                        <div className="flex items-center gap-6">
                            {/* Logo */}
                            <Link href={logo.url} className="flex items-center gap-2">
                                <span className="text-lg font-semibold tracking-tighter">
                                    {logo.title}
                                </span>
                            </Link>
                            <div className="flex items-center">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        {menu.map((item) => renderMenuItem(item))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>

                    </nav>

                    {/* Mobile Menu */}
                    <div className="block lg:hidden">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link href={logo.url} className="flex items-center gap-2">
                                <span className="text-md font-semibold tracking-tighter">
                                    {logo.title}
                                </span>
                            </Link>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href={logo.url} className="flex items-center gap-2">
                                                <span className="text-md font-semibold tracking-tighter">
                                                    {logo.title}
                                                </span>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="flex w-full flex-col gap-4"
                                        >
                                            {menu.map((item) => renderMobileMenuItem(item))}
                                        </Accordion>


                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};

export { AppNavbar };
