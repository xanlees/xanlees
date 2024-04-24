"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { PersonalAddressEditForm } from "../../containers/editForm";
import { useOne } from "@refinedev/core";
import { type IPersonalAddress } from "../../../profile/interface/model";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

export default function AddressEdit({ params }: { params: { id: number } }): JSX.Element {
  const id = Number(params.id ?? 0) ?? 0;
  const { data } = useOne<IPersonalAddress>({
    resource: "personal_address",
    id,
  });
  const profileId = Number(data?.data?.profile) ?? 0;
  const breadcrumbs = [
    { label: "ກັບຄືນ", href: `/profile/show/${profileId}` },
  ];

  return (
    <Edit title="ທີ່ຢູ່" showButtonShow={false} breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
      <PersonalAddressEditForm id={id}/>
    </Edit>
  );
}
