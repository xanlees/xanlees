import {
  BookUser,
  Clipboard,
  Hourglass,
  Briefcase,
  UserCircle,
  Settings,
} from "lucide-react";

export const resourcesPart1 = [
  {
    name: "user-profile",
    list: "/user-profile",
    create: "/user-profile/create",
    edit: "/user-profile/edit/:id",
    show: "/user-profile/show/:id",
    icon: <Hourglass />,
    meta: {
      label: "ລາຍການປໍ້າໂມງ",
      order: 1,
    },
  },
  {
    name: "application",
    list: "/application",
    create: "/application/apply",
    edit: "/application/edit/:id",
    show: "/application/show/:id",
    icon: <Clipboard />,
    meta: {
      label: "ຜູ້ສະໝັກວຽກ",
      order: 2,
    },
  },
  {
    name: "employee-group",
    icon: <BookUser />,
    meta: {
      label: "ຂໍ້ມູນພະນັກງານ",
      order: 3,
    },
  },
  {
    name: "profile",
    list: "/profile",
    create: "/profile/create",
    edit: "/profile/edit/:id",
    show: "/profile/show/:id",
    icon: <BookUser />,
    meta: {
      label: "ພະນັກງານ",
      parent: "employee-group",
      order: 1,
    },
  },
  {
    name: "past-employee",
    list: "/past-employee",
    create: "/past-employee/create",
    edit: "/past-employee/edit/:id",
    show: "/past-employee/show/:id",
    icon: <Briefcase />,
    meta: {
      label: "ອາດີດພະນັກງານ",
      parent: "employee-group",
      order: 2,
    },
  },
  {
    name: "user",
    list: "/user",
    create: "/user/create",
    edit: "/user/edit/:id",
    show: "/user/show/:id",
    icon: <UserCircle />,
    meta: {
      label: "ຜູ້ໃຊ້ລະບົບ",
      parent: "employee-group",
      order: 3,
    },
  },
  {
    name: "branch-group",
    icon: <Settings />,
    meta: {
      label: "ຕັ້ງຄ່າ",
      order: 3,
    },
  },
];
