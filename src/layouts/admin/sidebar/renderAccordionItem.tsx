/* eslint-disable @typescript-eslint/naming-convention */
import { type NavItem } from "@src/layouts/admin/constants/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@src/shadcn/ui/button";
import {
  AccordionItem,
  AccordionTrigger,
} from "@src/layouts/admin/constants/subnav-accordion";
import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import renderAccordionContent from "./renderAccordionContent";

interface AccordionItemProps {
  item: NavItem
  isOpen: boolean
  className?: string | undefined
  setOpen?: ((open: boolean) => void) | undefined
  path: string
}

const RenderAccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  className,
  setOpen,
  path,
}: AccordionItemProps) => {
  return (
    <AccordionItem value={item.title} className="border-none">
      <AccordionTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline",
        )}
      >
        <div>
          <item.icon className={cn("h-5 w-5", item.color)} />
        </div>
        <div
          className={cn(
            "absolute left-12 text-base duration-200",
            !isOpen && className,
          )}
        >
          {item.title}
        </div>

        {isOpen && (
          <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 shrink-0 text-muted-foreground" />
        )}
      </AccordionTrigger>
      {renderAccordionContent({ item, setOpen, path, isOpen, className })}
    </AccordionItem>
  );
};

export default RenderAccordionItem;

