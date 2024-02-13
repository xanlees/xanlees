/* eslint-disable  */
import { User, BookUser, FileText } from "lucide-react";

export const resources = [
  {
    name: "profile",
    list: "/profile",
    create: "/profile/create",
    edit: "/profile/edit/:id",
    show: "/profile/show/:id",
    icon: <BookUser />,
    meta: {
      label: "ພະນັກງານ",
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
    icon: <FileText/>,
    meta: {
      label: "ຜູ້ສະໝັກວຽກ",
    }
  },
];
