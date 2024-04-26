/* eslint-disable max-lines */
"use client";
import React, { type ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { Show } from "@src/shadcn/components/crud";
import { useTable } from "@refinedev/react-table";
import { type IEducation } from "../../../index";
import { type IUser } from "@src/app/(protected)/user/interface";
import { statusBadge } from "@src/common/containers/column/statusBadge";
import moment from "moment";
import { CardView } from "@src/shadcn/components/table/card-view";
import { Table } from "@src/shadcn/components/table";
import { Edit, Trash2 } from "lucide-react";

interface Props {
  id: number
  user: IUser
  profile: number
}

export function UserCard({ profileId }: { profileId: number }): JSX.Element {
  const { table } = useUserCard(profileId);
  const userData = table.options.data ?? [];
  if (userData.length === 0) {
    return <CardLayout ><div>ບໍ່ມີຂໍ້ມູນ</div></CardLayout>;
  }
  return (
    <CardLayout>
      <CardView table={table} className="w-80 m-2 flex-col" showSearchBar={false} showPagination={false}>
        <CardView.Row
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original as Props;
            const username = rowData.user.username ?? {};
            const isActive = rowData.user.isActive ?? {};
            const dateJoined = rowData.user.dateJoined ?? {};
            return (
              <Show.Row
                className=""
                content={<div>
                  <div className="-mx-40">{`ບັນຊີ: ${username}`}</div>
                  <div className="-mx-40">{"ລະງັບບັນຊີ: "} {statusBadge(isActive)}</div>
                  <div className="-mx-40">{`ສ້າງວັນທີ: ${moment(dateJoined).format("DD/MMM/YYYY")}`}</div>
                </div>}
              />
            );
          }}
        />
        {getActionsButton("user")}
      </CardView>
    </CardLayout>
  );
}

function CardLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full sm:w-80 bg-white dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນບັນຊີ"}
        </CardTitle>
      </CardHeader>
      {children}
    </Card>

  );
}

const useUserCard = (profileId: number) => {
  const table = useTable<IEducation>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        permanent: [
          { field: "profile", operator: "eq", value: profileId },
        ],
        initial: [
          { field: "expand", operator: "eq", value: "user" },
        ],
      },
    },
  });
  return { table };
};

function getActionsButton(resource: string) {
  return (
    <CardView.Row
      accessorKey={"id"}
      id={"actions"}
      isAction={true}
      cell={({ row }) => {
        const original = row.original as Props;
        return (
          <div className="top-0 right-0 absolute">
            <Table.Actions>
              <Table.EditAction
                title="ແກ້ໄຂ"
                row={original.user}
                resource={resource}
                icon={<Edit size={16} />}
              />
              <Table.DeleteAction
                title="ລົບ"
                row={original.user}
                withForceDelete={true}
                resource={resource}
                icon={<Trash2 size={16} />}
              />
            </Table.Actions>
          </div>
        );
      }}

    />
  );
}
