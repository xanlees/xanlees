"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { ProfileCreateForm } from "../../containers/form/createForm";

export default function ProfileCreateAndUserProfile({ params }: { params?: { userAndUser?: number[] } }): JSX.Element {
  const [user, userProfile] = params?.userAndUser ?? [0, 0];
  return (
    <Create title="">
      <div className="flex justify-center max-w-[720px] mx-auto ">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
        ຂໍ້ມູນສ່ວນບຸກຄົນ
          </div>
          <ProfileCreateForm user={user} userProfile={userProfile}/>
        </div>
      </div>
    </Create>

  );
}

