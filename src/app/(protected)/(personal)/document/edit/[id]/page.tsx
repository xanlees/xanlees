"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { useOne } from "@refinedev/core";
import { DocumentEditForm } from "../../containers/form/editForm";

export default function DocumentEdit({ params }: { params: { id: number } }): JSX.Element {
  const id = Number(params.id) ?? 0;
  const { data } = useOne<{ profileId: number }>({
    resource: "document",
    id,
  });
  const profileId = Number(data?.data?.profileId) ?? 0;
  const breadcrumbs = [
    { label: "ກັບຄືນ", href: `/profile/show/${profileId}` },
  ];

  return (
    <Edit title="ເອກກະສານ" showButtonShow={false} breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
      <DocumentEditForm id={id}/>
    </Edit>
  );
}

