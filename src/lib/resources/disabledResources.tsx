
import {
  FileText,
  BookOpen,
  MapPin,
  Users,
  CalendarClock,
} from "lucide-react";

export const disabledResources = [
  {
    name: "education",
    disabled: true,
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
    disabled: true,
    icon: <MapPin />,
    edit: "/personal_address/edit/:id",
  },
  {
    name: "employee",
    disabled: true,
    icon: <Users />,
    edit: "/employee/edit/:id",
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
];

