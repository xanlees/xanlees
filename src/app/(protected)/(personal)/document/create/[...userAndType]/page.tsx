"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { type FormAction } from "@refinedev/core";
import { DocumentCreateForm } from "../../containers/form/createForm";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function DocumentCreate({ params }: { params?: { userAndType?: string[] } }): JSX.Element {
  const [profileId, actionStr] = params?.userAndType ?? ["", ""];
  const action: FormAction = actionStr as FormAction;
  return (
    <Create
      title="ສ້າງເອກສະສານ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <DocumentCreateForm id={parseInt(profileId, 10) || 0} action={action}/>
    </Create>
  );
}
