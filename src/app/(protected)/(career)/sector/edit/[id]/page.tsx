"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { FormContainer } from "../../component";
import { useSectorType } from "../../hook";

export default function SectorEdit({ params }: { params?: { id?: string } }): JSX.Element {
  const id = params?.id ? parseInt(params.id, 10) : 0;
  const { data, isLoading } = useSectorType({ id });
  const type = data?.data?.[0]?.branchId?.type ?? "LOTTERY";
  return (
    <Create>
      {!isLoading && (
        <div className="flex justify-center max-w-[720px] mx-auto ">
          <div className="flex flex-col border rounded-2xl">
            <FormContainer type={type} id={id}/>
          </div>
        </div>
      )}
    </Create>
  );
}
