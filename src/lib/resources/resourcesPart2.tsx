import { UserCircle } from "lucide-react";

export const resourcesPart2 = [
  {
    name: "user",
    list: "/user",
    create: "/user/create",
    edit: "/user/edit/:id",
    show: "/user/show/:id",
    icon: <UserCircle />,
    meta: {
      label: "ຜູ້ໃຊ້ລະບົບ",
    },
  },
  {
    name: "my-profile",
    list: "/my-profile",
    create: "/my-profile/create",
    edit: "/my-profile/edit/:id",
    show: "/my-profile/show/:id",
    icon: <UserCircle />,
    meta: {
      label: "ຂໍ້ມູນສ່ວນບຸກຄົນ",
    },
  },
];
