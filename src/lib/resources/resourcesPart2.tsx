import { UserCircle, Calendar, Briefcase, DollarSign, Library } from "lucide-react";

export const resourcesPart2 = [
  {
    name: "holiday",
    list: "/holiday",
    create: "/holiday/create",
    edit: "/holiday/edit/:id",
    show: "/holiday/show/:id",
    icon: <Calendar />,
    meta: {
      label: "ວັນພັກ",
      hide: true,
    },
  },
  {
    name: "leave",
    list: "/leave",
    create: "/leave/create",
    edit: "/leave/edit/:id",
    show: "/leave/show/:id",
    icon: <Briefcase />,
    meta: {
      label: "ຂໍລາພັກ",
      hide: true,
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
      hide: true,
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
      hide: true,
    },
  },
  {
    name: "report",
    icon: <Library />,
    meta: {
      label: "ລາຍງານ",
    },
  },
  {
    name: "employee-salary",
    list: "/employee-salary",
    icon: <DollarSign />,
    meta: {
      label: "ເງິນພະນັກງານ",
      parent: "report",
    },
  },
  {
    name: "attendance-report",
    list: "/attendance-report",
    icon: <Briefcase />,
    meta: {
      label: "attendance-report",
      parent: "report",
    },
  },
];
