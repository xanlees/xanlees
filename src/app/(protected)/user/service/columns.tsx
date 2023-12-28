"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type IUser } from "../interface/interface";
import { Badge } from "@/common/elements/badge";

export const columns: Array<ColumnDef<IUser>> = [
  {
    accessorKey: "username",
    header: "ຊື່",
  },
  {
    accessorKey: "isActive",
    header: "ສະຖານະ",
    cell: (props) => {
      const status = props.getValue() as boolean;
      const statusText = (status) ? "ເປິດໃຊ້ງານ" : "ປິດການໃຊ້ງານ";
      return (<Badge choice={status}>{statusText}</Badge>);
    },
  },
//   {
//     id: "groups",
//     accessorKey: "groups",
//     header: "ສິດ",
//     cell: (props) => {
//       const groups = props.getValue() as string[];
//       return (
//         groups.map((value: string, index) => {
//           return <Badge key={`badeg-${index}`} choice={false}>{value}</Badge>;
//         }));
//     },
//   },
//   {
//     id: "dateJoined",
//     accessorKey: "dateJoined",
//     header: "ມື້ສ້າງບັນຊີ",
//     cell: (props) => {
//       const dateValue = props.getValue();
//       if (typeof dateValue === "string") {
//         return moment(dateValue).format("DD MMM YYYY");
//       }
//       return "";
//     },
//   },
];
