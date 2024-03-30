"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";
import { formStepsData } from "../containers/form/settings";
import { ProfileProvider } from "@src/app/(protected)/(personal)";

const breadcrumbs = [
  { label: "ພະນັກງານ", href: "/profile" },
  { label: "ສ້າງພະນັກງານ" },
];

const ProfileCreate = () => {
  return (
    <ProfileProvider>
      <FormCreate />
    </ProfileProvider>
  );
};

const FormCreate = () => {
  return (
    <Create
      title="ຟອມສ້າງພະນັກງານ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <span className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມສ້າງພະນັກງານ</span>
          <FormStep formStepsData={formStepsData} initialStep={0} />
        </div>
      </div>
    </Create>
  );
};

export default ProfileCreate;
