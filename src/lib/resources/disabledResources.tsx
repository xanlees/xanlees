import {
  FileText,
  BookOpen,
  MapPin,
  Users,
  CalendarClock,
  Folder,
} from "lucide-react";

export const disabledResources = [
  {
    name: "user_management",
    disabled: true,
    icon: <Folder />,
    children: [
      {
        name: "education",
        list: "/education",
        create: "/education/create",
        edit: "/education/edit/:id",
        show: "/education/show/:id",
        icon: <BookOpen />,
        meta: {
          label: "ຜູ້ໃຊ້ລະບົບ",
        },
      },
      {
        name: "personal_address",
        icon: <MapPin />,
        edit: "/personal_address/edit/:id",
      },
      {
        name: "employee",
        icon: <Users />,
        edit: "/employee/edit/:id",
      },
    ],
  },
  {
    name: "document",
    disabled: true,
    icon: <FileText />,
    edit: "/document/edit/:id",
  },
  {
    name: "branch/work-time-settings",
    disabled: true,
    icon: <CalendarClock />,
    list: "/branch/work-time-settings",
    create: "/branch/work-time-settings/create",
    edit: "/work-time-settings/edit/:id",
    show: "/branch/work-time-settings/show/:id",
  },
  {
    name: "changelog",
    disabled: true,
    list: "/changelog",
  },
  {
    name: "sector",
    disabled: true,
    list: "/sector",
    create: "/sector/create",
    edit: "/sector/edit/:id",
    show: "/sector/show/:id",
  },
  {
    name: "position",
    disabled: true,
    list: "/position",
    create: "/position/create",
    edit: "/position/edit/:id",
    show: "/position/show/:id",
  },
];
