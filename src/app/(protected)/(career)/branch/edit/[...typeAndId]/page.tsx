"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { FormBranchContainer } from "../../containers/form";

export default function SectorEdit({ params }: { params?: { typeAndId?: string[] } }): JSX.Element {
  const [idStr] = params?.typeAndId ?? ["0"];
  const id = parseInt(idStr, 10);
  return (
    <Create>
      <div className="flex justify-center max-w-[720px] mx-auto ">
        <div className="flex flex-col border rounded-2xl">
          <FormBranchContainer id={id} type={""}/>
        </div>
      </div>
    </Create>
  );
}
