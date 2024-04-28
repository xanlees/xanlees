import {
  BookUser,
  FileText,
  Clipboard,
  Hourglass,
  Briefcase,
  Building,
  Clock,
  UserCheck,
  UserCircle,
  BookOpen,
  MapPin,
  Users,
  CalendarClock,
} from "lucide-react";

export const resources = [
  {
    name: "user-profile",
    list: "/user-profile",
    create: "/user-profile/create",
    edit: "/user-profile/edit/:id",
    show: "/user-profile/show/:id",
    icon: <Hourglass />,
    meta: { label: "ລາຍການປໍ້າໂມງ" },
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
    },
  },
  {
    name: "employee-laid-off",
    list: "/employee-laid-off",
    create: "/employee-laid-off/create",
    edit: "/employee-laid-off/edit/:id",
    show: "/employee-laid-off/show/:id",
    icon: <Briefcase />,
    meta: {
      label: "ອາດີດພະນັກງານ",
    },
  },
  {
    name: "branch",
    list: "/branch",
    create: "/branch/create",
    edit: "/branch/edit/:id",
    show: "/branch/show/:id",
    icon: <Building />,
    meta: {
      label: "ຫ້ອງການ",
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
    },
  },
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
    name: "address",
    disabled: true,
    icon: <MapPin />,
    edit: "/address/edit/:id",
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
