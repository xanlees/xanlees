/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { SideNav } from "@src/layouts/admin/sidebar/side-nav";
import { cn } from "@/lib/utils";
import { useSidebar } from "@src/shadcn/hooks/useSidebar";
import { Separator } from "@src/shadcn/ui/separator";
import { Button } from "@src/shadcn/ui/button";
import { ChevronRight } from "lucide-react";
// import { useMenu } from "@refinedev/core";
import { resources } from "../constants/side-nav";
interface SidebarProps {
  className?: string
}

const Timeout = 500;
export default function Sidebar({ className }: SidebarProps) {
  // const { menuItems } = useMenu();
  const { isOpen, toggle } = useSidebar();
  const [swith, setSwitch] = useState(false);
  const handleToggle = () => {
    setSwitch(true);
    toggle();
    setTimeout(() => {
      setSwitch(false);
    }, Timeout);
  };
  return (
    <nav
      className={cn("relative hidden h-screen border-r pt-16 md:block", swith && "duration-500", isOpen ? "w-72" : "w-[78px]", className)}
    >
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav
              className="transition-all duration-300 opacity-0 text-background group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={resources}
            />
          </div>
        </div>
      </div>
      <div className="absolute w-full px-3 space-y-2 mt-30 bottom-5">
        <Separator />
        <Button onClick={handleToggle} className={cn("h-10 w-full bg-foreground", isOpen && "rotate-180")}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
}

