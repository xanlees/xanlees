/* eslint-disable @typescript-eslint/naming-convention */
import { LayoutDashboard, Users, AppWindow } from "lucide-react";
import { type NavItem } from "./types";

export const resources: NavItem[] = [
  {
    name: "user",
    list: "/user",
    show: "/user/show/:id",
    create: "/user/create",
    edit: "/user/edit/:id",
    title: "User",
    icon: Users,
    color: "text-sky-500",
  },
  {
    name: "employee",
    list: "/employee",
    show: "/employee/show/:id",
    create: "/employee/create",
    edit: "/employee/edit/:id",
    title: "Employee",
    icon: LayoutDashboard,
    color: "text-green-500",
  },
  {
    name: "application",
    list: "/application",
    show: "/application/show/:id",
    create: "/application/create",
    edit: "/application/edit/:id",
    title: "Application",
    icon: AppWindow,
    color: "text-black",
  },
];
