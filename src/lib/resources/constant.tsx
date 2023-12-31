import { User, BookUser } from "lucide-react";

export const resources = [
  {
    name: "user",
    list: "/user",
    create: "/user/create",
    edit: "/user/edit/:id",
    show: "/user/show/:id",
    icon: <User/>,
  },
  {
    name: "employee",
    list: "/employee",
    create: "/employee/create",
    edit: "/employee/edit/:id",
    show: "/employee/show/:id",
    icon: <BookUser />,
  },
  {
    name: "branch",
    list: "/branch",
    create: "/branch/create",
    edit: "/branch/edit/:id",
    show: "/branch/show/:id",
  },
];
