
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
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/chatbot", label: "AI Chatbot", icon: MessageCircle },
];

function DesktopSidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden md:flex flex-col border-r bg-card w-64">
            <div className="flex h-16 shrink-0 items-center border-b px-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
                <HeartPulse className="h-6 w-6" />
                <span className="font-headline">Swasth AI</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto p-2">
                 <nav className="grid items-start gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
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
                       <DropdownMenuItem asChild>
                        <Link href="/login">Logout</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
        </aside>
    )
}

function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
       <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
          <HeartPulse className="h-6 w-6" />
          <span className="font-headline">Swasth AI</span>
        </Link>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Avatar className="h-8 w-8">
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
           <DropdownMenuItem asChild>
            <Link href="/login">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}


function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-16 items-center justify-around border-t bg-background md:hidden">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            href={item.href}
            key={item.label}
            className={cn(
              "flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <DesktopSidebar />
      <div className="flex flex-col flex-1">
         <MobileHeader />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-muted/40">{children}</main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
