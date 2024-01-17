/* eslint-disable  */
import { User, BookUser } from "lucide-react";

export const resources = [
  {
    name: "employee",
    list: "/employee",
    create: "/employee/create",
    edit: "/employee/edit/:id",
    show: "/employee/show/:id",
    icon: <BookUser />,
    meta: {
    }
  },
  {
    name: "branch",
    list: "/branch",
    create: "/branch/create",
    edit: "/branch/edit/:id",
    show: "/branch/show/:id",
    meta: {
      label: "ສາຂາ",
    }
  },
  {
    name: "user",
    list: "/user",
    create: "/user/create",
    edit: "/user/edit/:id",
    show: "/user/show/:id",
    icon: <User/>,
    meta: {
      label: "ຜູ້ໃຊ້ລະບົບ",
    }
  },
  {
    name: "application",
    list: "/application",
    create: "/application/create",
    edit: "/application/edit/:id",
    show: "/application/show/:id",
    meta: {
      label: "application",
    }
  },
];
