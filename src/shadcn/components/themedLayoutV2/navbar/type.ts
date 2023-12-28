import { DarkModeProps } from "@/shadcn/components/dark-mode/type";
import { ReactElement } from "react";

export type NavbarProps = DarkModeProps & {
    children?: ReactElement;
};
