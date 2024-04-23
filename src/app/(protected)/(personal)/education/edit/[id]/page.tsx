"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { EducationEditForm } from "../../containers/form/edit-form";

export default function EducationEdit({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Edit title="ການສຶກສາ" showButtonShow={false}>
      <EducationEditForm />
    </Edit>
  );
}
