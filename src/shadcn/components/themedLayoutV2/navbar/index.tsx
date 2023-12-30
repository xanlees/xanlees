import * as React from "react";
import { NavbarProps } from "./type";
import { DarkMode } from "../../dark-mode";

export const Table: React.FC<NavbarProps> = ({ children, darkMode }) => {
    return (
        <nav className="flex items-center self-stretch justify-end flex-1 gap-x-4 lg:gap-x-6">
            {children}
            {darkMode && <DarkMode />}
        </nav>
    );
};

export default Table;
