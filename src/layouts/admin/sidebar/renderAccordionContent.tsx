/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import Link from "next/link";
import { type NavItem } from "@src/layouts/admin/constants/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@src/shadcn/ui/button";
import { AccordionContent } from "@radix-ui/react-accordion";

interface AccordionContentProps {
  item: NavItem
  setOpen: ((open: boolean) => void) | undefined
  path: string
  isOpen: boolean
  className?: string | undefined
}

const RenderAccordionContent: React.FC<AccordionContentProps> = ({
  item,
  setOpen,
  path,
  isOpen,
  className,
}: AccordionContentProps) => {
  return (
    <AccordionContent className="pb-1 mt-2 ml-4 space-y-4">
      {item.children?.map((child) => (
        <Link
          key={child.title}
          href={child.name}
          onClick={() => {
            if (setOpen !== undefined) {
              setOpen(false);
            }
          }}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "group flex h-12 justify-start gap-x-3",
            path === child.href && "bg-muted font-bold hover:bg-muted",
          )}
        >
          <item.icon className={cn("h-5 w-5", child.color)} />
          <div className={cn("text-base duration-200", !isOpen && className)}>
            {child.title}
          </div>
        </Link>
      ))}
    </AccordionContent>
  );
};

export default RenderAccordionContent;
