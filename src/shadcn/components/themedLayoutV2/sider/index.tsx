
import { CanAccess, ITreeMenu, useMenu } from "@refinedev/core";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { FC, ReactNode, useMemo, useState, useEffect } from "react";

import { cn } from "../../../lib/utils";
import { Button, Link } from "../../../elements";
import { ThemedSiderV2Props } from "./type";
import { WebVersion } from "./version";
import { DefaultTitle } from "./title";
import { LogOutButton } from "./logout";

const ThemedSiderV2MenuItem: FC<{
  selectedKey?: string;
  resource: ITreeMenu;
  asChild?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
}> = ({ resource, selectedKey, asChild = false, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const active = useMemo(() => {
    return resource.key === selectedKey;
  }, [resource, selectedKey]);

  const label = useMemo(() => {
    return String(resource.label ?? resource.meta?.label);
  }, [resource]);

  const handleClick = () => {
    if (resource.children && resource.children.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  const href = useMemo(() => {
    return resource.children && resource.children.length > 0 ? undefined : String(resource.route);
  }, [resource]);

  useEffect(() => {
    if (resource.children && resource.children.length > 0) {
      const isActiveChild = resource.children.some((child) => child.key === selectedKey);
      if (isActiveChild) {
        setIsOpen(true);
      }
    }
  }, [resource.children, selectedKey]);

  return (
    <CanAccess
      resource={resource.name.toString()}
      action="list"
      params={{
        resource,
      }}
    >
      <li>
        <Button
          aria-label="Toggle Navigation"
          aria-controls="sidebar-menu"
          variant="ghost"
          size="icon"
          asChild
          className={cn(active ? "bg-primary text-accent" : "", "gap-x-3 w-full justify-start p-0 pl-2.5")}
          onClick={handleClick}
        >
          {href ? (
            <Link to={href} title={label as string} className="inline-flex flex-row gap-x-2">
              {icon ?? <List size={20} />}
              {asChild ? children : label}
            </Link>
          ) : (
            <div className="inline-flex flex-row gap-x-2 w-full justify-between items-center">
              <span className="inline-flex items-center gap-x-2">
                {icon ?? <List size={20} />}
                {asChild ? children : label}
              </span>
              {resource.children && (
                <ChevronDown
                  size={20}
                  className={cn("transition-transform duration-300", isOpen && "rotate-180")}
                />
              )}
            </div>
          )}
        </Button>
        {resource.children && (
          <ul
            className={cn("pl-4 overflow-hidden transition-transform duration-500 ease-in-out", {
              "max-h-0 transform scale-y-0": !isOpen,
              "max-h-screen transform scale-y-100": isOpen,
            })}
          >
            {resource.children.map((child) => (
              <ThemedSiderV2MenuItem key={child.key} resource={child} selectedKey={selectedKey} icon={child.icon} />
            ))}
          </ul>
        )}
      </li>
    </CanAccess>
  );
};

export const ThemedSiderV2Menu: FC<{
  meta?: Record<string, unknown>;
}> = ({ meta }) => {
  const { menuItems, selectedKey } = useMenu({ meta });

  const sortedMenuItems = useMemo(() => {
    const sortItems = (items: ITreeMenu[]): ITreeMenu[] => {
      const itemsWithOrder = items.filter((item) => item.meta?.order !== undefined);
      const itemsWithoutOrder = items.filter((item) => item.meta?.order === undefined);

      itemsWithOrder.sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0));

      return [
        ...itemsWithOrder.map((item) => ({
          ...item,
          children: item.children ? sortItems(item.children) : [],
        })),
        ...itemsWithoutOrder.map((item) => ({
          ...item,
          children: item.children ? sortItems(item.children) : [],
        })),
      ];
    };

    return sortItems(menuItems);
  }, [menuItems]);

  const MenuItems = useMemo(
    () =>
      sortedMenuItems
        .filter((item: ITreeMenu & { meta?: { hide?: boolean } }) => !item.meta?.hide)
        .map((item: ITreeMenu) => (
          <ThemedSiderV2MenuItem key={item.key} resource={item} selectedKey={selectedKey} icon={item.icon} />
        )),
    [sortedMenuItems, selectedKey]
  );

  return <ul role="list" className="flex w-full flex-1 flex-col gap-y-1.5">{MenuItems}</ul>;
};

export const ThemedSiderV2: FC<ThemedSiderV2Props & { shownBorder?: boolean }> = ({
  meta,
  className,
  Title = DefaultTitle,
  shownBorder = true,
}) => {
  return (
    <div className={cn("lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col", className)}>
      <div className={cn("flex grow flex-col bg-white dark:bg-black border-border h-[100dvh]", shownBorder ? "border-r" : "")}>
        <div className="flex h-16 shrink-0 items-center px-2.5 text-foreground">
          {typeof Title === "function" ? <Title collapsed={false} /> : Title}
        </div>
        <nav className="flex flex-1 flex-col px-1.5">
          <ThemedSiderV2Menu meta={meta} />
          <WebVersion />
          <LogOutButton />
        </nav>
      </div>
    </div>
  );
};

export default ThemedSiderV2;