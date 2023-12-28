/* eslint-disable @typescript-eslint/naming-convention */
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@src/layouts/admin/navbar/mobile-sidebar";
import Link from "next/link";
import { Backpack } from "lucide-react";
import { Button } from "@src/shadcn/ui/button";
export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 border-b supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
      <nav className="flex items-center justify-between h-16 px-4">
        <Link
          href={"/user"}
          className="items-center justify-between hidden gap-2 md:flex"
        >
          <Backpack className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Workhub Link</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="text-sm"
          >
              Setting
          </Button>
        </div>
      </nav>
    </div>
  );
}
