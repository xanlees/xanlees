import { Badge } from "@/shadcn/ui/badge";

export const statusBadge = (status: boolean) => {
  const statusText = (status) ? "ເປິດໃຊ້ງານ" : "ປິດການໃຊ້ງານ";
  return (<Badge className={`${status ? "bg-green-600" : "bg-red-600"}`}>{statusText}</Badge>);
};
