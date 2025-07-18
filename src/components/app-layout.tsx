
"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  MessageCircle,
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
import { Button } from './ui/button';

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/chatbot", label: "AI Chatbot", icon: MessageCircle },
];

function TopHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
       <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
          <HeartPulse className="h-6 w-6" />
          <span className="font-headline">Swasth AI</span>
        </Link>
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
    </header>
  )
}

function BottomNavBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t bg-background md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            href={item.href}
            key={item.label}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 text-sm font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopSidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden md:flex flex-col border-r bg-card w-64">
            <div className="flex h-16 shrink-0 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                <HeartPulse className="h-6 w-6" />
                <span className="font-headline">Swasth AI</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto p-2">
                 <nav className="grid items-start gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link href={item.href} key={item.label}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className="w-full justify-start text-base py-6"
                        >
                          <item.icon className="mr-4 h-5 w-5" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
            </div>
             <div className="mt-auto p-4 border-t">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="outline" className="w-full justify-start">
                         <Avatar className="h-8 w-8 mr-2">
                           <AvatarImage src="https://placehold.co/32x32.png" alt="User" data-ai-hint="user avatar" />
                           <AvatarFallback>HW</AvatarFallback>
                         </Avatar>
                         <span>My Account</span>
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Health Worker</DropdownMenuLabel>
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
        </aside>
    )
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <DesktopSidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-muted/40">{children}</main>
        <BottomNavBar />
      </div>
    </div>
  );
}
