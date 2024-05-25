"use client";

import React from "react";

import { Create } from "@/shadcn/components/crud";

import { FormBranchContainer } from "../../containers/form";
import { useBranchType } from "../../hook/useBranchForm";

export default function BranchEdit({ params }: { params?: { id?: string } }): JSX.Element {
  const id = params?.id ? parseInt(params.id, 10) : 0;
  const data = useBranchType({ id })?.data?.data?.[0];
  const type = data?.type ?? "";
  return (
    <Create>
      <div className="flex justify-center max-w-[720px] mx-auto ">
        <div className="flex flex-col border rounded-2xl">
          <FormBranchContainer id={id} type={type}/>
        </div>
      </div>
    </Create>
  );
}

