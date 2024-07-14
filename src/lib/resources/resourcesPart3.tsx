import { Briefcase } from "lucide-react";

export const resourcesPart3 = [
  {
    name: "day-off-group",
    icon: <Briefcase />,
    meta: {
      label: "ວັນພັກ",
      order: 5,
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
      parent: "day-off-group",
      order: 1,
    },
  },
  {
    name: "holiday",
    list: "/holiday",
    create: "/holiday/create",
    edit: "/holiday/edit/:id",
    show: "/holiday/show/:id",
    icon: <Briefcase />,
    meta: {
      label: "holiday",
      parent: "day-off-group",
      order: 2,
      hide: true,
    },
  },
];
