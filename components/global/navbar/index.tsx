import { SignOutButton } from "@/app/auth/_components/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function DashboardNavbar() {
  const { setTheme } = useTheme();
  const { data: session } = authClient.useSession();
  const initialName = session?.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <nav className="p-4 flex bg-sidebar border-b items-center justify-between sticky top-0 z-10">
        <SidebarTrigger />
        <div className="flex items-center gap-4">
          {/* THEME MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border-2 rounded-full" size="lg">
                <AvatarImage src={session?.user.image as string} />
                <AvatarFallback className="text-2xl font-semibold">
                  {initialName}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align="end" className="flex">
              <div className="flex p-4 gap-4">
                <div>
                  <Avatar className="border-2 rounded-full" size="lg">
                    <AvatarImage src={session?.user.image as string} />
                    <AvatarFallback className="text-2xl font-semibold">
                      {initialName}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h4 className="text-md font-semibold">
                      {session?.user.name}
                    </h4>
                    <p className="text-md text-muted-foreground">
                      {session?.user.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant={"outline"} size={"sm"} className="flex">
                      <Link href={`/u/${session?.user.name.replace(/\s+/g, "-")}/profile`} className="flex items-center gap-2">
                        <Settings /> Manage Account
                      </Link>
                    </Button>
                    <SignOutButton size={"sm"} variant={"outline"} />
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
