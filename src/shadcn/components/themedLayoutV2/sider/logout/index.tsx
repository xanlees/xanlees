import { CanAccess, useLogout } from "@refinedev/core";
import { LogOut } from "lucide-react";
import { FC } from "react";
import { Button } from "../../../../elements";

export const LogOutButton: FC = () => {
    const { mutate: logout } = useLogout();
    return (
        <CanAccess resource="user" action="show">
            <div className="my-3">
                <Button
                    variant="ghost"
                    className="mt-1 gap-x-3 w-full justify-start p-0 pl-2.5"
                    onClick={() => logout({ redirectPath: "/" })}
                >
                    <LogOut />
                    Sign Out
                </Button>
            </div>
        </CanAccess>

    );
};
