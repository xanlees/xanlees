import { CanAccess, ITreeMenu, useLogout, useMenu } from "@refinedev/core";
import { List, LogOut } from "lucide-react";
import { FC, ReactNode, useMemo } from "react";

import { cn } from "../../../lib/utils";
import { Button, Link } from "../../../elements";
import { ThemedSiderV2Props } from "./type";
import { RefineLayoutTitleProps } from "@refinedev/ui-types";
import Image from "next/image";

const ThemedSiderV2MenuItem: FC<{
    selectedKey?: string;
    resource: ITreeMenu;
    asChild?: boolean;
    children?: ReactNode;
    icon?: ReactNode;
}> = ({ resource, selectedKey, asChild = false, children }) => {
    const active = useMemo(() => {
        return resource.key === selectedKey;
    }, [resource, selectedKey]);

    const label = useMemo(() => {
        return String(resource.label ?? resource.meta?.label);
    }, [resource]);

    const href = useMemo(() => {
        return String(resource.route);
    }, [resource]);
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
                    variant="ghost"
                    size="lg"
                    asChild
                    className={cn(
                        active ? "bg-primary text-accent" : "",
                        "gap-x-3 w-full justify-start p-0 pl-2.5",
                    )}
                >
                    <Link
                        to={href}
                        title={label as string}
                        className="inline-flex flex-row gap-x-2"
                    >
                        {resource.icon ?? <List size={20} />}
                        {asChild ? children : label}
                    </Link>
                </Button>
            </li>
        </CanAccess>
    );
};

export const ThemedSiderV2Menu: FC<{
    meta?: Record<string, unknown>;
}> = ({ meta }) => {
    const { menuItems, selectedKey } = useMenu({ meta });


    const MenuItems = useMemo(
        () =>
            menuItems.map((item: ITreeMenu) => (
                <ThemedSiderV2MenuItem
                    key={item.key}
                    resource={item}
                    selectedKey={selectedKey}
                />
            )),
        [menuItems, selectedKey],
    );
    return (
        <ul role="list" className="flex w-full flex-1 flex-col gap-y-1.5">
            {MenuItems}
        </ul>
    );
};
const defaultIcon = (
    <Image src={"/logo.png"} alt={"SBS logo"} width={46} height={25} className="-mt-1 rounded-full" />
);

const DefaultTitle: FC<RefineLayoutTitleProps> = () => {
    return (
        <Link
            href="/"
            title={"refine"}
            className="inline-flex flex-row items-center text-foreground"
        >
            {defaultIcon}
            <span className="ml-2.5 text-xl font-bold">{"Workhub Link"}</span>
        </Link>
    );
};

const LogOutButton: FC = () => {
    const { mutate: logout } = useLogout();
    return (
        <CanAccess resource="user" action="show">
            <Button
                variant="ghost"
                className="my-5 gap-x-3 w-full justify-start p-0 pl-2.5"
                onClick={() => logout({ redirectPath: "/" })}
            >
                <LogOut />
                Sign Out
            </Button>
        </CanAccess>

    )
}

export const ThemedSiderV2: FC<ThemedSiderV2Props> = ({
    meta,
    className,
    Title = DefaultTitle,
}) => {

    return (
        <div
            className={cn(
                "lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col",
                className,
            )}
        >
            <div className="flex grow flex-col overflow-y-auto bg-white dark:bg-black border-r border-border h-[100dvh]">
                <div className="flex h-16 shrink-0 items-center px-2.5 text-foreground">
                    {typeof Title === "function" ? (
                        <Title collapsed={false} />
                    ) : (
                        Title
                    )}
                </div>
                <nav className="flex flex-1 flex-col px-1.5">
                    <ThemedSiderV2Menu meta={meta} />
                    <LogOutButton />
                </nav>
˛
            </div>
        </div>
    );
};

export default ThemedSiderV2;
