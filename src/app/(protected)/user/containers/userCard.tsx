"use client";
import { Edit, Trash2 } from "lucide-react";
import moment from "moment";
import React, { type ReactNode } from "react";
import { type HttpError } from "@refinedev/core";
import { type UseTableReturnType } from "@refinedev/react-table";
import { type IUser } from "@src/app/(protected)/user/interface";
import { statusBadge } from "@src/common/containers/column/statusBadge";
import { ButtonCreate } from "@src/common/elements/button";
import { Show } from "@src/shadcn/components/crud";
import { Table } from "@src/shadcn/components/table";
import { CardView } from "@src/shadcn/components/table/card-view";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";

interface Props {
  id: number
  user: IUser
  profile: number
}

interface UserCardProps {
  profileId?: number
  filterField: string
  userId?: number
  table: UseTableReturnType<IUser, HttpError>
}

export function UserCard({ profileId, table }: UserCardProps): JSX.Element {
  const userData = table.options.data ?? [];
  if (userData.length === 0) {
    return <CardLayout profileId={profileId}><div className="px-5 py-2">ບໍ່ມີຂໍ້ມູນ</div></CardLayout>;
  }
  const disabled = userData.length >= 0;
  return (
    <CardLayout profileId={profileId} disabled={disabled} >
      <CardView table={table} className="flex-col m-2 w-80" showSearchBar={false} showPagination={false}>
        <CardView.Row
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original as Props;
            const { username, isActive, dateJoined } = rowData.user ?? {};
            return (
              <Show.Row
                className=""
                content={<div>
                  <div className="-mx-40">{`ບັນຊີເຂົ້າລະບົບ: ${username}`}</div>
                  <div className="-mx-40">{"ລະງັບບັນຊີເຂົ້າ​ສູ່​ລະ​ບົບ:"} {statusBadge(isActive)}</div>
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

function CardLayout({ children, profileId, disabled }: { children: ReactNode, profileId?: number, disabled?: boolean }): JSX.Element {
  const redirect = `/user/create/${profileId}/profile`;
  return (
    <Card className="w-full pb-3 bg-white rounded-lg shadow-xl sm:w-80 dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນບັນຊີເຂົ້າ​ສູ່​ລະ​ບົບ"}
        </CardTitle>
        <ButtonCreate redirect={redirect} disabled={disabled}/>
      </CardHeader>
      {children}
    </Card>
  );
}

function getActionsButton(resource: string) {
  return (
    <CardView.Row
      accessorKey={"id"}
      id={"actions"}
      isAction={true}
      cell={({ row }) => {
        const original = row.original as Props;
        return (
          <div className="absolute top-0 right-0">
            <Table.Actions>
              <Table.EditAction title="ແກ້ໄຂ" row={original.user} resource={resource} icon={<Edit size={16} />} />
              <Table.DeleteAction title="ລົບ" row={original.user} withForceDelete={true} resource={resource} icon={<Trash2 size={16} />} />
            </Table.Actions>
          </div>
        );
      }}
    />
  );
}
