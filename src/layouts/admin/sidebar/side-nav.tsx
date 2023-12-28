/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines */
/* eslint-disable multiline-ternary */
/* eslint-disable max-lines-per-function */
import { type NavItem } from "@src/layouts/admin/constants/types";
import { usePathname } from "next/navigation";
import { useSidebar } from "@src/shadcn/hooks/useSidebar";
import { useEffect, useState } from "react";
import renderLinkItem from "./renderLinkItem";

interface SideNavProps {
  items: NavItem[]
  setOpen?: (open: boolean) => void
  className?: string
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  return (
    <nav className="space-y-2">
      {items.map((item) =>
        renderLinkItem({ item, setOpen, path, isOpen, className }),
      )}
    </nav>
  );
}

