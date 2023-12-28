import { LayoutDashboard, Users } from "lucide-react";

export const resources = [
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
];

