import { Table } from "@/shadcn/components/table";
import { cn } from "@src/lib/utils";
import { Badge } from "@src/shadcn/elements";

export function AttendanceColumn({ data, header, className }: { data: Array<{ user: number, value: number }>, header: string, className?: string }) {
  return (
    <Table.Column
      header={header}
      id="user"
      accessorKey="user"
      cell={(props) => {
        const user = props?.getValue() as unknown as number;
        const value = data?.find((item) => item?.user === user);
        return (
          <>
            {value
              ? (<Badge className={cn(className)}>{value.value}</Badge>)
              : null
            }
          </>
        );
      }}
    />
  );
}

