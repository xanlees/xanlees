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
    name: "agent",
    list: "/agent",
    create: "/agent/create",
    edit: "/agent/edit/:id",
    show: "/agent/show/:id",
    icon: <User/>,
    meta: {
      label: "ແມ່ຫວຍ",
    }
  },
  {
    name: "branch",
    list: "/branch",
    create: "/branch/create",
    edit: "/branch/edit/:id",
    show: "/branch/show/:id",
    meta: {
      label: "ສາຂາຫ້ອງການ",
    }
  },
  {
    name: "lottery-branch",
    list: "/lottery-branch",
    create: "/lottery-branch/create",
    edit: "/lottery-branch/edit/:id",
    show: "/lottery-branch/show/:id",
    meta: {
      label: "ສາຂາຫວຍ",
    }
  },
  {
    name: "application",
    list: "/application",
    create: "/application/apply",
    edit: "/application/edit/:id",
    show: "/application/show/:id",
    icon: <FileText/>,
    meta: {
      label: "ຜູ້ສະໝັກວຽກ",
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
  }
];
