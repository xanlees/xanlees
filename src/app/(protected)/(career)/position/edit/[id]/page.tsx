"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { PositionForm } from "../../form";

export default function PositionEdit({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Edit
      title="ຕໍາແໜ່ງ"
      showButtonShow={false}
    >
      <div className="flex justify-center rounded-full">
        <PositionForm type={""}/>
      </div>
    </Edit>
  );
}
