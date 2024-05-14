"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { PersonalAddressCreateForm } from "../../containers/createForm";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function PersonalAddressCreate({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0);
  return (
    <Create
      title="ຟອມສ້າງຕຳແໜ່ງ"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center my-5">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            {"ທີ່ຢູ່ເກີດ"}
          </div>
          <div className="rounded-full w-72 sm:w-[710px]">
            <PersonalAddressCreateForm profileId={Number(profileId)} isCurrent={true}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            {"ທີ່ຢູ່ປະຈຸບັນ"}
          </div>
          <div className="rounded-full w-72 sm:w-[710px]">
            <PersonalAddressCreateForm profileId={Number(profileId)} isCurrent={true}/>
          </div>
        </div>
      </div>
    </Create>
  );
}
