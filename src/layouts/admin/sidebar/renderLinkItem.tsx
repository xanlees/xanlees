/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Link from "next/link";
import { type NavItem } from "@src/layouts/admin/constants/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@src/shadcn/ui/button";
interface LinkItemProps {
  item: NavItem
  setOpen?: ((open: boolean) => void) | undefined
  path: string
  isOpen: boolean
  className?: string | undefined
}

const RenderLinkItem: React.FC<LinkItemProps> = ({
  item,
  setOpen,
  path,
  isOpen,
  className,
}: LinkItemProps) => {
  console.log("isOpen", isOpen);
  return (
    <Link
      key={item.name}
      href={item.name}
      onClick={() => {
        if (setOpen !== undefined) {
          setOpen(false);
        }
      }}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative flex h-12 justify-start",
        path === item.name && "bg-muted font-bold hover:bg-muted",
      )}
    >
      {/* <item.icon className={cn("h-5 w-5", item.color)} /> */}
      <span
        className={cn(
          "absolute left-12 text-base duration-200",
          !isOpen && className,
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};

export default RenderLinkItem;
