
"use client";

import React, from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  MessageCircle,
  PanelLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/chatbot", label: "AI Chatbot", icon: MessageCircle },
];

function SidebarNav({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link href={item.href} key={item.label}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn("w-full justify-start", isCollapsed && "px-2")}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {!isCollapsed && item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  const pathname = usePathname();
  return (
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs p-0">
            <div className="flex h-full flex-col">
              <div className="flex h-[60px] items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                  <HeartPulse className="h-6 w-6" />
                  <span>Swasth AI</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                    <Link
                      href={item.href}
                      key={item.label}
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary")}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )})}
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-grow flex justify-center sm:hidden">
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
             <HeartPulse className="h-6 w-6" />
             <span className="font-headline">Swasth AI</span>
          </Link>
        </div>
         <div className="flex w-full items-center gap-4 md:ml-auto md:flex-initial">
          <div className="ml-auto flex-1 sm:flex-grow-0" />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage src="https://placehold.co/32x32.png" alt="User" data-ai-hint="user avatar" />
                  <AvatarFallback>HW</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem>
                <Link href="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
         </div>
      </header>
  )
}

function DesktopNav() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  return (
    <div className="hidden md:flex min-h-screen w-full">
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 shrink-0 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
            <HeartPulse className="h-6 w-6" />
            {!isCollapsed && <span className="font-headline">Swasth AI</span>}
          </Link>
        </div>
        <div className="flex-1 overflow-auto p-2">
          <SidebarNav isCollapsed={isCollapsed} />
        </div>
        <div className="mt-auto p-2 border-t">
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            className="w-full justify-center"
            size="icon"
          >
            <PanelLeft className={cn("h-5 w-5 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>
      </aside>
    </div>
  )
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (pathname === '/login') {
    return <>{children}</>;
  }
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full">
      <DesktopNav />
      <div className="flex flex-col flex-1 overflow-x-hidden bg-muted/40">
        <MobileNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
