"use client";

import { useShow } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import { type IUser } from "../../interface";
import { statusBadge } from "../../lib/utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function UserShow({ params }: { params: { id: number } }): JSX.Element {
  const { queryResult } = useShow<IUser>();
  const { data } = queryResult;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const record: IUser | undefined = data?.data;

  return (
    <Show>
      <Show.Row title="ID" content={record?.id} />
      <Show.Row title="Username" content={record?.username} />
      <Show.Row title="Status" content={statusBadge(record?.isActive as boolean)} />
    </Show>
  );
}

