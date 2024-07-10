"use client";

import React from "react";

import { Edit } from "@/shadcn/components/crud";

import { FormBranchContainer } from "../../containers/form";
import { useBranchType } from "../../hook/useBranchForm";

export default function BranchEdit({ params }: { params?: { id?: string } }): JSX.Element {
  const id = params?.id ? parseInt(params.id, 10) : 0;
  const data = useBranchType({ id })?.data?.data?.[0];
  const type = data?.type ?? "";
  return (
    <Edit>
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl w-[600px]">
          <FormBranchContainer id={id} type={type}/>
        </div>
      </div>
    </Edit>
  );
}

