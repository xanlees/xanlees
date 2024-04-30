"use client";

import { Create } from "@src/shadcn/components/crud";
import { EmployeeForm } from "../../containers/form/createForm";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { useRouter } from "next/navigation";

const breadcrumbs = [
  { label: "ພະນັກງານ", href: "/profile" },
];

export default function EmployeeCreate({ params }: { params?: { userAndType?: string[] } }): JSX.Element {
  const router = useRouter();
  const [profileId, type, redirect] = params?.userAndType ?? ["", "", ""];
  const handleButtonClick = () => {
    router.push("/branch/create");
  };
  return (
    <Create title="ຕຳແໜ່ງ" resource="profile" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />} >
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl w-[850px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມສ້າງຕໍາແໜ່ງໃຫ້ພະນັກງານ
          </div>
          <EmployeeForm redirect={redirect} type={type} profileId={profileId} />
          <div className="flex w-full p-3">
            <button className="italic text-blue-500 underline" onClick={handleButtonClick}> *ຊອກຕໍາແໜ່ງ, ກົດທີ່ນີ້</button>
          </div>
        </div>
      </div>
    </Create>
  );
}
