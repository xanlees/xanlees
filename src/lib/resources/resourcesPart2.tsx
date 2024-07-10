import { Briefcase, DollarSign, Library, Building, Clock, UserCheck } from "lucide-react";

export const resourcesPart2 = [
  {
    name: "branch",
    list: "/branch",
    create: "/branch/create",
    edit: "/branch/edit/:id",
    show: "/branch/show/:id",
    icon: <Building />,
    meta: {
      label: "ຫ້ອງການ",
      parent: "branch-group",
      order: 1,
    },
  },
  {
    name: "work-time-settings",
    list: "/work-time-settings",
    create: "/work-time-settings/create",
    edit: "/work-time-settings/edit/:id",
    show: "/work-time-settings/show/:id",
    icon: <Clock />,
    meta: {
      label: "ໂມງເຂົ້າ-ອອກວຽກ",
      parent: "branch-group",
      order: 2,
    },
  },
  {
    name: "report",
    icon: <Library />,
    meta: {
      label: "ລາຍງານ",
      order: 4,
    },
  },
  {
    name: "employee-salary",
    list: "/employee-salary",
    icon: <DollarSign />,
    meta: {
      label: "ເງິນພະນັກງານ",
      parent: "report",
      order: 1,
    },
  },
  {
    name: "attendance-report",
    list: "/attendance-report",
    icon: <Briefcase />,
    meta: {
      label: "ສະຫລຸບມາການ",
      parent: "report",
      order: 2,
    },
  },
  {
    name: "lottery-group",
    icon: <Library />,
    meta: {
      label: "ຫວຍ",
      order: 4,
    },
  },
  {
    name: "agent",
    list: "/agent",
    create: "/agent/create",
    edit: "/agent/edit/:id",
    show: "/agent/show/:id",
    icon: <UserCheck />,
    meta: {
      label: "ຄົນຂາຍເລກ",
      parent: "lottery-group",
      order: 1,
    },
  },
  {
    name: "lottery-branch",
    list: "/lottery-branch",
    create: "/lottery-branch/create",
    edit: "/lottery-branch/edit/:id",
    show: "/lottery-branch/show/:id",
    icon: <Building />,
    meta: {
      label: "ສາຂາຫວຍ",
      parent: "lottery-group",
      order: 1,
    },
  },
];
