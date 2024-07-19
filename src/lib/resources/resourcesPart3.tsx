import { Briefcase, Calendar } from "lucide-react";

export const resourcesPart3 = [
  {
    name: "leave",
    list: "/leave",
    create: "/leave/create",
    edit: "/leave/edit/:id",
    show: "/leave/show/:id",
    icon: <Briefcase />,
    meta: {
      label: "ຂໍລາພັກ",
    },
  },
  {
    name: "holiday",
    list: "/holiday",
    create: "/holiday/create",
    edit: "/holiday/edit/:id",
    show: "/holiday/show/:id",
    icon: <Calendar />,
    meta: {
      label: "ວັນພັກ",
    },
  },
];
