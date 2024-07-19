import {
  FileText,
  CalendarClock,
} from "lucide-react";

export const disabledResources = [
  {
    name: "document",
    icon: <FileText />,
    edit: "/document/edit/:id",
    meta: {
      hide: true,
    },
  },
  {
    name: "branch/work-time-settings",
    icon: <CalendarClock />,
    list: "/branch/work-time-settings",
    create: "/branch/work-time-settings/create",
    edit: "/work-time-settings/edit/:id",
    show: "/branch/work-time-settings/show/:id",
    meta: {
      hide: true,
    },
  },
  {
    name: "changelog",
    list: "/changelog",
    meta: {
      hide: true,
    },
  },
  {
    name: "sector",
    list: "/sector",
    create: "/sector/create",
    edit: "/sector/edit/:id",
    show: "/sector/show/:id",
    meta: {
      hide: true,
    },
  },
  {
    name: "position",
    list: "/position",
    create: "/position/create",
    edit: "/position/edit/:id",
    show: "/position/show/:id",
    meta: {
      hide: true,
    },
  },
  // {
  //   name: "holiday",
  //   list: "/holiday",
  //   create: "/holiday/create",
  //   edit: "/holiday/edit/:id",
  //   show: "/holiday/show/:id",
  //   icon: <Calendar />,
  //   meta: {
  //     label: "ວັນພັກ",
  //     hide: true,
  //   },
  // },
  // {
  //   name: "leave",
  //   list: "/leave",
  //   create: "/leave/create",
  //   edit: "/leave/edit/:id",
  //   show: "/leave/show/:id",
  //   icon: <Briefcase />,
  //   meta: {
  //     label: "ຂໍລາພັກ",
  //     hide: true,
  //   },
  // },
];
