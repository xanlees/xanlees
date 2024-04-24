"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { EducationEditForm } from "../../containers/form/edit-form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { useOne } from "@refinedev/core";
import { type IEducation } from "../../interface";

export default function EducationEdit({ params }: { params: { id: number } }): JSX.Element {
  const { data } = useOne<IEducation>({
    resource: "education",
    id: Number(params.id ?? 0),
  });
  const profileId = Number(data?.data?.profileId) ?? 0;

  const breadcrumbs = [
    { label: "ກັບຄືນ", href: `/profile/show/${profileId}` },
  ];

  return (
    <Edit title="ການສຶກສາ" showButtonShow={false} breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
      <EducationEditForm id={Number(params.id ?? 0)} />
    </Edit>
  );
}
