"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { PersonalAddressCreateForm } from "../../containers/createForm";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function PersonalAddressCreate({ params }: { params?: { userAndType?: number[] } }): JSX.Element {
  const [profileId] = params?.userAndType ?? [""];
  console.log("profileId", profileId);
  return (
    <Create
      title="ຟອມສ້າງຕຳແໜ່ງ"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <PersonalAddressCreateForm profileId={Number(profileId)}/>
    </Create>
  );
}
